const connection = require('../common/db');
const query = require('../queries/query');

exports.userCheck = async (req, res) => {
    try {
      const promisePool = connection.promise();
      const [rows] = await promisePool.query(query.checkUser(req));
      return rows;
    } catch (error) {
      console.log(error);
    }
  };

exports.checkIdDup = async (req, res) => {
  try {
    const promisePool = connection.promise();
    const [rows] = await promisePool.query(query.checkIdDup(req));
    return rows;
  } catch (error) {
    console.log(error);
  }
};

exports.insertInfo = async (req, res) => {
  try {
    const promisePool = connection.promise();
    const [rows] = await promisePool.query(query.insertInfo(req));
    return rows;
  } catch (error) {
    console.log(error);
  }
};

exports.insertionMemo = async (req, res) => {
  try {
    const promisePool = connection.promise();
    const [rows] = await promisePool.query(query.insertionMemo(req));
    return rows;
  } catch (error) {
    console.log(error);
  }
};

exports.loadMemo = async () => {
  try {
    const promisePool = connection.promise();
    const [rows] = await promisePool.query(query.loadMemo);
    return rows;
  } catch (error) {
    console.log(error);
  }
};