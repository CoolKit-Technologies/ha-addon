"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var restApi_1 = require("../apis/restApi");
var CloudDualR3Controller_1 = __importDefault(require("../controller/CloudDualR3Controller"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("../controller/CloudMultiChannelSwitchController"));
var CloudTandHModificationController_1 = __importDefault(require("../controller/CloudTandHModificationController"));
var CloudUIID34Controller_1 = __importDefault(require("../controller/CloudUIID34Controller"));
var CloudZigbeeUIID1000Controller_1 = __importDefault(require("../controller/CloudZigbeeUIID1000Controller"));
var CloudZigbeeUIID1770Controller_1 = __importDefault(require("../controller/CloudZigbeeUIID1770Controller"));
var CloudZigbeeUIID2026Controller_1 = __importDefault(require("../controller/CloudZigbeeUIID2026Controller"));
var CloudZigbeeUIID3026Controller_1 = __importDefault(require("../controller/CloudZigbeeUIID3026Controller"));
var CloudZigbeeUIID4026Controller_1 = __importDefault(require("../controller/CloudZigbeeUIID4026Controller"));
var DiyDeviceController_1 = __importDefault(require("../controller/DiyDeviceController"));
var LanDualR3Controller_1 = __importDefault(require("../controller/LanDualR3Controller"));
var LanMultiChannelSwitchController_1 = __importDefault(require("../controller/LanMultiChannelSwitchController"));
var LanTandHModificationController_1 = __importDefault(require("../controller/LanTandHModificationController"));
var LanUIID34Controller_1 = __importDefault(require("../controller/LanUIID34Controller"));
exports.default = (function (device) {
    console.log('try to remove entity from Ha', device.entityId);
    if (device instanceof DiyDeviceController_1.default) {
        return;
    }
    else if (device instanceof CloudTandHModificationController_1.default || device instanceof LanTandHModificationController_1.default) {
        restApi_1.removeStates(device.entityId);
        restApi_1.removeStates("sensor." + device.deviceId + "_h");
        restApi_1.removeStates("sensor." + device.deviceId + "_t");
        return;
    }
    else if (device instanceof CloudMultiChannelSwitchController_1.default || device instanceof CloudDualR3Controller_1.default) {
        for (var i = 0; i < device.maxChannel; i++) {
            restApi_1.removeStates(device.entityId + "_" + (i + 1));
        }
        return;
    }
    else if (device instanceof LanMultiChannelSwitchController_1.default || device instanceof LanDualR3Controller_1.default) {
        if (device.maxChannel) {
            for (var i = 0; i < device.maxChannel; i++) {
                restApi_1.removeStates(device.entityId + "_" + (i + 1));
            }
        }
        return;
    }
    else if (device instanceof CloudZigbeeUIID1770Controller_1.default) {
        restApi_1.removeStates(device.entityId + "_temperature");
        restApi_1.removeStates(device.entityId + "_humidity");
        restApi_1.removeStates(device.entityId + "_battery");
        return;
    }
    else if (device instanceof CloudZigbeeUIID1000Controller_1.default) {
        restApi_1.removeStates(device.entityId);
        restApi_1.removeStates(device.entityId + "_battery");
        return;
    }
    else if (device instanceof CloudZigbeeUIID2026Controller_1.default || device instanceof CloudZigbeeUIID3026Controller_1.default || device instanceof CloudZigbeeUIID4026Controller_1.default) {
        restApi_1.removeStates(device.entityId);
        restApi_1.removeStates("sensor." + device.deviceId + "_battery");
        return;
    }
    else if (device instanceof CloudUIID34Controller_1.default || device instanceof LanUIID34Controller_1.default) {
        restApi_1.removeStates(device.entityId);
        restApi_1.removeStates("fan." + device.deviceId);
        return;
    }
    restApi_1.removeStates(device.entityId);
});
