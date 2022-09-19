const jwt = require('jsonwebtoken');
const model = require('../models/model');

exports.checkUser = async (req, res) => {
    try {
      const checkUser = await model.checkUser(req.body);
      if (checkUser !== undefined && checkUser.length === 1) {
        res.send({ result: checkUser });
      } else {
        res.send({ result: "fail" });
      }
    } catch (err) {
      console.log(err);
    }
  };

exports.checkIdDuplication = async (req, res) => {
  try {
    const checkIdDup = await model.checkIdDup(req.body);
    if (checkIdDup !== undefined && checkIdDup.length === 1) {
      res.send({ result: "fail" });
    } else {
      res.send({ result: checkIdDup });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.insertionUserInfo = async (req, res) => {
  try {
    const insertInfo = await model.insertInfo(req.body);
    if (insertInfo !== undefined && insertInfo.affectedRows === 1) {
      res.send({ result: insertInfo });
    } else {
      res.send({ result: "fail" });
    }
  } catch (err) {
    console.log(err);
  }
};