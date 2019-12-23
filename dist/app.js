"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var jwt = require("jsonwebtoken");
var config_1 = require("./config");
var app = express();
exports.app = app;
app.use(express.json());
app.listen(8080);
console.log('Server is started');
app.get('/', function (req, res) {
    res.send('Hello TODO World');
});
app.get("/api/verify", function (req, res) {
    try {
        var token = req.header("token");
        if (token == null) {
            res.status(403).send('Token not present');
        }
        else {
            jwt.verify(token, config_1.config.get('jwtSecretKey'), function (err, decoded) {
                if (!err) {
                    res.status(200).send('Valid Token');
                }
                else {
                    res.status(500).send('Invalid Token');
                }
            });
        }
    }
    catch (e) {
        throw (e);
    }
});
// Token Verification code
app.all("/api/*", function (req, res, next) {
    try {
        var token = req.header("token");
        if (!token) {
            res.status(403).send('Token not present');
        }
        else {
            jwt.verify(token, config_1.config.get('jwtSecretKey'), function (err, decoded) {
                if (!err) {
                    next();
                }
                else {
                    res.status(500).send('Invalid Token');
                }
            });
        }
    }
    catch (e) {
        throw (e);
    }
});
var api_user_login_1 = require("./api/api-user-login");
app.use('/auth', new api_user_login_1.ApiLoginSignup().dataRouter);
var api_todos_1 = require("./api/api-todos");
app.use('/api/todo', new api_todos_1.ApiTodos().dataRouter);
//# sourceMappingURL=app.js.map