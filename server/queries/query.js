exports.login = req => {
    return `SELECT user_pw FROM user_info WHERE user_id = '${req.id}'`;
};

exports.dupIdCheck = req => {
    return `SELECT * FROM user_info WHERE user_id = '${req.id}'`;
};

exports.signUp = (id, password) => {
    return `INSERT INTO user_info VALUES('${id}', '${password}')`;
};

exports.regMemo = req => {
    return `INSERT INTO memo_info(memo_title, memo_content) VALUES ("${req.title}", "${req.content}");`;
};

exports.detailMemo = req => {
    return `SELECT * FROM memo_info WHERE seq='${req.seq}'`
};

exports.updateMemo = req => {
    return `UPDATE memo_info SET memo_title = '${req.title}', memo_content = '${req.content}' WHERE seq = '${req.seq}'`;
};

exports.deleteMemo = req => {
    return `DELETE FROM memo_info WHERE seq = '${req.seq}'`;
}

exports.loadMemo = 'SELECT * FROM memo_info ORDER BY seq DESC';
