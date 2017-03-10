'use strict';

const AuthenticationHandlers = require('../handlers').authentications;
const Joi = require('joi');
let authenticationRoutes = [];

authenticationRoutes.push({
  method: 'POST',
  path: '/authentications/facebookAuth',
  handler: AuthenticationHandlers.facebookAuth,
  config: {
    auth: false,
    tags: [ 'api', 'authentications' ],
    description: 'Authenticate with facebook',
    notes: 'Require facebook access token',
    validate: {
      headers: Joi.object({
        authorization: Joi.string().required().description('Facebook access token')
      }).required().unknown()
    },
    response: {
      status: {
        // Response format in case of success
        200: Joi.object({
          accessToken: Joi.string().required().description('Access token'),
          refreshToken: Joi.string().required().description('Refresh token')
        }).required(),
        // TODO: Response format in case of failure
      }
    }
  }
});

authenticationRoutes.push({
  method: 'POST',
  path: '/authentications/refreshToken',
  handler: AuthenticationHandlers.refreshToken,
  config: {
    auth: {
      mode: 'required',
      strategies: [ 'jwt' ],
      access: {
        scope: [ 'admin', 'common', '+refreshToken' ]
      }
    },
    tags: [ 'api', 'authentications' ],
    description: 'Refresh token',
    notes: 'Return a new access token and a new refresh token',
    validate: {
      headers: Joi.object({
        authorization: Joi.string().required().description('Refresh token')
      }).required().unknown()
    },
    response: {
      status: {
        // Response format in case of success
        200: Joi.object({
          accessToken: Joi.string().required(),
          refreshToken: Joi.string().required()
        }).required()
        // TODO: Response format in case of failure
      }
    }
  }
});

module.exports = authenticationRoutes;