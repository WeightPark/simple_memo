const jwt = require('jsonwebtoken');
const model = require('../models/model');
const secret_key = require('../env/secret_key');
const bcrypt = require('bcrypt');
const saltRounds = 10;  // key stretching 횟수

exports.login = async (req, res) => {
  try {
    const password = await model.login(req.body)
    bcrypt.compare(req.body.password, password[0].user_pw, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ err: "불일치" });
      }
      if (isMatch) {
          token = jwt.sign(
            {
              type : "JWT",
              id : req.body.id,
            },
            secret_key.secretKey,
            {
              expiresIn: "10m",
            }
          );
          res.send({
            code : 200,
            message : "토큰 발급 완료",
            token : token,
            id : req.body.id 
          });
      }
    });
  } catch (err) {
    return res.status(500).json({
      code : 500,
      message : '서버 에러'
    });
  }
};

exports.dupIdCheck = async (req, res) => {
  try {
    const dupIdCheck = await model.dupIdCheck(req.body);
    if (dupIdCheck !== undefined && dupIdCheck.length === 1) {
      res.send({ result: "fail" });
    } else {
      res.send({ result: "success" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.signUp = (req, res) => {
  let { id, password } = req.body;
  try {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err)
        return res.status(500).json({
          registerSuccess: false,
          message: "비밀번호 해쉬화에 실패",
        });
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err)
          return res.status(500).json({
            registerSuccess: false,
            message: "비밀번호 해쉬화에 실패",
          });
        password = hash;
        const signUp = await model.signUp(id, password);
        if (signUp !== undefined && signUp.affectedRows === 1) {
          res.send({ result: "success" });
        } else {
          res.send({ result: "fail" });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.regMemo = async (req, res) => {
  try {
    const regMemo = await model.regMemo(req.body);
    if (regMemo !== undefined && regMemo.affectedRows === 1) {
      res.send({ result: "success" });
    } else {
      res.send({ result: "fail" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.detailMemo = async (req, res) => {
  try {
    const detailMemo = await model.detailMemo(req.body);
    if (detailMemo !== undefined && detailMemo.length === 1) {
      res.send({ result: "fail" });
    } else {
      res.send({ result: detailMemo }); // 후에 고쳐
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateMemo = async (req, res) => {
  try {
    const updateMemo = await model.updateMemo(req.body);
    if (updateMemo !== undefined && updateMemo.affectedRows === 1) {
      res.send({ result: "success" });
    } else {
      res.send({ result: "fail" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteMemo = async (req, res) => {
  try {
    const deleteMemo = await model.deleteMemo(req.body);
    if (deleteMemo !== undefined && deleteMemo.affectedRows === 1) {
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
    const loadMemo = await model.loadMemo(req.query);
    if (loadMemo !== undefined && loadMemo.length > 0) {
      res.send({ result: loadMemo });
    } else {
      res.send({ result: "fail" });
    }
  } catch (err) {
    console.log(err);
  }
};
