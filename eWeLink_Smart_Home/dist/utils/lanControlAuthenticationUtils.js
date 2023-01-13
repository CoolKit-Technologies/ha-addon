"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_js_1 = __importDefault(require("crypto-js"));
var logger_1 = require("./logger");
var LanControlAuthenticationUtils = (function () {
    function LanControlAuthenticationUtils() {
    }
    LanControlAuthenticationUtils.encryptionData = function (_a) {
        var iv = _a.iv, key = _a.key, data = _a.data;
        try {
            var cipher = crypto_js_1.default.AES.encrypt(data, crypto_js_1.default.MD5(key), {
                iv: crypto_js_1.default.enc.Utf8.parse(iv),
                mode: crypto_js_1.default.mode.CBC,
                padding: crypto_js_1.default.pad.Pkcs7,
            });
            var base64Cipher = cipher.ciphertext.toString(crypto_js_1.default.enc.Base64);
            return base64Cipher;
        }
        catch (e) {
            logger_1.logger.error("encryptionData error: ".concat(e));
        }
    };
    LanControlAuthenticationUtils.decryptionData = function (_a) {
        var iv = _a.iv, key = _a.key, data = _a.data;
        var bytes = crypto_js_1.default.AES.decrypt(data, crypto_js_1.default.MD5(key), {
            iv: crypto_js_1.default.enc.Utf8.parse(iv),
            mode: crypto_js_1.default.mode.CBC,
            padding: crypto_js_1.default.pad.Pkcs7,
        });
        var decryptedData = bytes.toString(crypto_js_1.default.enc.Utf8);
        return decryptedData;
    };
    LanControlAuthenticationUtils.encryptionBase64 = function (str) {
        return crypto_js_1.default.enc.Base64.stringify(crypto_js_1.default.enc.Utf8.parse(str));
    };
    LanControlAuthenticationUtils.decryptionBase64 = function (base64Str) {
        return crypto_js_1.default.enc.Base64.parse(base64Str).toString(crypto_js_1.default.enc.Utf8);
    };
    return LanControlAuthenticationUtils;
}());
exports.default = LanControlAuthenticationUtils;
