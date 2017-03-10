'use strict';

const redis = require('redis');
let client = redis.createClient();
client.on('connect',() => {
  console.log('Connected to redis server');
});
module.exports = client;