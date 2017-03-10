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
  }
};