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
}