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

userRoutes.push({
  method: 'GET',
  path: '/users/getTopTenHighestLevel',
  handler: userHandler.getTopTenHighestLevel,
  config: {
    auth: {
      mode: 'required',
      strategies: [ 'jwt' ],
      access: {
        scope: [ 'admin', 'common', '+accessToken' ]
      }
    },
    tags: [ 'api', 'users' ],
    description: 'Get top 10 users who have highest score',
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
          topTenHighestLevel: Joi.array().items(Joi.object({}).required().unknown())
        }).required(),
        // TODO: Response format in case of failure
      }
    }
  }
});

userRoutes.push({
  method: 'GET',
  path: '/users/getPublicProfile',
  handler: userHandler.getPublicProfile,
  config: {
    auth: {
      mode: 'required',
      strategies: [ 'jwt' ],
      access: {
        scope: [ 'admin', 'common', '+accessToken' ]
      }
    },
    tags: [ 'api', 'users' ],
    description: 'Get public profile of one user',
    notes: 'Require access token',
    validate: {
      headers: Joi.object({
        authorization: Joi.string().required().description('Access token')
      }).required().unknown(),
      query: {
        userId: Joi.string().description('User id'),
        email: Joi.string().email().description('Email')
      }
    },
    response: {
      status: {
        // Response format in case of success
        200: Joi.object({
          userPublicData: Joi.object({}).required().unknown()
        }).required(),
        // TODO: Response format in case of failure
      }
    }
  }
});


userRoutes.push({
  method: 'GET',
  path: '/users/upgradeToVip',
  handler: userHandler.upgradeToVip,
  config: {
    auth: {
      mode: 'required',
      strategies: [ 'jwt' ],
      access: {
        scope: [ 'admin', 'common', '+accessToken' ]
      }
    },
    tags: [ 'api', 'users' ],
    description: 'Upgrade to vip',
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
          message: Joi.string().required()
        }).required(),
        // TODO: Response format in case of failure
      }
    }
  }
});

module.exports = userRoutes;