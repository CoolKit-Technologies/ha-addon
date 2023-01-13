"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MdnsClass_1 = __importDefault(require("../class/MdnsClass"));
var formatDiyDevice_1 = __importDefault(require("./formatDiyDevice"));
var DiyDeviceController_1 = __importDefault(require("../controller/DiyDeviceController"));
var LanSwitchController_1 = __importDefault(require("../controller/LanSwitchController"));
var LanMultiChannelSwitchController_1 = __importDefault(require("../controller/LanMultiChannelSwitchController"));
var dataUtil_1 = require("./dataUtil");
var eventBus_1 = __importDefault(require("./eventBus"));
var mergeDeviceParams_1 = __importDefault(require("./mergeDeviceParams"));
var LanDualR3Controller_1 = __importDefault(require("../controller/LanDualR3Controller"));
var LanPowerDetectionSwitchController_1 = __importDefault(require("../controller/LanPowerDetectionSwitchController"));
var LanTandHModificationController_1 = __importDefault(require("../controller/LanTandHModificationController"));
var LanDoubleColorLightController_1 = __importDefault(require("../controller/LanDoubleColorLightController"));
var LanRFBridgeController_1 = __importDefault(require("../controller/LanRFBridgeController"));
var LanUIID34Controller_1 = __importDefault(require("../controller/LanUIID34Controller"));
var logger_1 = require("./logger");
exports.default = (function () {
    return MdnsClass_1.default.createInstance({
        queryParams: {
            questions: [
                {
                    name: '_ewelink._tcp.local',
                    type: 'PTR',
                },
            ],
        },
        queryCb: function () {
            logger_1.logger.info('Finding local eWeLink devices...');
        },
        onResponseCb: function (device) {
            var _a;
            if (device instanceof DiyDeviceController_1.default) {
                logger_1.logger.info('found diy device');
                var diyDevice = (0, formatDiyDevice_1.default)(device);
                device.updateState((_a = diyDevice.data) === null || _a === void 0 ? void 0 : _a.switch);
                (0, dataUtil_1.appendData)('diy.json', [diyDevice.id, 'online'], true);
            }
            else if (device instanceof LanSwitchController_1.default || device instanceof LanPowerDetectionSwitchController_1.default) {
                var decryptData = device.parseEncryptedData();
                if (decryptData) {
                    device.updateState(decryptData.switch);
                    device.params = (0, mergeDeviceParams_1.default)(device.params, decryptData);
                }
            }
            else if (device instanceof LanMultiChannelSwitchController_1.default || device instanceof LanDualR3Controller_1.default) {
                var decryptData = device.parseEncryptedData();
                if (decryptData) {
                    device.updateState(decryptData.switches);
                    device.params = (0, mergeDeviceParams_1.default)(device.params, decryptData);
                }
            }
            else if (device instanceof LanTandHModificationController_1.default) {
                var decryptData = device.parseEncryptedData();
                if (decryptData) {
                    device.updateState(decryptData.switch);
                    device.updateTandH(decryptData.currentTemperature, decryptData.currentHumidity);
                    device.params = (0, mergeDeviceParams_1.default)(device.params, decryptData);
                }
            }
            else if (device instanceof LanDoubleColorLightController_1.default) {
                var decryptData = device.parseEncryptedData();
                if (decryptData) {
                    device.updateState(decryptData);
                    device.params = (0, mergeDeviceParams_1.default)(device.params, decryptData);
                }
            }
            else if (device instanceof LanRFBridgeController_1.default) {
                var decryptData = device.parseEncryptedData();
                if (decryptData) {
                    device.updateState(device.parseMdnsData2Ha(decryptData));
                }
            }
            else if (device instanceof LanUIID34Controller_1.default) {
                var decryptData = device.parseEncryptedData();
                if (decryptData) {
                    var switches = device.parseMdnsData2Ck(decryptData);
                    device.updateState(switches);
                    device.params = (0, mergeDeviceParams_1.default)(device.params, switches);
                }
            }
            eventBus_1.default.emit('sse');
        },
    });
});
