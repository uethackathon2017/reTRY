'use strict';

const { User, Topic } = require('../models');
const Boom = require('boom');

module.exports = {
  getTopics: (request, reply) => {
    Topic
      .find({})
      .then(topics => {
        return reply({
          topics: topics
        });
      })
      .catch(err => {
        console.log(err);
        return reply(new Boom.wrap(err));
      });
  }
};