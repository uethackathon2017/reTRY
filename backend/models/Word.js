'use strict';

const mongoose = require('mongoose');

let WordSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  def: [{
    pos: String,
    definition: String,
    definition_en: String
  }],
  synonyms: [ String ],
  antonyms: [ String ],
  topics: [ mongoose.Schema.Types.ObjectId ],
  targets: [ String ],
  pronunciation: [ String ],
  frequency: Number,
  audio: String,
  image: String,
  example: [ String ]
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Word', WordSchema, 'words');