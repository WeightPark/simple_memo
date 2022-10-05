const connection = require('../common/db');
const query = require('../queries/query');

exports.login = async (req) => {
    try {
      const promisePool = connection.promise();
      const [rows] = await promisePool.query(query.login(req));
      return rows;
    } catch (error) {
      console.log(error);
    }
  };

exports.dupIdCheck = async (req, res) => {
  try {
    const promisePool = connection.promise();
    const [rows] = await promisePool.query(query.dupIdCheck(req));
    return rows;
  } catch (error) {
    console.log(error);
  }
};

exports.signUp = async (id, password) => {
  try {
    const promisePool = connection.promise();
    const [rows] = await promisePool.query(query.signUp(id, password));
    return rows;
  } catch (error) {
    console.log(error);
  }
};

exports.regMemo = async (req, res) => {
  try {
    const promisePool = connection.promise();
    const [rows] = await promisePool.query(query.regMemo(req));
    return rows;
  } catch (error) {
    console.log(error);
  }
};

exports.updateMemo = async (req, res) => {
  try {
    const promisePool = connection.promise();
    const [rows] = await promisePool.query(query.updateMemo(req));
    return rows;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteMemo = async (req, res) => {
  try {
    const promisePool = connection.promise();
    const [rows] = await promisePool.query(query.deleteMemo(req));
    return rows;
  } catch (error) {
    console.log(error);
  }
};

exports.loadMemo = async (req, res) => {
  try {
    const promisePool = connection.promise();
    const [rows] = await promisePool.query(query.loadMemo(req.user_id));
    return rows;
  } catch (error) {
    console.log(error);
  }
};