'use strict';

const fs = require('fs');
let handlers = {};
let files;

try {
  files = fs.readdirSync(__dirname);
} catch (err) {
  console.log(err);
}
files.forEach((file) => {
  if (file !== 'index.js') {
    handlers[file.split('.')[0]] = require(`./${file}`);
  }
});

module.exports = handlers;