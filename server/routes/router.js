module.exports = (server) => {
    const controller = require("../controllers/controller.js");

    server.post(
        "/login",
        controller.login,
    );

    server.post(
        "/id_duplicate_check",
        controller.dupIdCheck
    );

    server.post(
        "/sign_up",
        controller.signUp
    );

    server.post(
        "/memo_insert",
        controller.regMemo
    );

    server.post(
        "/detail_memo",
        controller.detailMemo
    );

    server.post(
        "/update_memo",
        controller.updateMemo
    );

    server.post(
        "/delete_memo",
        controller.deleteMemo
    );

    server.get(
        "/load_memo",
        controller.loadMemo
    );
}