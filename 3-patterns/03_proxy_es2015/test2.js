"use strict";

/*
Create a wrapper around an array creating a virtual array (Virtual since it never contains data).
The get trap intercepts indexing and returns an even number for the given index (just doubling it really)
The has trap intercepts the *in* operator and checks if the index is even
*/
const evenNumbers = new Proxy([], {
  get: (target, index) => index * 2,
  has: (target, number) => number % 2 === 0
});

console.log(2 in evenNumbers); // true
console.log(5 in evenNumbers); // false
console.log(evenNumbers[7]); // 14