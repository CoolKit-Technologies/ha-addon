"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appSecret = exports.appId = void 0;
var config_1 = require("./config");
var process_1 = __importDefault(require("process"));
var appId = '4s1FXKC9FaGfoqXhmXSJneb3qcm1gOak';
exports.appId = appId;
var appSecret = 'oKvCM06gvwkRbfetd6qWRrbC3rFrbIpV';
exports.appSecret = appSecret;
exports.appId = appId = process_1.default.env.CK_API_ENV === 'test' ? 'iY6iazKsHokdS9FSci9AKbWTMCXUchaf' : '4s1FXKC9FaGfoqXhmXSJneb3qcm1gOak';
exports.appSecret = appSecret = process_1.default.env.CK_API_ENV === 'test' ? 'JBLkhfhNH6kiLD1xnsiDCaXPZn4qhi1O' : 'oKvCM06gvwkRbfetd6qWRrbC3rFrbIpV';
if (config_1.debugMode) {
    exports.appId = appId = '4s1FXKC9FaGfoqXhmXSJneb3qcm1gOak';
    exports.appSecret = appSecret = 'oKvCM06gvwkRbfetd6qWRrbC3rFrbIpV';
}
