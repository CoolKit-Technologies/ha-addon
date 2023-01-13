"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var restApi_1 = require("../apis/restApi");
var CloudDualR3Controller_1 = __importDefault(require("../controller/CloudDualR3Controller"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("../controller/CloudMultiChannelSwitchController"));
var CloudTandHModificationController_1 = __importDefault(require("../controller/CloudTandHModificationController"));
var CloudUIID190Controller_1 = __importDefault(require("../controller/CloudUIID190Controller"));
var CloudUIID34Controller_1 = __importDefault(require("../controller/CloudUIID34Controller"));
var CloudZigbeeDoubleColorBulbController_1 = __importDefault(require("../controller/CloudZigbeeDoubleColorBulbController"));
var CloudZigbeeFiveColorBulbController_1 = __importDefault(require("../controller/CloudZigbeeFiveColorBulbController"));
var CloudZigbeeMultiSwitchController_1 = __importDefault(require("../controller/CloudZigbeeMultiSwitchController"));
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
var logger_1 = require("./logger");
exports.default = (function (device) {
    logger_1.logger.info("try to remove entity from Ha: ".concat(device.entityId));
    if (device instanceof DiyDeviceController_1.default) {
        return;
    }
    else if (device instanceof CloudTandHModificationController_1.default || device instanceof LanTandHModificationController_1.default) {
        (0, restApi_1.removeStates)(device.entityId);
        (0, restApi_1.removeStates)("sensor.".concat(device.deviceId, "_h"));
        (0, restApi_1.removeStates)("sensor.".concat(device.deviceId, "_t"));
        return;
    }
    else if (device instanceof CloudMultiChannelSwitchController_1.default || device instanceof CloudDualR3Controller_1.default || device instanceof CloudZigbeeMultiSwitchController_1.default || device instanceof CloudUIID190Controller_1.default) {
        for (var i = 0; i < device.maxChannel; i++) {
            (0, restApi_1.removeStates)("".concat(device.entityId, "_").concat(i + 1));
        }
        return;
    }
    else if (device instanceof LanMultiChannelSwitchController_1.default || device instanceof LanDualR3Controller_1.default) {
        if (device.maxChannel) {
            for (var i = 0; i < device.maxChannel; i++) {
                (0, restApi_1.removeStates)("".concat(device.entityId, "_").concat(i + 1));
            }
        }
        return;
    }
    else if (device instanceof CloudZigbeeUIID1770Controller_1.default) {
        (0, restApi_1.removeStates)("".concat(device.entityId, "_temperature"));
        (0, restApi_1.removeStates)("".concat(device.entityId, "_humidity"));
        (0, restApi_1.removeStates)("".concat(device.entityId, "_battery"));
        return;
    }
    else if (device instanceof CloudZigbeeUIID1000Controller_1.default) {
        (0, restApi_1.removeStates)(device.entityId);
        (0, restApi_1.removeStates)("".concat(device.entityId, "_battery"));
        return;
    }
    else if (device instanceof CloudZigbeeUIID2026Controller_1.default || device instanceof CloudZigbeeUIID3026Controller_1.default || device instanceof CloudZigbeeUIID4026Controller_1.default) {
        (0, restApi_1.removeStates)(device.entityId);
        (0, restApi_1.removeStates)("sensor.".concat(device.deviceId, "_battery"));
        return;
    }
    else if (device instanceof CloudUIID34Controller_1.default || device instanceof LanUIID34Controller_1.default) {
        (0, restApi_1.removeStates)(device.entityId);
        (0, restApi_1.removeStates)("fan.".concat(device.deviceId));
        return;
    }
    else if (device instanceof CloudZigbeeDoubleColorBulbController_1.default || device instanceof CloudZigbeeFiveColorBulbController_1.default) {
        (0, restApi_1.removeStates)("light.".concat(device.deviceId));
        return;
    }
    (0, restApi_1.removeStates)(device.entityId);
});
