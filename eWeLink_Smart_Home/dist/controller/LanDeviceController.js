"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lanControlAuthenticationUtils_1 = __importDefault(require("../utils/lanControlAuthenticationUtils"));
var logger_1 = require("../utils/logger");
var LanDeviceController = (function () {
    function LanDeviceController(props) {
        this.type = 2;
        var deviceId = props.deviceId, ip = props.ip, _a = props.port, port = _a === void 0 ? 8081 : _a, disabled = props.disabled, encryptedData = props.encryptedData, iv = props.iv, target = props.target, index = props.index;
        this.ip = ip;
        this.target = target;
        this.port = port;
        this.deviceId = deviceId;
        this.iv = iv;
        this.disabled = disabled;
        this.encryptedData = encryptedData;
        this.online = true;
        var devicekey = props.devicekey, selfApikey = props.selfApikey, deviceName = props.deviceName, extra = props.extra, params = props.params, uiid = props.uiid;
        this.devicekey = devicekey;
        this.selfApikey = selfApikey;
        this.deviceName = deviceName;
        this.extra = extra;
        this.params = params;
        this.uiid = uiid;
        if (index) {
            this.index = index;
        }
    }
    return LanDeviceController;
}());
LanDeviceController.prototype.parseEncryptedData = function () {
    try {
        if (this.iv && this.devicekey && this.encryptedData) {
            var res = lanControlAuthenticationUtils_1.default.decryptionData({
                iv: this.iv,
                key: this.devicekey,
                data: this.encryptedData,
            });
            return JSON.parse(res);
        }
        return null;
    }
    catch (error) {
        logger_1.logger.warn("LanDeviceController error: ".concat(error));
        return null;
    }
};
exports.default = LanDeviceController;
