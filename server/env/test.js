// const jwt = require('jsonwebtoken');
// console.log(module.exports === exports);
// const bcrypt = require('bcrypt');
// const saltRounds = 10;  // key stretching 횟수

// const days = ["mon", "tues", "wednes", "thurs", "fri"];
// const test = days.map(day => `${day}day`);

// console.log(test);

// const test = (e) => {
//     return e
// }

// console.log(test(1))
// let password = "abde123"
// let bcPw = bcrypt.hash(password, saltRounds)

// const bb = async() => {
//     bcrypt.compare(password, bcPw, (error, isMatch) => {
//         if (error) {
//             return error
//         }
//         if (isMatch) {
//             return match
//         }
//     })
// }

// // const valid = bcrypt.compare(password, bcPw);
// console.log(bcPw)

// const b = undefined
// const c = null
// let d;

// console.log(!!b);
// console.log(!!c);
// console.log(!d);
// console.log(!!d);

// const test = {
//     name : "park",
//     age : 32,
//     company : "qtii"
// };

// const test2 = ({ name : Name, ...rest }) => {
//     return 
// }
// console.log(name);
// console.log(rest);

const test = {
    name : "park"
};

const test2 = {};

const test3 = undefined;

const test4 = () => {
    return test.name
}

// console.log(test4())

let test5 = () => {
    const name = undefined
    return name
};
// console.log(test5());


const test6 = {
    
};

const test7 = () => {
    if (test6) {
        return 1
    }
    return 2
}

console.log(test6)
console.log(test7())