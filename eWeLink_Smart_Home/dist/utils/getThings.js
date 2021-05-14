"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var coolkit_open_api_1 = __importDefault(require("coolkit-open-api"));
var Controller_1 = __importDefault(require("../controller/Controller"));
var DiyDeviceController_1 = __importDefault(require("../controller/DiyDeviceController"));
var LanDeviceController_1 = __importDefault(require("../controller/LanDeviceController"));
var CloudSwitchController_1 = __importDefault(require("../controller/CloudSwitchController"));
var CloudTandHModificationController_1 = __importDefault(require("../controller/CloudTandHModificationController"));
var CloudRGBLightController_1 = __importDefault(require("../controller/CloudRGBLightController"));
var CloudDimmingController_1 = __importDefault(require("../controller/CloudDimmingController"));
var CloudPowerDetectionSwitchController_1 = __importDefault(require("../controller/CloudPowerDetectionSwitchController"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("../controller/CloudMultiChannelSwitchController"));
var CloudRGBLightStripController_1 = __importDefault(require("../controller/CloudRGBLightStripController"));
var LanMultiChannelSwitchController_1 = __importDefault(require("../controller/LanMultiChannelSwitchController"));
var channelMap_1 = require("../config/channelMap");
var CloudDoubleColorLightController_1 = __importDefault(require("../controller/CloudDoubleColorLightController"));
var LanSwitchController_1 = __importDefault(require("../controller/LanSwitchController"));
var CloudDualR3Controller_1 = __importDefault(require("../controller/CloudDualR3Controller"));
var dataUtil_1 = require("./dataUtil");
var LanDualR3Controller_1 = __importDefault(require("../controller/LanDualR3Controller"));
var LanTandHModificationController_1 = __importDefault(require("../controller/LanTandHModificationController"));
// 获取设备并同步到HA
exports.default = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var lang, _a, error, data, thingList, i, item, deviceIndex, _b, extra, deviceid, name_1, params, devicekey, apikey, tags, old, decryptData, decryptData, decryptData, device, status_1, power, voltage, current, data_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                lang = dataUtil_1.getDataSync('user.json', ['region']) === 'cn' ? 'cn' : 'en';
                return [4 /*yield*/, coolkit_open_api_1.default.device.getThingList({
                        lang: lang,
                    })];
            case 1:
                _a = _c.sent(), error = _a.error, data = _a.data;
                if (error === 0) {
                    thingList = data.thingList;
                    console.log('Jia ~ file: getThings.ts ~ line 25 ~ thingList', JSON.stringify(thingList, null, 2));
                    for (i = 0; i < thingList.length; i++) {
                        item = thingList[i];
                        deviceIndex = item.index;
                        if (item.itemType < 3) {
                            _b = item.itemData, extra = _b.extra, deviceid = _b.deviceid, name_1 = _b.name, params = _b.params, devicekey = _b.devicekey, apikey = _b.apikey, tags = _b.tags;
                            old = Controller_1.default.getDevice(deviceid);
                            if (old instanceof DiyDeviceController_1.default) {
                                // 如果设备已经存在并且是DIY设备就不做任何操作
                                continue;
                            }
                            // 如果设备已经存在并且是Lan设备就添加该设备的deviceKey
                            if (old instanceof LanDeviceController_1.default) {
                                old.devicekey = devicekey;
                                old.selfApikey = apikey;
                                old.deviceName = name_1;
                                old.extra = extra;
                                old.params = params;
                                old.index = deviceIndex;
                                if (old instanceof LanSwitchController_1.default) {
                                    decryptData = old.parseEncryptedData();
                                    if (decryptData) {
                                        old.updateState(decryptData.switch);
                                    }
                                }
                                if (old instanceof LanMultiChannelSwitchController_1.default) {
                                    old.channelName = tags === null || tags === void 0 ? void 0 : tags.ck_channel_name;
                                    old.maxChannel = channelMap_1.getMaxChannelByUiid(extra.uiid);
                                    decryptData = old.parseEncryptedData();
                                    if (decryptData) {
                                        old.updateState(decryptData.switches);
                                    }
                                }
                                if (old instanceof LanDualR3Controller_1.default) {
                                    old.channelName = tags === null || tags === void 0 ? void 0 : tags.ck_channel_name;
                                    decryptData = old.parseEncryptedData();
                                    if (decryptData) {
                                        old.updateState(decryptData.switches);
                                    }
                                }
                                continue;
                            }
                            device = Controller_1.default.setDevice({
                                id: deviceid,
                                type: 4,
                                data: item.itemData,
                                index: deviceIndex,
                            });
                            if (device instanceof CloudSwitchController_1.default) {
                                !device.disabled && device.updateState(params.switch);
                            }
                            if (device instanceof CloudTandHModificationController_1.default || device instanceof LanTandHModificationController_1.default) {
                                !device.disabled && device.updateState(params.switch);
                                !device.disabled && device.updateTandH(params.currentTemperature, params.currentHumidity);
                            }
                            if (device instanceof CloudRGBLightController_1.default) {
                                !device.disabled && device.updateState(device.parseCkData2Ha(params));
                            }
                            if (device instanceof CloudDimmingController_1.default) {
                                !device.disabled &&
                                    device.updateState({
                                        status: params.switch,
                                        bright: params.bright,
                                    });
                            }
                            if (device instanceof CloudPowerDetectionSwitchController_1.default) {
                                status_1 = params.switch, power = params.power, voltage = params.voltage, current = params.current;
                                !device.disabled &&
                                    device.updateState({
                                        status: status_1,
                                        power: power,
                                        voltage: voltage,
                                        current: current,
                                    });
                            }
                            if (device instanceof CloudMultiChannelSwitchController_1.default) {
                                !device.disabled && device.updateState(params.switches.slice(0, device.maxChannel));
                            }
                            if (device instanceof CloudRGBLightStripController_1.default) {
                                data_1 = device.parseCkData2Ha(params);
                                !device.disabled && device.updateState(data_1);
                            }
                            if (device instanceof CloudDoubleColorLightController_1.default) {
                                !device.disabled && device.updateState(params);
                            }
                            if (device instanceof CloudDualR3Controller_1.default) {
                                console.log('Jia ~ file: getThings.ts ~ CloudDualR3Controller ~ params', params);
                                !device.disabled && device.updateState(params.switches);
                            }
                        }
                    }
                    return [2 /*return*/, 0];
                }
                return [2 /*return*/, -1];
        }
    });
}); });
