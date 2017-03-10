'use strict';

const { User, Token } = require('../models');
const config = require('../config');
const { FB } = require('fb');
const Promise = require('bluebird');
const Boom = require('boom');
const uuid = require('node-uuid');
const JWT = Promise.promisifyAll(require('jsonwebtoken'));

module.exports = {
  facebookAuth: (request, reply) => {
    let fbAccessToken = request.headers.authorization;
    getUserDataFromFacebook(fbAccessToken)
      .then(userFbData => {
        return Promise.join(userFbData, User.findOneAsync({ fbId: userFbData.id }, { _id: 1, role: 1 }));
      })
      .then(([ userFbData, user ]) => {
        if (!user) {
          let newUser = new User({
            fbId: userFbData.id,
            email: userFbData.email,
            fbLink: userFbData.link,
            firstName: userFbData.first_name,
            lastName: userFbData.last_name,
            pictureURL: userFbData.picture.data.url,
            gender: userFbData.gender
          });
          return newUser.saveAsync();
        }
        return Promise.resolve(user);
      })
      .then(user => {
        let accessTokenId = uuid.v4();
        let refreshTokenId = uuid.v4();
        let accessTokenGeneratingOperation = JWT.signAsync({
          tokenId: accessTokenId,
          _id: user._id,
          scope: [ user.role, 'accessToken' ]
        }, config.jwt.secret, { expiresIn: config.jwt.accessTokenExpiration });
        let refreshTokenGeneratingOperation = JWT.signAsync({
          tokenId: refreshTokenId,
          _id: user._id,
          scope: [ user.role, 'refreshToken' ]
        }, config.jwt.secret, { expiresIn: config.jwt.refreshTokenExpiration });
        let newAccessToken = new Token({
          tokenId: accessTokenId,
          creator: user._id,
          type: 'accessToken'
        });
        let newRefreshToken = new Token({
          tokenId: refreshTokenId,
          creator: user._id,
          type: 'refreshToken'
        });
        return Promise.join(accessTokenGeneratingOperation, refreshTokenGeneratingOperation, newAccessToken.saveAsync(), newRefreshToken.saveAsync());
      })
      .then(([ accessToken, refreshToken ]) => {
        return reply({
          accessToken: accessToken,
          refreshToken: refreshToken
        });
      })
      .catch(err => {
        return reply(new Boom.wrap(err));
      });
  },

  refreshToken: (request, reply) => {
    Token
      .updateAsync({
        tokenId: request.auth.credentials.tokenId,
        type: 'refreshToken'
      }, {
        $set: {
          isBanned: true
        }
      })
      .then(updatingOperationResult => {
        if (!updatingOperationResult || updatingOperationResult.ok !== 1)
          throw new Boom.serverUnavailable('Failed to revoke');
        let accessTokenId = uuid.v4();
        let refreshTokenId = uuid.v4();
        let accessTokenGeneratingOperation = JWT.signAsync({
          tokenId: accessTokenId,
          _id: request.auth.credentials._id,
          scope: [ request.auth.credentials.scope[0], 'accessToken' ]
        }, config.jwt.secret, { expiresIn: config.jwt.accessTokenExpiration });
        let refreshTokenGeneratingOperation = JWT.signAsync({
          tokenId: refreshTokenId,
          _id: request.auth.credentials._id,
          scope: [ request.auth.credentials.scope[0], 'refreshToken' ]
        }, config.jwt.secret, { expiresIn: config.jwt.refreshTokenExpiration });
        let newAccessToken = new Token({
          tokenId: accessTokenId,
          creator: request.auth.credentials._id,
          type: 'accessToken'
        });
        let newRefreshToken = new Token({
          tokenId: refreshTokenId,
          creator: request.auth.credentials._id,
          type: 'refreshToken'
        });
        let tokenInsertingOperation = Token.insertManyAsync([ newAccessToken, newRefreshToken ]);
        return Promise.join(accessTokenGeneratingOperation, refreshTokenGeneratingOperation, tokenInsertingOperation);
      })
      .then(([ accessToken, refreshToken ]) => {
        return reply({
          accessToken: accessToken,
          refreshToken: refreshToken
        });
      })
      .catch(err => {
        return reply(new Boom.wrap(err));
      });
  },
};

var getUserDataFromFacebook = (fbAccessToken) => {
  return new Promise((resolve, reject) => {
    FB.options({ version: 'v2.8' });
    FB.setAccessToken(fbAccessToken);
    FB.api('me', {
      fields: [ 'id', 'email', 'link', 'first_name', 'last_name', 'picture', 'gender' ]
    }, (res) => {
      if (!res || res.error)
        reject(new Boom.badRequest('Invalid token'));
      resolve(res);
    });
  });
};