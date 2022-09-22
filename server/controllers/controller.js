const jwt = require('jsonwebtoken');
const secret_key = require('../env/secret_key');
const model = require('../models/model');

exports.checkUser = async (req, res) => {
    try {
      const checkUser = await model.userCheck(req.body);
      if (checkUser !== undefined && checkUser.length === 1) {
        token = jwt.sign(
          {
            type: "JWT",
            id: req.body.id,
          },
          secret_key.secretKey,
          {
            expiresIn: "30m",
            issuer: "admin",
          }
        )
        res.send({
          code: 200,
          message: "토큰 발급 완료",
          token: token,
        })
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
    const insertionUserInfo = await model.insertionUserInfo(req.body);
    if (insertionUserInfo !== undefined && insertionUserInfo.affectedRows === 1) {
      res.send({ result: "success" });
    } else {
      res.send({ result: "fail" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.insertionMemo = async (req, res) => {
  try {
    const insertionMemo = await model.insertionMemo(req.body);
    if (insertionMemo !== undefined && insertionMemo.affectedRows === 1) {
      res.send({ result: "success" });
    } else {
      res.send({ result: "fail" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.loadMemo = async (req, res) => {
  try {
    const loadMemo = await model.loadMemo();
    if (loadMemo !== undefined && loadMemo.length > 0) {
      res.send({ result: loadMemo });
    } else {
      res.send({ result: "fail" });
    }
  } catch (err) {
    console.log(err);
  }
};
