module.exports = (server) => {
    const controller = require("../controllers/controller.js");

    server.post(
        "/user_check",
        controller.checkUser,
    );

    server.post(
        "/id_duplicate_check",
        controller.checkIdDuplication
    );

    server.post(
        "/sign_up",
        controller.insertionUserInfo
    );

    server.post(
        "/memo_insert",
        controller.insertionMemo
    );

    server.get(
        "/load_memo",
        controller.loadMemo
    );
}