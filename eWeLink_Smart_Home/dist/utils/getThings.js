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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var coolkit_api_1 = __importDefault(require("coolkit-api"));
var Controller_1 = __importDefault(require("../controller/Controller"));
var DiyDeviceController_1 = __importDefault(require("../controller/DiyDeviceController"));
var LanDeviceController_1 = __importDefault(require("../controller/LanDeviceController"));
var CloudSwitchController_1 = __importDefault(require("../controller/CloudSwitchController"));
var CloudTandHModificationController_1 = __importDefault(require("../controller/CloudTandHModificationController"));
var CloudRGBBulbController_1 = __importDefault(require("../controller/CloudRGBBulbController"));
var CloudDimmingController_1 = __importDefault(require("../controller/CloudDimmingController"));
var CloudPowerDetectionSwitchController_1 = __importDefault(require("../controller/CloudPowerDetectionSwitchController"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("../controller/CloudMultiChannelSwitchController"));
var CloudRGBLightStripController_1 = __importDefault(require("../controller/CloudRGBLightStripController"));
var LanMultiChannelSwitchController_1 = __importDefault(require("../controller/LanMultiChannelSwitchController"));
var channelMap_1 = require("../config/channelMap");
var CloudDoubleColorBulbController_1 = __importDefault(require("../controller/CloudDoubleColorBulbController"));
var LanSwitchController_1 = __importDefault(require("../controller/LanSwitchController"));
var CloudDualR3Controller_1 = __importDefault(require("../controller/CloudDualR3Controller"));
var dataUtil_1 = require("./dataUtil");
var LanDualR3Controller_1 = __importDefault(require("../controller/LanDualR3Controller"));
var LanTandHModificationController_1 = __importDefault(require("../controller/LanTandHModificationController"));
var LanPowerDetectionSwitchController_1 = __importDefault(require("../controller/LanPowerDetectionSwitchController"));
var CloudDW2WiFiController_1 = __importDefault(require("../controller/CloudDW2WiFiController"));
var LanDoubleColorLightController_1 = __importDefault(require("../controller/LanDoubleColorLightController"));
var CloudUIID104Controller_1 = __importDefault(require("../controller/CloudUIID104Controller"));
var CloudZigbeeUIID2026Controller_1 = __importDefault(require("../controller/CloudZigbeeUIID2026Controller"));
var CloudZigbeeUIID4026Controller_1 = __importDefault(require("../controller/CloudZigbeeUIID4026Controller"));
var CloudZigbeeUIID3026Controller_1 = __importDefault(require("../controller/CloudZigbeeUIID3026Controller"));
var CloudZigbeeUIID1770Controller_1 = __importDefault(require("../controller/CloudZigbeeUIID1770Controller"));
var CloudZigbeeUIID1000Controller_1 = __importDefault(require("../controller/CloudZigbeeUIID1000Controller"));
var CloudCoverController_1 = __importDefault(require("../controller/CloudCoverController"));
var CloudRFBridgeController_1 = __importDefault(require("../controller/CloudRFBridgeController"));
var LanRFBridgeController_1 = __importDefault(require("../controller/LanRFBridgeController"));
var uiid_1 = require("../config/uiid");
var CloudUIID44Controller_1 = __importDefault(require("../controller/CloudUIID44Controller"));
var CloudUIID34Controller_1 = __importDefault(require("../controller/CloudUIID34Controller"));
var LanUIID34Controller_1 = __importDefault(require("../controller/LanUIID34Controller"));
var CloudNSPanelController_1 = __importDefault(require("../controller/CloudNSPanelController"));
var logger_1 = require("./logger");
var CloudUIID181Controller_1 = __importDefault(require("../controller/CloudUIID181Controller"));
var CloudUIID190Controller_1 = __importDefault(require("../controller/CloudUIID190Controller"));
var CloudZigbeeDoubleColorBulbController_1 = __importDefault(require("../controller/CloudZigbeeDoubleColorBulbController"));
var CloudZigbeeFiveColorBulbController_1 = __importDefault(require("../controller/CloudZigbeeFiveColorBulbController"));
var CloudZigbeeMultiSwitchController_1 = __importDefault(require("../controller/CloudZigbeeMultiSwitchController"));
var CloudUIID137Controller_1 = __importDefault(require("../controller/CloudUIID137Controller"));
var CloudUIID173Controller_1 = __importDefault(require("../controller/CloudUIID173Controller"));
var CloudUIID182Controller_1 = __importDefault(require("../controller/CloudUIID182Controller"));
var CloudUIID130Controller_1 = __importDefault(require("../controller/CloudUIID130Controller"));
exports.default = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var userData, lang, loginParams, _a, error, data, thingList, _loop_1, i;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                userData = (0, dataUtil_1.getDataSync)('user.json', []) || {};
                lang = userData.lang === 'cn' ? 'cn' : 'en';
                loginParams = userData.login;
                if (!loginParams) {
                    return [2, -1];
                }
                return [4, coolkit_api_1.default.device.getThingList({
                        lang: lang,
                        num: 0
                    })];
            case 1:
                _a = _d.sent(), error = _a.error, data = _a.data;
                if (error === 0) {
                    thingList = data.thingList;
                    logger_1.logger.verbose("getThing: thingList: ".concat(JSON.stringify(thingList)));
                    _loop_1 = function (i) {
                        var item = thingList[i];
                        var deviceIndex = item.index;
                        if (item.itemType === 1 || item.itemType === 2) {
                            var _e = item.itemData, extra = _e.extra, deviceid = _e.deviceid, name_1 = _e.name, params = _e.params, devicekey = _e.devicekey, apikey = _e.apikey, tags = _e.tags;
                            var old_1 = Controller_1.default.getDevice(deviceid);
                            if (old_1 instanceof DiyDeviceController_1.default) {
                                return "continue";
                            }
                            if (old_1 instanceof LanDeviceController_1.default && !uiid_1.unsupportedLanModeUiidSet.has(extra.uiid) && !uiid_1.unsupportedLanModeModelSet.has(extra.model)) {
                                old_1.devicekey = devicekey;
                                old_1.selfApikey = apikey;
                                old_1.deviceName = name_1;
                                old_1.extra = extra;
                                old_1.params = params;
                                old_1.index = deviceIndex;
                                if (old_1 instanceof LanSwitchController_1.default) {
                                    var decryptData = old_1.parseEncryptedData();
                                    if (decryptData) {
                                        old_1.updateState(decryptData.switch);
                                    }
                                    ((_c = (_b = item.itemData) === null || _b === void 0 ? void 0 : _b.tags) === null || _c === void 0 ? void 0 : _c.ck_channel_name) && (old_1.channelName = item.itemData.tags.ck_channel_name);
                                }
                                if (old_1 instanceof LanMultiChannelSwitchController_1.default) {
                                    old_1.channelName = tags === null || tags === void 0 ? void 0 : tags.ck_channel_name;
                                    old_1.maxChannel = (0, channelMap_1.getMaxChannelByUiid)(extra.uiid);
                                    var decryptData = old_1.parseEncryptedData();
                                    if (decryptData) {
                                        old_1.updateState(decryptData.switches);
                                    }
                                }
                                if (old_1 instanceof LanDualR3Controller_1.default) {
                                    old_1.channelName = tags === null || tags === void 0 ? void 0 : tags.ck_channel_name;
                                    var decryptData = old_1.parseEncryptedData();
                                    if (decryptData) {
                                        old_1.updateState(decryptData.switches);
                                    }
                                }
                                if (old_1 instanceof LanPowerDetectionSwitchController_1.default) {
                                    var decryptData = old_1.parseEncryptedData();
                                    if (decryptData) {
                                        old_1.updateState(decryptData.switch);
                                    }
                                }
                                if (old_1 instanceof LanDoubleColorLightController_1.default) {
                                    var decryptData = old_1.parseEncryptedData();
                                    if (decryptData) {
                                        old_1.updateState(decryptData);
                                    }
                                }
                                if (old_1 instanceof LanTandHModificationController_1.default) {
                                    var decryptData = old_1.parseEncryptedData();
                                    if (decryptData) {
                                        old_1.updateState(decryptData.switch);
                                    }
                                }
                                if (old_1 instanceof LanUIID34Controller_1.default) {
                                    var decryptData = old_1.parseEncryptedData();
                                    if (decryptData) {
                                        var switches = old_1.parseMdnsData2Ck(decryptData);
                                        old_1.updateState(switches);
                                    }
                                }
                                if (old_1 instanceof LanRFBridgeController_1.default) {
                                    old_1.tags = tags;
                                    if (Array.isArray(params.rfList)) {
                                        params.rfList.forEach(function (_a) {
                                            var rfChl = _a.rfChl, rfVal = _a.rfVal;
                                            old_1.rfValMap.set(rfChl, rfVal);
                                        });
                                    }
                                    if ((tags === null || tags === void 0 ? void 0 : tags.zyx_info) && old_1.rfValMap.size) {
                                        tags.zyx_info.forEach(function (_a) {
                                            var name = _a.name, buttonName = _a.buttonName, remote_type = _a.remote_type;
                                            buttonName.forEach(function (item) {
                                                var _a = __read(Object.entries(item)[0], 2), key = _a[0], childName = _a[1];
                                                var entityName = "".concat(name, "-").concat(childName);
                                                var suffix = old_1.rfValMap.get(+key);
                                                var entityId = "".concat(old_1.entityId, "_").concat(suffix);
                                                if (suffix) {
                                                    old_1.entityMap.set(+key, {
                                                        entityId: entityId,
                                                        name: entityName,
                                                        icon: +remote_type < 6 ? 'mdi:remote' : 'mdi:alert',
                                                    });
                                                }
                                            });
                                        });
                                    }
                                    old_1.updateState();
                                }
                                return "continue";
                            }
                            var device = Controller_1.default.setDevice({
                                id: deviceid,
                                type: 12,
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
                            if (device instanceof CloudRGBBulbController_1.default) {
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
                                var status_1 = params.switch, power = params.power, voltage = params.voltage, current = params.current;
                                !device.disabled &&
                                    device.updateState({
                                        status: status_1,
                                        power: power,
                                        voltage: voltage,
                                        current: current,
                                    });
                            }
                            if (device instanceof CloudMultiChannelSwitchController_1.default || device instanceof CloudZigbeeMultiSwitchController_1.default) {
                                !device.disabled && device.updateState(params.switches);
                            }
                            if (device instanceof CloudRGBLightStripController_1.default) {
                                !device.disabled && device.updateState(device.parseCkData2Ha(params));
                            }
                            if (device instanceof CloudDoubleColorBulbController_1.default) {
                                !device.disabled && device.updateState(params);
                            }
                            if (device instanceof CloudUIID104Controller_1.default) {
                                !device.disabled && device.updateState(params);
                            }
                            if (device instanceof CloudDualR3Controller_1.default) {
                                !device.disabled && device.updateState(params.switches);
                            }
                            if (device instanceof CloudDW2WiFiController_1.default) {
                                !device.disabled && device.updateState(params);
                            }
                            if (device instanceof CloudZigbeeUIID1000Controller_1.default) {
                                !device.disabled && device.updateState(params);
                            }
                            if (device instanceof CloudZigbeeUIID1770Controller_1.default) {
                                !device.disabled && device.updateState(params);
                            }
                            if (device instanceof CloudZigbeeUIID2026Controller_1.default) {
                                !device.disabled && device.updateState(params);
                            }
                            if (device instanceof CloudZigbeeUIID3026Controller_1.default) {
                                !device.disabled && device.updateState(params);
                            }
                            if (device instanceof CloudZigbeeUIID4026Controller_1.default) {
                                !device.disabled && device.updateState(params);
                            }
                            if (device instanceof CloudCoverController_1.default) {
                                !device.disabled && device.updateState(params);
                            }
                            if (device instanceof CloudRFBridgeController_1.default) {
                                !device.disabled && device.updateState();
                            }
                            if (device instanceof CloudUIID44Controller_1.default) {
                                !device.disabled && device.updateState(params);
                            }
                            if (device instanceof CloudUIID34Controller_1.default) {
                                !device.disabled && device.updateState(params.switches);
                            }
                            if (device instanceof CloudNSPanelController_1.default) {
                            }
                            if (device instanceof CloudUIID181Controller_1.default) {
                                !device.disabled && device.updateState(params.switch);
                            }
                            if (device instanceof CloudUIID190Controller_1.default) {
                                !device.disabled && device.updateState(params.switches);
                            }
                            if (device instanceof CloudZigbeeDoubleColorBulbController_1.default || device instanceof CloudZigbeeFiveColorBulbController_1.default) {
                                !device.disabled && device.updateState(params);
                            }
                            if (device instanceof CloudUIID137Controller_1.default || device instanceof CloudUIID173Controller_1.default) {
                                !device.disabled && device.updateState(params);
                            }
                            if (device instanceof CloudUIID182Controller_1.default || device instanceof CloudUIID130Controller_1.default) {
                                !device.disabled && device.updateState(params.switches);
                            }
                        }
                    };
                    for (i = 0; i < thingList.length; i++) {
                        _loop_1(i);
                    }
                    return [2, 0];
                }
                return [2, -1];
        }
    });
}); });
