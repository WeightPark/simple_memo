const connection = require('../common/db');
const query = require('../queries/query');

exports.checkUser = async (req) => {
    try {
      const promisePool = connection.promise();
      const [rows] = await promisePool.query(query.checkUser(req));
      return rows;
    } catch (error) {
      console.log(error);
    }
  };

exports.checkIdDup = async (req) => {
  try {
    const promisePool = connection.promise();
    const [rows] = await promisePool.query(query.checkIdDup(req));
    return rows;
  } catch (error) {
    console.log(error);
  }
};