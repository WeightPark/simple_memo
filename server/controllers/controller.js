const jwt = require('jsonwebtoken');
const model = require('../models/model');
const secret_key = require('../env/secret_key');
const bcrypt = require('bcrypt');
const saltRounds = 10;  // key stretching 횟수

exports.login = async (req, res) => {
  console.log(req.body)
  try {
    const password = await model.login(req.body.data);
    bcrypt.compare(req.body.data.password, password[0].user_pw, (err, isMatch) => {
      if (err) {
        return res.status(401).json({ err: "Password not matched" });
      }
      if (isMatch) {
        token = jwt.sign(
          {
            type: "JWT",
            id: req.body.data.id,
          },
          secret_key.secretKey,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          code: 200,
          message: "토큰 발급 완료",
          token: token,
          id: req.body.data.id,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: "Login Error",
    });
  }
};

exports.dupIdCheck = async (req, res) => {
  try {
    const dupIdCheck = await model.dupIdCheck(req.body);
    if (dupIdCheck !== undefined && dupIdCheck.length === 1) {
      res.status(401).json({ code: 401, message: "Exist ID" });
    } else {
      res.status(200).json({ code: 200, message: "Valid ID" });
    }
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: "Connection(Check for duplicate ID) failed",
    });
  }
};

exports.signUp = (req, res) => {
  let { id, password } = req.body;
  try {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err)
        return res.status(500).json({
          registerSuccess: false,
          message: "Salting for password failed",
        });
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err)
          return res.status(500).json({
            registerSuccess: false,
            message: "Hashing for password failed",
          });
        password = hash;
        const signUp = await model.signUp(id, password);
        if (signUp !== undefined && signUp.affectedRows === 1) {
          res.status(200).json({ code: 200, message: "Sign up succeed" });
        } else {
          res.status(401).json({ result: "Sign up failed" });
        }
      });
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: "Connection(Sign up to simple_memo) failed",
    });
  }
};

exports.regMemo = async (req, res) => {
  try {
    const regMemo = await model.regMemo(req.body);
    if (regMemo !== undefined && regMemo.affectedRows === 1) {
      res.status(200).json({ code: 200, message: "Memo registration succeed" });
    } else {
      res.status(401).json({ code: 401, message: "Memo registration failed" });
    }
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: "Connection(Memo registration) failed",
    });
  }
};

exports.updateMemo = async (req, res) => {
  try {
    const updateMemo = await model.updateMemo(req.body);
    if (updateMemo !== undefined && updateMemo.affectedRows === 1) {
      res.status(200).json({ code: 200, message: "Memo update succeed" });
    } else {
      res.status(401).json({ code: 401, message: "Memo update failed" });
    }
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: "Connection(Memo update) failed",
    });
  }
};

exports.deleteMemo = async (req, res) => {
  try {
    const deleteMemo = await model.deleteMemo(req.body);
    if (deleteMemo !== undefined && deleteMemo.affectedRows === 1) {
      res.status(200).json({ code: 200, message: "Memo delete succeed" });
    } else {
      res.status(401).json({ code: 401, message: "Memo delete failed" });
    }
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: "Connection(Memo delete) failed",
    });
  }
};

exports.loadMemo = async (req, res) => {
  try {
    const loadMemo = await model.loadMemo(req.query);
    if (loadMemo !== undefined && loadMemo.length > 0) {
      res.status(200).json({ code: 200, message: "Memo load succeed", result: loadMemo });
    } else {
      res.status(401).json({ code: 401, message: "Memo load failed" });
    }
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: "Connection(Memo load) failed",
    });
  }
};
