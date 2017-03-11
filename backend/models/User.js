'use strict';

const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    fbId: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String
    },
    fbLink: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    pictureURL: {
        type: String
    },
    gender: {
        type: String
    },
    friendList: [mongoose.Schema.Types.ObjectId],
    level: {
        type: Number,
        default: 1
    },
    score: {
        type: Number,
        default: 0
    },
    awards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Award'
    }],
    words: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Word'
        },
        passCount: Number,
        failCount: Number
    }],
    role: {
        type: String,
        require: true,
        enum: ['admin', 'common'],
        default: 'common'
    },
    isActive: {
        type: Boolean,
        require: true,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('User', UserSchema, 'users');