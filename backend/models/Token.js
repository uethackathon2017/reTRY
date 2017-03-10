'use strict';

const mongoose = require('mongoose');

let TokenSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    require: true,
    unique: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  type: {
    type: String,
    enum: [ 'accessToken', 'refreshToken' ],
    require: true
  },
  isBanned: {
    type: Boolean,
    require: true,
    default: false
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Token', TokenSchema, 'tokens');