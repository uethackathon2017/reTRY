'use strict';

const mongoose = require('mongoose');

let TopicSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  description: String,
  image: String
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Topic', TopicSchema, 'topics');