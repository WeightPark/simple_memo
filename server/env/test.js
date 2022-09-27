// const jwt = require('jsonwebtoken');
// console.log(module.exports === exports);
const bcrypt = require('bcrypt');
const saltRounds = 10;  // key stretching 횟수

// const days = ["mon", "tues", "wednes", "thurs", "fri"];
// const test = days.map(day => `${day}day`);

// console.log(test);

// const test = (e) => {
//     return e
// }

// console.log(test(1))
let password = "abde123"
let bcPw = bcrypt.hash(password, saltRounds)

const bb = async() => {
    bcrypt.compare(password, bcPw, (error, isMatch) => {
        if (error) {
            return error
        }
        if (isMatch) {
            return match
        }
    })
}

// const valid = bcrypt.compare(password, bcPw);
console.log(bcPw)
