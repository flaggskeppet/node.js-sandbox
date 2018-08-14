"use strict";

function* twoWayGenerator() {
  const what = yield;
  console.log('Hello ' + what);
}

const twoWay = twoWayGenerator();
twoWay.next();
twoWay.next('world');
