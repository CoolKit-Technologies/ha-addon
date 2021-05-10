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
            console.log('finding local eWelink devices');
        },
        onResponseCb: function (device) {
            var _a;
            if (device instanceof DiyDeviceController_1.default) {
                console.log('found diy device');
                var diyDevice = formatDiyDevice_1.default(device);
                device.updateState((_a = diyDevice.data) === null || _a === void 0 ? void 0 : _a.switch);
                // 表示该diy设备在线
                dataUtil_1.appendData('diy.json', [diyDevice.id], true);
            }
            if (device instanceof LanSwitchController_1.default) {
                var decryptData = device.parseEncryptedData();
                if (decryptData) {
                    device.updateState(decryptData.switch);
                    device.params = decryptData;
                }
            }
            if (device instanceof LanMultiChannelSwitchController_1.default) {
                var decryptData = device.parseEncryptedData();
                if (decryptData) {
                    device.updateState(decryptData.switches);
                    device.params = mergeDeviceParams_1.default(device.params, decryptData);
                }
            }
            // 触发sse
            eventBus_1.default.emit('sse');
        },
    });
});
