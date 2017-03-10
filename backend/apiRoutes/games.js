'use strict';

const gameHandler = require('../handlers').games;
const Joi = require('joi');
let gameRoutes = [];

gameRoutes.push({
  method: 'GET',
  path: '/games/getTopics',
  handler: gameHandler.getTopics,
  config: {
    auth: {
      mode: 'required',
      strategies: [ 'jwt' ],
      access: {
        scope: [ 'admin', 'common', '+accessToken' ]
      }
    },
    tags: [ 'api', 'games' ],
    description: 'Get all topics',
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
          topics: Joi.array().items(Joi.object({}).required().unknown())
        }).required(),
        // TODO: Response format in case of failure
      }
    }
  }
});

gameRoutes.push({
  method: 'GET',
  path: '/games/getWordData',
  handler: gameHandler.getWordData,
  config: {
    auth: {
      mode: 'required',
      strategies: [ 'jwt' ],
      access: {
        scope: [ 'admin', 'common', '+accessToken' ]
      }
    },
    tags: [ 'api', 'games' ],
    description: 'Get word data by id or by name',
    notes: 'Require access token',
    validate: {
      headers: Joi.object({
        authorization: Joi.string().required().description('Access token')
      }).required().unknown(),
      query: {
        wordId: Joi.string().description('Word id'),
        wordName: Joi.string().description('Word name')
      }
    },
    response: {
      status: {
        // Response format in case of success
        200: Joi.object({
          wordData: Joi.object({}).required().unknown()
        }).required(),
        // TODO: Response format in case of failure
      }
    }
  }
});

module.exports = gameRoutes;