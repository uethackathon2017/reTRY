'use strict';

const fs = require('fs');

let routes = [];
let files;

try {
  files = fs.readdirSync(__dirname);
} catch (err) {
  console.log(err);
}
files.forEach((file) => {
  if (file !== 'index.js') {
    routes.push(...require(`./${file}`));
  }
});

module.exports = routes;