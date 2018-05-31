"use strict";

const scientist = {
  name: 'nikola',
  surname: 'tesla'
};

/*
Create a proxy wrapping the scientist object.
Intercept ("traps") all access to every property on the target and uppercase its return value
*/
const uppercaseScientist = new Proxy(scientist, {
  get: (target, property) => target[property].toUpperCase()
});

console.log(uppercaseScientist.name, uppercaseScientist.surname); // NIKOLA TESLA
