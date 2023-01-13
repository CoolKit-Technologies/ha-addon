"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lanControlAuthenticationUtils_1 = __importDefault(require("./lanControlAuthenticationUtils"));
exports.default = (function (device) {
    var txt = device.txt, a = device.a, srv = device.srv;
    var _a = txt.data1, data1 = _a === void 0 ? '' : _a, _b = txt.data2, data2 = _b === void 0 ? '' : _b, _c = txt.data3, data3 = _c === void 0 ? '' : _c, _d = txt.data4, data4 = _d === void 0 ? '' : _d;
    try {
        return {
            deviceId: txt.id,
            type: txt.type,
            encryptedData: "".concat(data1).concat(data2).concat(data3).concat(data4),
            ip: a,
            port: srv.port,
            target: srv.target,
            iv: lanControlAuthenticationUtils_1.default.decryptionBase64(txt.iv),
        };
    }
    catch (error) {
        return null;
    }
});
