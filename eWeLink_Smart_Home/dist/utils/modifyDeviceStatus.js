"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDeviceRate = exports.changeDeviceUnit = exports.modifyDeviceStatus = void 0;
var dataUtil_1 = require("./dataUtil");
var modifyDeviceStatus = function (id, status) {
    return (0, dataUtil_1.appendData)('disabled.json', [id], status);
};
exports.modifyDeviceStatus = modifyDeviceStatus;
var changeDeviceUnit = function (id, unit) {
    return (0, dataUtil_1.appendData)('unit.json', [id], unit);
};
exports.changeDeviceUnit = changeDeviceUnit;
var setDeviceRate = function (id, rate) {
    return (0, dataUtil_1.appendData)('rate.json', [id], rate);
};
exports.setDeviceRate = setDeviceRate;
