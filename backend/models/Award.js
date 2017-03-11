'use strict';

const mongoose = require('mongoose');

let AwardSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    imageURL: String,
    bonus_score: Number,
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Award', AwardSchema, 'awards');