'use strict';

const { User, Topic, Word } = require('../models');
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
  },

  getWordData: (request, reply) => {
    let queryObj = {};
    if (request.query.wordId)
      queryObj._id = request.query.wordId;
    if (request.query.wordName)
      queryObj.name = request.query.wordName;
    Word
      .findOneAsync(queryObj)
      .then(word => {
        return reply({
          wordData: word
        });
      })
      .catch(err => {
        console.log(err);
        return reply(new Boom.wrap(err));
      });
  },

  getWordsByTopic: (request, reply) => {
    Word
      .find({ topics: request.query.topicId })
      .populate('topics')
      .then(words => {
        return reply({
          words: words
        });
      })
      .catch(err => {
        console.log(err);
        return reply(new Boom.wrap(err));
      });
  }
};