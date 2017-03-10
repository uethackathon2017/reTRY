'use strict';

const { User } = require('../models');
const Boom = require('boom');

module.exports = {
  getUserData: (request, reply) => {
    User
      .findByIdAsync(request.auth.credentials._id)
      .then(user => {
        if (!user)
          throw new Boom.badRequest('Invalid user id');
        return reply({
          userData: user
        });
      })
      .catch(err => {
        console.log(err);
        return reply(new Boom.wrap(err));
      });
  },

  getTopTenHighestLevel: (request, reply) => {
    User
      .find({})
      .sort({ level: -1 })
      .limit(10)
      .then(topTenUser => {
        // console.log(topTenUser);
        return reply({
          topTenHighestLevel: topTenUser
        });
      })
      .catch(err => {
        console.log(err);
        return reply(new Boom.wrap(err));
      });
  },

  getPublicProfile: (request, reply) => {
    let queryObj = {};
    if (request.query.userId)
      queryObj._id = request.query.userId;
    if (request.query.email)
      queryObj.email = request.query.email;
    User
      .findOneAsync(queryObj, { createdAt: 0, updatedAt: 0, isActive: 0, role: 0, words: 0 })
      .then(user => {
        return reply({
          userPublicData: user
        });
      })
      .catch(err => {
        console.log(err);
        return reply(new Boom.wrap(err));
      });
  }
};