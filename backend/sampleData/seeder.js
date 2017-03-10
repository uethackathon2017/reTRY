'use strict';

const Promise = require('bluebird');
const jsonFile = Promise.promisifyAll(require('jsonfile'));
const fs = Promise.promisifyAll(require('fs'));
const faker = require('faker');
const { User, Topic, Word, Quiz, mongoInit } = require('../models');

const topicPath = __dirname + '/raw/topic/topics.json';
const vocabPath = __dirname + '/raw/vocabulary';

mongoInit(err => {
  if (err)
    throw err;
  console.log('Cleaning "User" table...');
  User
    .removeAsync()
    .then(() => {
      console.log('Documents on "User" table cleared!');
      console.log('Cleaning "Topic" table...');
      return Topic.removeAsync();
    })
    .then(() => {
      console.log('Documents on "Topic" table cleared!');
      console.log('Cleaning "Word" table...');
      return Word.removeAsync();
    })
    .then(() => {
      console.log('Documents on "Word" table cleared!');
      console.log('Cleaning "Quiz" table...');
      return Quiz.removeAsync();
    })
    .then(() => {
      console.log('Documents on "Quiz" table cleared!');
      console.log('Importing users...');
      let userBulk = [];
      for (let idx = 0; idx < 50; idx++) {
        let score = faker.random.number({min: 50, max: 3000});
        let newUser = {
          fbId: '2139019283102' + idx,
          email: faker.internet.email(),
          fbLink: faker.internet.url(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          pictureURL: faker.image.imageUrl(),
          gender: faker.random.boolean() ? 'male' : 'female',
          friendList: [],
          level: calculateLevel(score),
          score: score,
          awards: [],
          words: [],
          role: 'common',
          isActive: true
        };
        userBulk.push(newUser);
      }
      return User.insertManyAsync(userBulk);
    })
    .then(users => {
      console.log(users.length + ' user(s) inserted!');
      return jsonFile.readFileAsync(topicPath);
    })
    .then(topics => {
      console.log('Importing topics...');
      return Promise.join(Topic.insertManyAsync(topics), fs.readdirAsync(vocabPath));
    })
    .then(([ topics, topicFolders ]) => {
      console.log(topics.length + ' topic(s) inserted!');
      console.log('Importing words...');
      let wordObjects = {};
      let words = [];
      topicFolders.forEach(topicFolder => {
        wordObjects[topicFolder] = fs.readdirSync(vocabPath + '/' + topicFolder);
      });
      for (let prop in wordObjects) {
        if (wordObjects.hasOwnProperty(prop)) {
          wordObjects[prop].forEach(elem => {
            let word = jsonFile.readFileSync(vocabPath + '/' + prop + '/' + elem);
            topics.forEach(topic => {
              let matchIdx = word.topics.indexOf(topic.name);
              if (matchIdx !== -1) {
                word.topics.splice(matchIdx, 1);
                word.topics.push(topic._id);
              }
            });
            words.push(word);
          });
        }
      }
      return Word.insertManyAsync(words);
    })
    .then(result => {
      console.log(result.length + ' word(s) inserted!');
      console.log('Importing quizzes...');
      let quizBulk = [];
      for (let idx = 0; idx < result.length - 4; idx++) {
        let vnEnQuiz = {
          question: {
            content: result[idx].def[0].definition,
            description_vi: 'Chọn từ có nghĩa phù hợp',
            description_en: 'Choose the word which has the following definition'
          },
          answers: [
            { content: result[idx].name, pronounce: result[idx].pronunciation, pos: result[idx].def[0].pos, audio: result[idx].audio, image: result[0].image },
            { content: result[idx].name, pronounce: result[idx + 1].pronunciation, pos: result[idx + 1].def[0].pos, audio: result[idx + 1].audio, image: result[idx + 1].image },
            { content: result[idx].name, pronounce: result[idx + 2].pronunciation, pos: result[idx + 2].def[0].pos, audio: result[idx + 2].audio, image: result[idx + 2].image },
            { content: result[idx].name, pronounce: result[idx + 3].pronunciation, pos: result[idx + 3].def[0].pos, audio: result[idx + 3].audio, image: result[idx + 3].image }
          ],
          key: 0,
          targets: result[idx].targets,
          complexity: 1/result[idx].frequency,
          topics: result[idx].topics,
          relatedWords: [ result[idx]._id, result[idx + 1]._id, result[idx + 2]._id, result[idx + 3]._id ],
          type: 'vn_en',
          duration: 10
        };
        // console.log(vnEnQuiz);
        quizBulk.push(vnEnQuiz);
      }
      return Quiz.insertManyAsync(quizBulk);
    })
    .then(result => {
      // console.log(result);
      console.log(result.length + ' quiz(zes) inserted!');
      process.exit(0);
    })
    .catch(err => {
      throw err;
    });
});

var calculateLevel = (score) => {
  return 1 + parseInt(score/30);
};