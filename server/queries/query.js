exports.checkUser = (req) => {
    return `SELECT * FROM user_info WHERE user_id = '${req.id}' AND user_pw = '${req.password}'`;
};

exports.checkIdDup = (req) => {
    return `SELECT * FROM user_info WHERE user_id = '${req.id}'`;
};