'use strict';

const fs = require('fs');
let routeFiles = fs.readdirSync(__dirname + '/../apiRoutes');
let hapiSwaggerTags = [];

routeFiles.forEach((file) => {
  if (file !== 'index.js') {
    hapiSwaggerTags.push({
      name: file.split('.')[0]
    });
  }
});

module.exports = {
  jwt: {
    secret: 'thisisasecretkey.pleasedonotusesuchasimplekeylikethisinproduction',
    accessTokenExpiration: '1d',
    refreshTokenExpiration: '7d'
  },
  logOptions: {
    ops: {
      interval: 1000
    },
    reporters: {
      myConsoleReporter: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*' }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  },
  hapiSwaggerOptions: {
    info: {
      title: 'RETRY APP API DOCUMENTATION',
      version: require('../package.json').version
    },
    sortEndpoints: 'method',
    tags: hapiSwaggerTags,
    sortTags: 'name'
  },
  brcyptOptions: {
    saltLength: 10
  }
};