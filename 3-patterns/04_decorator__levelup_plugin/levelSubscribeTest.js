"use strict";

const level = require('level');           
const levelSubscribe = require('./levelSubscribe');     

let db = level(__dirname + '/db', {valueEncoding: 'json'});

// Decorate the leveldb instance
db = levelSubscribe(db);

// Use the new method on the augmented object
db.subscribe( 
  {doctype: 'tweet', language: 'en'}, // Pattern
  (k, val) => console.log(val) // Listener
);

db.put('1', {doctype: 'tweet', text: 'Hi', language: 'en'}); 
db.put('2', {doctype: 'company', name: 'ACME Co.'});
