exports.checkUser = (req) => {
    return `SELECT * FROM user_info WHERE user_id = '${req.id}' AND user_pw = '${req.password}'`;
};

exports.checkIdDup = (req) => {
    return `SELECT * FROM user_info WHERE user_id = '${req.id}'`;
};

exports.insertInfo = (req) => {
    return `INSERT INTO user_info VALUES('${req.id}', '${req.password}')`;
};

exports.insertionMemo = (req) => {
    return `INSERT INTO memo_info(memo_title, memo_content) VALUES ("${req.title}", "${req.content}");`;
};

exports.loadMemo = 'SELECT * FROM memo_info ORDER BY seq DESC';
