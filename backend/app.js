'use strict';

const Hapi = require('hapi');
const env = require('./env.json');
const config = require('./config');
const models = require('./models');
const cluster = require('cluster');

const goodOptions = config.logOptions;
const hapiSwaggerOptions = config.hapiSwaggerOptions;

if (cluster.isMaster) {
  cluster.fork();
  let server = new Hapi.Server({
    connections: {
      routes: {
        cors: true
      }
    }
  });

  server.connection({ host: env.connection.api.host, port: env.connection.api.port, labels: [ 'api' ] });
  server.connection({ host: env.connection.ws.host, port: env.connection.ws.port, labels: [ 'ws' ] });

  let api = server.select('api');
  let ws = server.select('ws');

  // API configurations
  var apiRoutes = require('./apiRoutes');
  var validateFunction = require('./utils/validateFunction');

  api.register([{
      register: require('hapi-auth-jwt2')
    }, {
      register: require('good'),
      options: goodOptions
    }, {
      register: require('inert')
    }, {
      register: require('vision')
    }, {
      register: require('hapi-swagger'),
      options: hapiSwaggerOptions
    }], (err) => {
      if (err)
        throw err;
      api.auth.strategy('jwt', 'jwt', {
        key: config.jwt.secret,
        validateFunc: validateFunction,
        verifyOptions: {
          algorithms: ['HS256']
        }
      });
      api.auth.default('jwt');
    
      apiRoutes.push({
        method: 'GET',
        path: '/',
        handler: (req, reply) => {
          return reply.redirect(`${api.info.uri}/documentation`);
        },
        config: {
          auth: false
        }
      });
      api.route(apiRoutes);
  });

  // Start server
  server.start((err) => {
    if (err)
      throw err;
    else {
      console.log(`API is running at: ${api.info.uri}`);
      console.log(`WEB SOCKET is running at: ${ws.info.uri}`);
      models.mongoInit(() => {
        console.log('Connected to mongodb');
        // Web socket initialization
        require('./ws').wsInit(ws.listener);
      });
    }
  });
} else {
  const redisClient = require('./utils/redis');
  const async = require('async');
  const TASK_SCHEDULED_TIMER = 500;
  let task = (callback) => {
    redisClient.smembers('listWaitingPlayers', (err, replies) => {
      if (replies.length > 1) {
        let firstPlayerIdx = randomIndex(0, replies.length - 2);
        let secondPlayerIdx = randomIndex(firstPlayerIdx + 1, replies.length - 1);
        redisClient.smembers('listWaitingPlayers', (err, replies) => {
          let waitingPlayers = replies;

          const firstPlayer = waitingPlayers[firstPlayerIdx];
          const secondPlayer = waitingPlayers[secondPlayerIdx];


          redisClient.srem('listWaitingPlayers', [ firstPlayer, secondPlayer ]);
          process.send({ firstPlayer: firstPlayer, secondPlayer: secondPlayer });
        });
      }
    });
    callback();
  };
  let runTask = (task, callback) => {
    task(callback);
  };
  let queue = async.queue(runTask, 1);
  let refillQueue = () => {
    queue.push(task);
  };
  queue.drain = () => {
    setTimeout(refillQueue, TASK_SCHEDULED_TIMER);
  };
  refillQueue();
}

var randomIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};