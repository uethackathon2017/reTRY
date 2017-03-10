'use strict';

const mongoose = require('mongoose');

let QuizSchema = new mongoose.Schema({
  question: {
    content: String,
    pronounce: String,
    pos: String,
    image: String,
    audio: String,
    description_en: String,
    description_vi: String
  },
  answers: [{
    content: String,
    pronounce: [ String ],
    pos: String,
    image: String,
    audio: String
  }],
  key: Number,
  targets: [ String ],
  complexity: Number,
  topics: [ mongoose.Schema.Types.ObjectId ],
  relatedWords: [ String ],
  type: {
    type: String,
    enum: [ 'vn_en', 'en_vi', 'missingChar', 'missingWord', 'listen', 'image' ]
  },
  duration: Number
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Quiz', QuizSchema, 'quizes');