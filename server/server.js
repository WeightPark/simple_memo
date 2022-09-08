// express 모듈 사용
const express = require("express");
const server = express();

// server에서의 경로 - 설명 추가 요망
const path = require("path");

// client와 server의 포트가 달라 server에서 요청을 허가해 주도록 하는 미들웨어 추가
const cors = require("cors");
const fs = require("fs");

const port = 443 || 5000;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, '../client/build')));

require('./routes/router')(server);

if (port === 5000) {
    const http = require("http");
    http.createServer(server).listen(port, function() {
        console.log("Express server has started on port " + port)
    });
} else {
    const https = require("https");

    // [CONFIGURE SSL FILE]
    const option = {
        key: fs.readFileSync(path.join(__dirname, "../../keyFile/server.key")),
        cert: fs.readFileSync(path.join(__dirname, "../../keyFile/server.crt"))
    };

    https.createServer(option, server).listen(port, function() {
        console.log("Express server has started on port " + port)
    });
};

// Client 접속 시 출력되는 첫번째 화면
server.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})