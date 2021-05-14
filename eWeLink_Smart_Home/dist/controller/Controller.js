"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var CloudDeviceController_1 = __importDefault(require("./CloudDeviceController"));
var CloudSwitchController_1 = __importDefault(require("./CloudSwitchController"));
var CloudTandHModificationController_1 = __importDefault(require("./CloudTandHModificationController"));
var DiyDeviceController_1 = __importDefault(require("./DiyDeviceController"));
var dataUtil_1 = require("../utils/dataUtil");
var LanDeviceController_1 = __importDefault(require("./LanDeviceController"));
var CloudPowerDetectionSwitchController_1 = __importDefault(require("./CloudPowerDetectionSwitchController"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("./CloudMultiChannelSwitchController"));
var formatLanDevice_1 = __importDefault(require("../utils/formatLanDevice"));
var LanSwitchController_1 = __importDefault(require("./LanSwitchController"));
var LanMultiChannelSwitchController_1 = __importDefault(require("./LanMultiChannelSwitchController"));
var uiid_1 = require("../config/uiid");
var UnsupportDeviceController_1 = __importDefault(require("./UnsupportDeviceController"));
var CloudDualR3Controller_1 = __importDefault(require("./CloudDualR3Controller"));
var LanDualR3Controller_1 = __importDefault(require("./LanDualR3Controller"));
var LanTandHModificationController_1 = __importDefault(require("./LanTandHModificationController"));
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.getDevice = function (id) {
        if (id) {
            // 删除switch.等前缀
            var tmp = id.replace(/.*(?=\.)\./, '');
            return Controller.deviceMap.get(tmp);
        }
        return null;
    };
    Controller.getDeviceName = function (id) {
        // 删除switch.等前缀
        var tmp = id.replace(/.*(?=\.)\./, '');
        return Controller.deviceMap.get(tmp).deviceName || '';
    };
    /**
     *
     *
     * @static
     * @param {id} 设备ID
     * @param {type} 1->DIY 2->LAN 4->CLOUD
     * @param {data} 设备数据
     * @memberof Controller
     */
    Controller.setDevice = function (params) {
        var id = params.id, type = params.type, data = params.data, lanType = params.lanType, index = params.index;
        var _index = index || this.count++;
        if (lodash_1.default.isEmpty(id)) {
            return null;
        }
        var disabled = dataUtil_1.getDataSync('disabled.json', [id]) || false;
        // DIY
        if (type === 1) {
            var tmp = data;
            if (!tmp.a) {
                return;
            }
            var diyDevice = new DiyDeviceController_1.default({
                ip: tmp.a,
                port: tmp.srv.port,
                deviceId: id,
                disabled: disabled,
                txt: tmp.txt,
            });
            Controller.deviceMap.set(id, diyDevice);
            return diyDevice;
        }
        // LAN
        if (type === 2) {
            var params_1 = formatLanDevice_1.default(data);
            // 如果ip不存在说明该设备可能不支持局域网
            if (!params_1 || (!params_1.ip && !params_1.target)) {
                console.log('该设备不支持局域网', params_1 === null || params_1 === void 0 ? void 0 : params_1.deviceId);
                return;
            }
            var old = Controller.getDevice(id);
            if (old instanceof LanDeviceController_1.default) {
                old.iv = params_1 === null || params_1 === void 0 ? void 0 : params_1.iv;
                old.encryptedData = params_1 === null || params_1 === void 0 ? void 0 : params_1.encryptedData;
                return old;
            }
            // 如果设备之前是Cloud设备,需要保持设备的位置不变
            var tmpIndex = void 0;
            var oldDeviceParams = {};
            if (old instanceof CloudDeviceController_1.default) {
                oldDeviceParams = {
                    index: old.index,
                    devicekey: old.devicekey,
                    selfApikey: old.apikey,
                    deviceName: old.deviceName,
                    extra: old.extra,
                    params: old.params,
                };
            }
            if (lanType === 'plug') {
                var lanDevice = new LanSwitchController_1.default(__assign(__assign({}, params_1), { disabled: disabled, index: tmpIndex }));
                Controller.deviceMap.set(id, lanDevice);
                return lanDevice;
            }
            if (lanType === 'strip') {
                var lanDevice = new LanMultiChannelSwitchController_1.default(__assign(__assign({}, params_1), { disabled: disabled, index: tmpIndex }));
                Controller.deviceMap.set(id, lanDevice);
                return lanDevice;
            }
            if (lanType === 'multifun_switch') {
                var lanDevice = new LanDualR3Controller_1.default(__assign(__assign({}, params_1), { disabled: disabled, index: tmpIndex }));
                Controller.deviceMap.set(id, lanDevice);
                return lanDevice;
            }
            if (lanType === 'th_plug') {
                var lanDevice = new LanTandHModificationController_1.default(__assign(__assign({}, params_1), { disabled: disabled, index: tmpIndex }));
                Controller.deviceMap.set(id, lanDevice);
                return lanDevice;
            }
        }
        // CLOUD
        if (type === 4) {
            if (uiid_1.switchUiidSet.has(data.extra.uiid)) {
                var tmp = data;
                var switchDevice = new CloudSwitchController_1.default({
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    online: tmp.online,
                    devicekey: tmp.devicekey,
                    disabled: disabled,
                    index: _index,
                });
                Controller.deviceMap.set(id, switchDevice);
                return switchDevice;
            }
            if (uiid_1.multiChannelSwitchUiidSet.has(data.extra.uiid)) {
                var tmp = data;
                var device_1 = new CloudMultiChannelSwitchController_1.default({
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    tags: tmp.tags,
                    online: tmp.online,
                    devicekey: tmp.devicekey,
                    disabled: disabled,
                    index: _index,
                });
                Controller.deviceMap.set(id, device_1);
                return device_1;
            }
            // 恒温恒湿改装件
            if (data.extra.uiid === 15) {
                var tmp = data;
                var thmDevice = new CloudTandHModificationController_1.default({
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    online: tmp.online,
                    devicekey: tmp.devicekey,
                    disabled: disabled,
                    index: _index,
                });
                Controller.deviceMap.set(id, thmDevice);
                return thmDevice;
            }
            // RGB灯球
            // if (data.extra.uiid === 22) {
            //     const tmp = data as ICloudDevice<ICloudRGBLightParams>;
            //     const rgbLight = new CloudRGBLightController({
            //         deviceId: tmp.deviceid,
            //         deviceName: tmp.name,
            //         apikey: tmp.apikey,
            //         extra: tmp.extra,
            //         params: tmp.params,
            //         online: tmp.online,
            //         disabled,
            //         index: _index,
            //     });
            //     Controller.deviceMap.set(id, rgbLight);
            //     return rgbLight;
            // }
            // 功率检测告警开关
            if (data.extra.uiid === 32 || data.extra.uiid === 5) {
                var tmp = data;
                var switchDevice = new CloudPowerDetectionSwitchController_1.default({
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    online: tmp.online,
                    devicekey: tmp.devicekey,
                    disabled: disabled,
                    index: _index,
                });
                Controller.deviceMap.set(id, switchDevice);
                return switchDevice;
            }
            // 调光开关
            // if (data.extra.uiid === 36) {
            //     const tmp = data as ICloudDevice<ICloudDimmingParams>;
            //     const dimming = new CloudDimmingController({
            //         deviceId: tmp.deviceid,
            //         deviceName: tmp.name,
            //         apikey: tmp.apikey,
            //         extra: tmp.extra,
            //         params: tmp.params,
            //         online: tmp.online,
            //         disabled,
            //         index: _index,
            //     });
            //     Controller.deviceMap.set(id, dimming);
            //     return dimming;
            // }
            // RGB灯带
            // if (data.extra.uiid === 59) {
            //     const tmp = data as ICloudDevice<ICloudRGBLightStripParams>;
            //     const device = new CloudRGBLightStripController({
            //         deviceId: tmp.deviceid,
            //         deviceName: tmp.name,
            //         apikey: tmp.apikey,
            //         extra: tmp.extra,
            //         params: tmp.params,
            //         online: tmp.online,
            //         disabled,
            //         index: _index,
            //     });
            //     Controller.deviceMap.set(id, device);
            //     return device;
            // }
            // 双色冷暖灯
            // if (data.extra.uiid === 103) {
            //     const tmp = data as ICloudDevice<IDoubleCloudLightParams>;
            //     const device = new CloudDoubleColorLightController({
            //         deviceId: tmp.deviceid,
            //         deviceName: tmp.name,
            //         apikey: tmp.apikey,
            //         extra: tmp.extra,
            //         params: tmp.params,
            //         disabled,
            //         online: tmp.online,
            //         index: _index,
            //     });
            //     Controller.deviceMap.set(id, device);
            //     return device;
            // }
            // DualR3
            if (data.extra.uiid === 126) {
                var tmp = data;
                var device_2 = new CloudDualR3Controller_1.default({
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    devicekey: tmp.devicekey,
                    disabled: disabled,
                    online: tmp.online,
                    index: _index,
                });
                Controller.deviceMap.set(id, device_2);
                return device_2;
            }
            // 暂不支持的设备
            if (!Controller.deviceMap.has(id)) {
                var unsupportDevice = new UnsupportDeviceController_1.default(data);
                Controller.unsupportDeviceMap.set(id, unsupportDevice);
            }
        }
    };
    Controller.deviceMap = new Map();
    Controller.unsupportDeviceMap = new Map();
    Controller.count = 999;
    return Controller;
}());
exports.default = Controller;
