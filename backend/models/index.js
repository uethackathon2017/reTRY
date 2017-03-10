'use strict';

const fs = require('fs');
const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
mongoose.Promise = Promise;
const env = require('../env.json');

let models = {};
let files;

try {
  files = fs.readdirSync(__dirname);
} catch (err) {
  console.log(err);
}
files.forEach((file) => {
  if (file !== 'index.js') {
    models[file.split('.')[0]] = require(`./${file}`);
  }
});

models.mongoInit = (callback) => {
  mongoose.connectAsync(`mongodb://${env.databaseConnection.host}:${env.databaseConnection.port}/${env.databaseConnection.name}`, callback);
};

models.mongoose = mongoose;

module.exports = models;