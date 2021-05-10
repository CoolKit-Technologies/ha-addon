"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var restApi_1 = require("../apis/restApi");
var CloudDualR3Controller_1 = __importDefault(require("../controller/CloudDualR3Controller"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("../controller/CloudMultiChannelSwitchController"));
var CloudTandHModificationController_1 = __importDefault(require("../controller/CloudTandHModificationController"));
var DiyDeviceController_1 = __importDefault(require("../controller/DiyDeviceController"));
var LanDualR3Controller_1 = __importDefault(require("../controller/LanDualR3Controller"));
var LanMultiChannelSwitchController_1 = __importDefault(require("../controller/LanMultiChannelSwitchController"));
exports.default = (function (device) {
    if (device instanceof DiyDeviceController_1.default) {
        return;
    }
    if (device instanceof CloudTandHModificationController_1.default) {
        restApi_1.removeStates(device.entityId);
        restApi_1.removeStates("sensor." + device.deviceId + "_h");
        restApi_1.removeStates("sensor." + device.deviceId + "_t");
    }
    if (device instanceof CloudMultiChannelSwitchController_1.default || device instanceof CloudDualR3Controller_1.default) {
        for (var i = 0; i < device.maxChannel; i++) {
            restApi_1.removeStates(device.entityId + "_" + (i + 1));
        }
    }
    if (device instanceof LanMultiChannelSwitchController_1.default || device instanceof LanDualR3Controller_1.default) {
        if (device.maxChannel) {
            for (var i = 0; i < device.maxChannel; i++) {
                restApi_1.removeStates(device.entityId + "_" + (i + 1));
            }
        }
    }
    restApi_1.removeStates(device.entityId);
});
