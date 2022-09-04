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