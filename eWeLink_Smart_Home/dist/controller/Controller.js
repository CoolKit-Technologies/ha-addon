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
var CloudRGBBulbController_1 = __importDefault(require("./CloudRGBBulbController"));
var CloudPowerDetectionSwitchController_1 = __importDefault(require("./CloudPowerDetectionSwitchController"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("./CloudMultiChannelSwitchController"));
var CloudRGBLightStripController_1 = __importDefault(require("./CloudRGBLightStripController"));
var formatLanDevice_1 = __importDefault(require("../utils/formatLanDevice"));
var LanSwitchController_1 = __importDefault(require("./LanSwitchController"));
var LanMultiChannelSwitchController_1 = __importDefault(require("./LanMultiChannelSwitchController"));
var uiid_1 = require("../config/uiid");
var CloudDoubleColorBulbController_1 = __importDefault(require("./CloudDoubleColorBulbController"));
var UnsupportDeviceController_1 = __importDefault(require("./UnsupportDeviceController"));
var CloudDualR3Controller_1 = __importDefault(require("./CloudDualR3Controller"));
var LanDualR3Controller_1 = __importDefault(require("./LanDualR3Controller"));
var LanTandHModificationController_1 = __importDefault(require("./LanTandHModificationController"));
var LanPowerDetectionSwitchController_1 = __importDefault(require("./LanPowerDetectionSwitchController"));
var CloudDW2WiFiController_1 = __importDefault(require("./CloudDW2WiFiController"));
var CloudUIID104Controller_1 = __importDefault(require("./CloudUIID104Controller"));
var CloudZigbeeUIID1770Controller_1 = __importDefault(require("./CloudZigbeeUIID1770Controller"));
var CloudZigbeeUIID2026Controller_1 = __importDefault(require("./CloudZigbeeUIID2026Controller"));
var CloudZigbeeUIID3026Controller_1 = __importDefault(require("./CloudZigbeeUIID3026Controller"));
var CloudZigbeeUIID4026Controller_1 = __importDefault(require("./CloudZigbeeUIID4026Controller"));
var CloudZigbeeUIID1000Controller_1 = __importDefault(require("./CloudZigbeeUIID1000Controller"));
var mergeDeviceParams_1 = __importDefault(require("../utils/mergeDeviceParams"));
var CloudCoverController_1 = __importDefault(require("./CloudCoverController"));
var CloudRFBridgeController_1 = __importDefault(require("./CloudRFBridgeController"));
var LanRFBridgeController_1 = __importDefault(require("./LanRFBridgeController"));
var CloudUIID44Controller_1 = __importDefault(require("./CloudUIID44Controller"));
var CloudUIID34Controller_1 = __importDefault(require("./CloudUIID34Controller"));
var LanUIID34Controller_1 = __importDefault(require("./LanUIID34Controller"));
var ELanType_1 = __importDefault(require("../ts/enum/ELanType"));
var CloudNSPanelController_1 = __importDefault(require("./CloudNSPanelController"));
var logger_1 = require("../utils/logger");
var CloudUIID181Controller_1 = __importDefault(require("./CloudUIID181Controller"));
var CloudUIID190Controller_1 = __importDefault(require("./CloudUIID190Controller"));
var CloudZigbeeMultiSwitchController_1 = __importDefault(require("./CloudZigbeeMultiSwitchController"));
var CloudZigbeeDoubleColorBulbController_1 = __importDefault(require("./CloudZigbeeDoubleColorBulbController"));
var CloudZigbeeFiveColorBulbController_1 = __importDefault(require("./CloudZigbeeFiveColorBulbController"));
var CloudUIID137Controller_1 = __importDefault(require("./CloudUIID137Controller"));
var CloudUIID173Controller_1 = __importDefault(require("./CloudUIID173Controller"));
var CloudUIID130Controller_1 = __importDefault(require("./CloudUIID130Controller"));
var CloudUIID182Controller_1 = __importDefault(require("./CloudUIID182Controller"));
var Controller = (function () {
    function Controller() {
    }
    Controller.getDevice = function (id) {
        if (id) {
            var tmp = id.replace(/.*(?=\.)\./, '');
            return Controller.deviceMap.get(tmp);
        }
        return null;
    };
    Controller.getDeviceName = function (id) {
        var tmp = id.replace(/.*(?=\.)\./, '');
        return Controller.deviceMap.get(tmp).deviceName || '';
    };
    Controller.setDevice = function (params) {
        var id = params.id, type = params.type, data = params.data, lanType = params.lanType, index = params.index;
        var _index = index || this.count++;
        if (lodash_1.default.isEmpty(id)) {
            return null;
        }
        var disabled = (0, dataUtil_1.getDataSync)('disabled.json', [id]) || false;
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
        if (type === 2) {
            var params_1 = (0, formatLanDevice_1.default)(data);
            if (!params_1 || (!params_1.ip && !params_1.target)) {
                logger_1.logger.info("This device is not LAN support, deviceId: ".concat(params_1 === null || params_1 === void 0 ? void 0 : params_1.deviceId));
                return;
            }
            var old = Controller.getDevice(id);
            if (old instanceof LanDeviceController_1.default) {
                if (params_1.iv && params_1.encryptedData) {
                    old.iv = params_1 === null || params_1 === void 0 ? void 0 : params_1.iv;
                    old.encryptedData = params_1 === null || params_1 === void 0 ? void 0 : params_1.encryptedData;
                }
                if (old.iv && old.devicekey && old.encryptedData) {
                    var tmpParams = old.parseEncryptedData();
                    tmpParams && (old.params = (0, mergeDeviceParams_1.default)(old.params, tmpParams));
                }
                return old;
            }
            var oldDeviceParams = {};
            if (old instanceof CloudDeviceController_1.default) {
                oldDeviceParams = {
                    index: old.index,
                    devicekey: old.devicekey,
                    selfApikey: old.apikey,
                    deviceName: old.deviceName,
                    extra: old.extra,
                    params: old.params,
                    uiid: old.uiid,
                };
                if (uiid_1.unsupportedLanModeModelSet.has(old.extra.model)) {
                    return old;
                }
            }
            if (old instanceof CloudMultiChannelSwitchController_1.default) {
                oldDeviceParams.maxChannel = old.maxChannel;
            }
            if (uiid_1.unsupportedLanModeUiidSet.has(oldDeviceParams.uiid)) {
                return null;
            }
            if (lanType === ELanType_1.default.Plug) {
                var lanDevice = new LanSwitchController_1.default(__assign(__assign(__assign({}, params_1), oldDeviceParams), { disabled: disabled }));
                Controller.deviceMap.set(id, lanDevice);
                return lanDevice;
            }
            else if (lanType === ELanType_1.default.Strip) {
                var lanDevice = new LanMultiChannelSwitchController_1.default(__assign(__assign(__assign({}, params_1), oldDeviceParams), { disabled: disabled }));
                Controller.deviceMap.set(id, lanDevice);
                return lanDevice;
            }
            else if (lanType === ELanType_1.default.MultifunSwitch) {
                var lanDevice = new LanDualR3Controller_1.default(__assign(__assign(__assign({}, params_1), oldDeviceParams), { disabled: disabled }));
                Controller.deviceMap.set(id, lanDevice);
                return lanDevice;
            }
            else if (lanType === ELanType_1.default.THPlug) {
                var lanDevice = new LanTandHModificationController_1.default(__assign(__assign(__assign({}, params_1), oldDeviceParams), { disabled: disabled }));
                Controller.deviceMap.set(id, lanDevice);
                return lanDevice;
            }
            else if (lanType === ELanType_1.default.EnhancedPlug) {
                var lanDevice = new LanPowerDetectionSwitchController_1.default(__assign(__assign(__assign({}, params_1), oldDeviceParams), { disabled: disabled }));
                Controller.deviceMap.set(id, lanDevice);
                return lanDevice;
            }
            else if (lanType === ELanType_1.default.RF) {
                var lanDevice = new LanRFBridgeController_1.default(__assign(__assign(__assign({}, params_1), oldDeviceParams), { disabled: disabled }));
                Controller.deviceMap.set(id, lanDevice);
                return lanDevice;
            }
            else if (lanType === ELanType_1.default.FanLight) {
                var lanDevice = new LanUIID34Controller_1.default(__assign(__assign(__assign({}, params_1), oldDeviceParams), { disabled: disabled }));
                Controller.deviceMap.set(id, lanDevice);
                return lanDevice;
            }
        }
        if (type >= 4) {
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
                var device = new CloudMultiChannelSwitchController_1.default({
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
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (uiid_1.zigbeeMultiSwitchSet.has(data.extra.uiid)) {
                var tmp = data;
                var device = new CloudZigbeeMultiSwitchController_1.default({
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
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 11) {
                var tmp = data;
                var device = new CloudCoverController_1.default({
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
                Controller.deviceMap.set(id, device);
                return device;
            }
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
            if (data.extra.uiid === 22) {
                var tmp = data;
                var rgbLight = new CloudRGBBulbController_1.default({
                    deviceId: tmp.deviceid,
                    devicekey: tmp.devicekey,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    online: tmp.online,
                    disabled: disabled,
                    index: _index,
                });
                Controller.deviceMap.set(id, rgbLight);
                return rgbLight;
            }
            if (data.extra.uiid === 28) {
                var tmp = data;
                var rfBirdge = new CloudRFBridgeController_1.default({
                    deviceId: tmp.deviceid,
                    devicekey: tmp.devicekey,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    online: tmp.online,
                    disabled: disabled,
                    index: _index,
                    tags: tmp.tags,
                });
                Controller.deviceMap.set(id, rfBirdge);
                return rfBirdge;
            }
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
            if (data.extra.uiid === 34) {
                var tmp = data;
                var fanLight = new CloudUIID34Controller_1.default({
                    deviceId: tmp.deviceid,
                    devicekey: tmp.devicekey,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    online: tmp.online,
                    disabled: disabled,
                    index: _index,
                });
                Controller.deviceMap.set(id, fanLight);
                return fanLight;
            }
            if (data.extra.uiid === 44) {
                var tmp = data;
                var dimming = new CloudUIID44Controller_1.default({
                    deviceId: tmp.deviceid,
                    devicekey: tmp.devicekey,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    online: tmp.online,
                    disabled: disabled,
                    index: _index,
                });
                Controller.deviceMap.set(id, dimming);
                return dimming;
            }
            if (data.extra.uiid === 59) {
                var tmp = data;
                var device = new CloudRGBLightStripController_1.default({
                    deviceId: tmp.deviceid,
                    devicekey: tmp.devicekey,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    online: tmp.online,
                    disabled: disabled,
                    index: _index,
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 102) {
                var tmp = data;
                var device = new CloudDW2WiFiController_1.default({
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    devicekey: tmp.devicekey,
                    disabled: disabled,
                    online: tmp.online,
                    index: _index,
                    devConfig: tmp.devConfig,
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 103) {
                var tmp = data;
                var device = new CloudDoubleColorBulbController_1.default({
                    devicekey: tmp.devicekey,
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    params: tmp.params,
                    online: tmp.online,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    index: _index,
                    disabled: disabled,
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 104) {
                var tmp = data;
                var device = new CloudUIID104Controller_1.default({
                    devicekey: tmp.devicekey,
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    params: tmp.params,
                    online: tmp.online,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    index: _index,
                    disabled: disabled,
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 126) {
                var tmp = data;
                var device = new CloudDualR3Controller_1.default({
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
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 130) {
                var tmp = data;
                var device = new CloudUIID130Controller_1.default({
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    devicekey: tmp.devicekey,
                    disabled: disabled,
                    tags: tmp.tags,
                    online: tmp.online,
                    index: _index,
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 137) {
                var tmp = data;
                var device = new CloudUIID137Controller_1.default({
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
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 173) {
                var tmp = data;
                var device = new CloudUIID173Controller_1.default({
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
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 182) {
                var tmp = data;
                var device = new CloudUIID182Controller_1.default({
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    extra: tmp.extra,
                    params: tmp.params,
                    devicekey: tmp.devicekey,
                    disabled: disabled,
                    tags: tmp.tags,
                    online: tmp.online,
                    index: _index,
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 1000) {
                var tmp = data;
                var device = new CloudZigbeeUIID1000Controller_1.default({
                    devicekey: tmp.devicekey,
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    params: tmp.params,
                    online: tmp.online,
                    extra: tmp.extra,
                    index: _index,
                    disabled: disabled,
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 1770) {
                var tmp = data;
                var device = new CloudZigbeeUIID1770Controller_1.default({
                    devicekey: tmp.devicekey,
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    params: tmp.params,
                    online: tmp.online,
                    extra: tmp.extra,
                    index: _index,
                    disabled: disabled,
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 2026) {
                var tmp = data;
                var device = new CloudZigbeeUIID2026Controller_1.default({
                    devicekey: tmp.devicekey,
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    apikey: tmp.apikey,
                    params: tmp.params,
                    online: tmp.online,
                    extra: tmp.extra,
                    index: _index,
                    disabled: disabled,
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 3026) {
                var tmp = data;
                var device = new CloudZigbeeUIID3026Controller_1.default({
                    devicekey: tmp.devicekey,
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    params: tmp.params,
                    apikey: tmp.apikey,
                    online: tmp.online,
                    extra: tmp.extra,
                    index: _index,
                    disabled: disabled,
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 4026) {
                var tmp = data;
                var device = new CloudZigbeeUIID4026Controller_1.default({
                    devicekey: tmp.devicekey,
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    params: tmp.params,
                    apikey: tmp.apikey,
                    online: tmp.online,
                    extra: tmp.extra,
                    index: _index,
                    disabled: disabled,
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 133) {
                var tmp = data;
                var device = new CloudNSPanelController_1.default({
                    devicekey: tmp.devicekey,
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    params: tmp.params,
                    apikey: tmp.apikey,
                    online: tmp.online,
                    extra: tmp.extra,
                    index: _index,
                    tags: tmp.tags,
                    disabled: disabled
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 181) {
                var tmp = data;
                var device = new CloudUIID181Controller_1.default({
                    devicekey: tmp.devicekey,
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    params: tmp.params,
                    apikey: tmp.apikey,
                    online: tmp.online,
                    extra: tmp.extra,
                    index: _index,
                    tags: tmp.tags,
                    disabled: disabled
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 190) {
                var tmp = data;
                var device = new CloudUIID190Controller_1.default({
                    devicekey: tmp.devicekey,
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    params: tmp.params,
                    apikey: tmp.apikey,
                    online: tmp.online,
                    extra: tmp.extra,
                    index: _index,
                    tags: tmp.tags,
                    disabled: disabled
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 1258) {
                var tmp = data;
                var device = new CloudZigbeeDoubleColorBulbController_1.default({
                    devicekey: tmp.devicekey,
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    params: tmp.params,
                    apikey: tmp.apikey,
                    online: tmp.online,
                    extra: tmp.extra,
                    index: _index,
                    disabled: disabled,
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (data.extra.uiid === 3258) {
                var tmp = data;
                var device = new CloudZigbeeFiveColorBulbController_1.default({
                    devicekey: tmp.devicekey,
                    deviceId: tmp.deviceid,
                    deviceName: tmp.name,
                    params: tmp.params,
                    apikey: tmp.apikey,
                    online: tmp.online,
                    extra: tmp.extra,
                    index: _index,
                    disabled: disabled,
                });
                Controller.deviceMap.set(id, device);
                return device;
            }
            if (!Controller.deviceMap.has(id)) {
                var unsupportDevice = new UnsupportDeviceController_1.default({
                    deviceId: data.deviceid,
                    deviceName: data.name,
                    apikey: data.apikey,
                    extra: data.extra,
                    params: data.params,
                    online: data.online,
                    devicekey: data.devicekey,
                    disabled: disabled,
                    index: -_index,
                });
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
