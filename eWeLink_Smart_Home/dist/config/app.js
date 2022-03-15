"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appSecret = exports.appId = void 0;
var config_1 = require("./config");
var appId = '4s1FXKC9FaGfoqXhmXSJneb3qcm1gOak';
exports.appId = appId;
var appSecret = 'oKvCM06gvwkRbfetd6qWRrbC3rFrbIpV';
exports.appSecret = appSecret;
if (config_1.debugMode) {
    exports.appId = appId = '4s1FXKC9FaGfoqXhmXSJneb3qcm1gOak';
    exports.appSecret = appSecret = 'oKvCM06gvwkRbfetd6qWRrbC3rFrbIpV';
}
