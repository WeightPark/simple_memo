const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const e = require('express');
const secretKey = require('./jwtconfig').secretKey;
const options = require('./jwtconfig').options;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

let test = randToken.generate(16);
console.log(test);