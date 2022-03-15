"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HaToken = void 0;
var config_1 = require("./config");
var auth;
exports.HaToken = auth;
if (config_1.debugMode) {
    exports.HaToken = auth = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIwYzcxNjc1MGNkODc0M2Y5YjI5Yjk5NWQ1OTQ0YjU4ZiIsImlhdCI6MTYzMzkyMzA5OSwiZXhwIjoxOTQ5MjgzMDk5fQ.FFl2zUGbX_86u7zomX1ybD9SNlBUTg5LPwh0vjdE7Zc';
}
