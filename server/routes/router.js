module.exports = (server) => {
    const controller = require("../controllers/controller.js");

    server.post(
        "/user_check",
        controller.checkUser
    );
}