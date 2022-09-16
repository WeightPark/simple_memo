const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const secretKey = require('./jwtconfig').jswConfig.secretKey;
const options = require('./jwtconfig').jswConfig.options;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;
