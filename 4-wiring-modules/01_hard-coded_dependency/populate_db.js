"use strict";

const sublevel = require('level-sublevel');
const level = require('level');
const bcrypt = require('bcrypt');
const uuid = require('node-uuid');
const async = require('async'); // Nifty lib for working with asyncronous javascript

const db = sublevel(level('example-db', {valueEncoding: 'json'}));
const usersDb = db.sublevel('users'); // Setup users "table/level" in example-db

const users = [
  {username: 'alice', password: 'secret'},
  {username: 'bob', password: 'secret'},
  {username: 'trudy', password: 'secret'}
];

async.forEach(users, (user, callback) => { // Execute in parallell using async
  usersDb.put(user.username, {
    hash: bcrypt.hashSync(user.password, 8)
  }, callback);
}, err => {
  if(err) {
    return console.log(err);
  }
  console.log('DB populated');
});
