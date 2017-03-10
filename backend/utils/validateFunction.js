'use strict';

const { User, Token } = require('../models');

module.exports = (decoded, request, callback) => {
  if (!decoded || !decoded._id) {
    return callback(null, false);
  } else {
    Token
      .findOneAsync({ tokenId: decoded.tokenId, isBanned: true }, { _id: 1 })
      .then(bannedToken => {
        if (bannedToken)
          throw new Error('Invalid token');
        return User.findOneAsync({ _id: decoded._id });
      })
      .then(user => {
        if (!user || !user.isActive)
          throw new Error('Invalid token');
        decoded.userData = user;
        return callback(null, true, decoded);
      })
      .catch(err => {
        console.log(err);
        return callback(null, false);
      });
  }
};