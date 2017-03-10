'use strict';

const userHandler = require('../handlers').users;
const Joi = require('joi');
let userRoutes = [];

userRoutes.push({
  method: 'GET',
  path: '/users/getUserData',
  handler: userHandler.getUserData,
  config: {
    auth: {
      mode: 'required',
      strategies: [ 'jwt' ],
      access: {
        scope: [ 'admin', 'common', '+accessToken' ]
      }
    },
    tags: [ 'api', 'users' ],
    description: 'Get all user data',
    notes: 'Require access token',
    validate: {
      headers: Joi.object({
        authorization: Joi.string().required().description('Access token')
      }).required().unknown()
    },
    response: {
      status: {
        // Response format in case of success
        200: Joi.object({
          userData: Joi.object({}).required().unknown()
        }).required(),
        // TODO: Response format in case of failure
      }
    }
  }
});

module.exports = userRoutes;