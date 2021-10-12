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
var coolkit_ws_1 = __importDefault(require("coolkit-ws"));
var dataUtil_1 = require("./dataUtil");
var Controller_1 = __importDefault(require("../controller/Controller"));
var app_1 = require("../config/app");
var CloudSwitchController_1 = __importDefault(require("../controller/CloudSwitchController"));
var CloudTandHModificationController_1 = __importDefault(require("../controller/CloudTandHModificationController"));
var CloudRGBBulbController_1 = __importDefault(require("../controller/CloudRGBBulbController"));
var CloudDimmingController_1 = __importDefault(require("../controller/CloudDimmingController"));
var CloudPowerDetectionSwitchController_1 = __importDefault(require("../controller/CloudPowerDetectionSwitchController"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("../controller/CloudMultiChannelSwitchController"));
var CloudRGBLightStripController_1 = __importDefault(require("../controller/CloudRGBLightStripController"));
var restApi_1 = require("../apis/restApi");
var CloudDoubleColorBulbController_1 = __importDefault(require("../controller/CloudDoubleColorBulbController"));
var eventBus_1 = __importDefault(require("./eventBus"));
var CloudDualR3Controller_1 = __importDefault(require("../controller/CloudDualR3Controller"));
var LanDualR3Controller_1 = __importDefault(require("../controller/LanDualR3Controller"));
var CloudDW2WiFiController_1 = __importDefault(require("../controller/CloudDW2WiFiController"));
var CloudUIID104Controller_1 = __importDefault(require("../controller/CloudUIID104Controller"));
var CloudZigbeeUIID1770Controller_1 = __importDefault(require("../controller/CloudZigbeeUIID1770Controller"));
var CloudZigbeeUIID2026Controller_1 = __importDefault(require("../controller/CloudZigbeeUIID2026Controller"));
var CloudZigbeeUIID3026Controller_1 = __importDefault(require("../controller/CloudZigbeeUIID3026Controller"));
var CloudZigbeeUIID4026Controller_1 = __importDefault(require("../controller/CloudZigbeeUIID4026Controller"));
var CloudZigbeeUIID1000Controller_1 = __importDefault(require("../controller/CloudZigbeeUIID1000Controller"));
var CloudCoverController_1 = __importDefault(require("../controller/CloudCoverController"));
var LanTandHModificationController_1 = __importDefault(require("../controller/LanTandHModificationController"));
var CloudRFBridgeController_1 = __importDefault(require("../controller/CloudRFBridgeController"));
var CloudUIID44Controller_1 = __importDefault(require("../controller/CloudUIID44Controller"));
var CloudUIID34Controller_1 = __importDefault(require("../controller/CloudUIID34Controller"));
var apikey = dataUtil_1.getDataSync('user.json', ['user', 'apikey']);
exports.default = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var at, region;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                at = dataUtil_1.getDataSync('user.json', ['at']);
                region = dataUtil_1.getDataSync('user.json', ['region']);
                if (!at || !apikey) {
                    return [2 /*return*/, -1];
                }
                return [4 /*yield*/, coolkit_ws_1.default.init({
                        appid: app_1.appId,
                        at: at,
                        apikey: apikey,
                        region: region,
                        userAgent: 'app',
                        reqTimeout: 30000,
                    })];
            case 1:
                _a.sent();
                console.log('Jia ~ file: initCkWs.ts ~ line 29 ~ at', at);
                coolkit_ws_1.default.on('message', function (ws) { return __awaiter(void 0, void 0, void 0, function () {
                    var type, data, tmp, device, _a, currentTemperature, currentHumidity, state, _b, bright, status_1, _c, current, voltage, power, status_2, switches, ids, online, res, error_1;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _d.trys.push([0, 4, , 5]);
                                type = ws.type, data = ws.data;
                                console.log('receive CK-WS msg:   type-->', type);
                                console.log('receive CK-WS msg:\n', data);
                                if (!(type === 'message' && data !== 'pong')) return [3 /*break*/, 3];
                                tmp = JSON.parse(data);
                                if (!tmp.deviceid) {
                                    return [2 /*return*/];
                                }
                                device = Controller_1.default.getDevice(tmp.deviceid);
                                if (tmp.action === 'update') {
                                    if (device instanceof CloudSwitchController_1.default) {
                                        device.updateState(tmp.params.switch);
                                    }
                                    else if (device instanceof CloudTandHModificationController_1.default || device instanceof LanTandHModificationController_1.default) {
                                        _a = tmp.params, currentTemperature = _a.currentTemperature, currentHumidity = _a.currentHumidity, state = _a.switch;
                                        if (currentHumidity || currentTemperature) {
                                            device.updateTandH(currentTemperature, currentHumidity);
                                        }
                                        else if (state) {
                                            device.updateState(state);
                                        }
                                    }
                                    else if (device instanceof CloudRGBBulbController_1.default) {
                                        device.updateState(device.parseCkData2Ha(tmp.params));
                                    }
                                    else if (device instanceof CloudDimmingController_1.default) {
                                        _b = tmp.params, bright = _b.bright, status_1 = _b.switch;
                                        device.updateState({
                                            status: status_1,
                                            bright: bright,
                                        });
                                    }
                                    else if (device instanceof CloudPowerDetectionSwitchController_1.default) {
                                        _c = tmp.params, current = _c.current, voltage = _c.voltage, power = _c.power, status_2 = _c.switch;
                                        // console.log('接收到功率检查插座的消息->params:', tmp.params);
                                        console.log('get power detection switch message, params:', tmp.params);
                                        device.updateState({
                                            status: status_2,
                                            current: current,
                                            voltage: voltage,
                                            power: power,
                                        });
                                    }
                                    else if (device instanceof CloudMultiChannelSwitchController_1.default) {
                                        switches = tmp.params.switches;
                                        if (Array.isArray(switches)) {
                                            device.updateState(switches);
                                        }
                                    }
                                    else if (device instanceof CloudRGBLightStripController_1.default) {
                                        // console.log('接收到灯带的消息：', tmp.params);
                                        console.log('get lamp strip message, params:', tmp.params);
                                        device.updateState(device.parseCkData2Ha(tmp.params));
                                    }
                                    else if (device instanceof CloudDoubleColorBulbController_1.default) {
                                        // console.log('接收到双色灯的信息：', tmp.params);
                                        console.log('get double color bulb message, params:', tmp.params);
                                        device.updateState(tmp.params);
                                    }
                                    else if (device instanceof CloudUIID104Controller_1.default) {
                                        // console.log('接收到随调五色灯的信息：', tmp.params);
                                        console.log('get uiid 104 message, params:', tmp.params);
                                        device.updateState(tmp.params);
                                    }
                                    else if (device instanceof CloudDualR3Controller_1.default || device instanceof LanDualR3Controller_1.default) {
                                        // console.log('接收到DualR3的信息：', tmp.params);
                                        console.log('get DualR3 message, params:', tmp.params);
                                        if (tmp.params && tmp.params.switches) {
                                            device.updateState(tmp.params.switches);
                                        }
                                    }
                                    else if (device instanceof CloudDW2WiFiController_1.default) {
                                        // console.log('接收到DW2的信息：', tmp.params);
                                        console.log('get DW2 message, params:', tmp.params);
                                        if (tmp.params) {
                                            device.updateState(tmp.params);
                                        }
                                    }
                                    else if (device instanceof CloudZigbeeUIID1000Controller_1.default) {
                                        // console.log('接收到Zigbee无线按键的信息：', tmp.params);
                                        console.log('get Zigbee uiid 1000 message, params:', tmp.params);
                                        if (tmp.params) {
                                            device.updateState(tmp.params);
                                        }
                                    }
                                    else if (device instanceof CloudZigbeeUIID1770Controller_1.default) {
                                        // console.log('接收到Zigbee温湿度传感器的信息：', tmp.params);
                                        console.log('get Zigbee uiid 1770 message, params:', tmp.params);
                                        if (tmp.params) {
                                            device.updateState(tmp.params);
                                        }
                                    }
                                    else if (device instanceof CloudZigbeeUIID2026Controller_1.default) {
                                        // console.log('接收到Zigbee移动传感器的信息：', tmp.params);
                                        console.log('get Zigbee uiid 2026 message, params:', tmp.params);
                                        if (tmp.params) {
                                            device.updateState(tmp.params);
                                        }
                                    }
                                    else if (device instanceof CloudZigbeeUIID3026Controller_1.default) {
                                        // console.log('接收到Zigbee门磁的信息：', tmp.params);
                                        console.log('get Zigbee uiid 3026 message, params:', tmp.params);
                                        if (tmp.params) {
                                            device.updateState(tmp.params);
                                        }
                                    }
                                    else if (device instanceof CloudZigbeeUIID4026Controller_1.default) {
                                        // console.log('接收到Zigbee水浸传感器的信息：', tmp.params);
                                        console.log('get Zigbee uiid 4026 message, params:', tmp.params);
                                        if (tmp.params) {
                                            device.updateState(tmp.params);
                                        }
                                    }
                                    else if (device instanceof CloudCoverController_1.default) {
                                        // console.log('接收到电动窗帘的信息：', tmp.params);
                                        console.log('get cover message, params:', tmp.params);
                                        if (tmp.params) {
                                            device.updateState(tmp.params);
                                        }
                                    }
                                    else if (device instanceof CloudRFBridgeController_1.default) {
                                        // console.log('接收到RFBridge的信息：', tmp.params);
                                        console.log('get RF-Bridge message, params:', tmp.params);
                                        ids = device.parseCkData2Ha(tmp.params);
                                        device.updateState(ids);
                                    }
                                    else if (device instanceof CloudUIID34Controller_1.default) {
                                        // console.log('接收到风扇灯的信息：', tmp.params);
                                        console.log('get uiid 34 message, params:', tmp.params);
                                        device.updateState(tmp.params.switches);
                                    }
                                    else if (device instanceof CloudUIID44Controller_1.default) {
                                        // console.log('接收到单路调光器的信息：', tmp.params);
                                        console.log('get uiid 44 message, params:', tmp.params);
                                        device.updateState(tmp.params);
                                    }
                                    eventBus_1.default.emit('update-controller', data);
                                }
                                if (!(tmp.action === 'sysmsg' && (device === null || device === void 0 ? void 0 : device.entityId))) return [3 /*break*/, 2];
                                online = tmp.params.online;
                                if (!(online === false)) return [3 /*break*/, 2];
                                return [4 /*yield*/, restApi_1.getStateByEntityId(device.entityId)];
                            case 1:
                                res = _d.sent();
                                if (res && res.data) {
                                    restApi_1.updateStates(device.entityId, {
                                        entity_id: device.entityId,
                                        state: 'unavailable',
                                        attributes: __assign(__assign({}, res.data.attributes), { state: 'unavailable' }),
                                    });
                                }
                                eventBus_1.default.emit('device-offline', device.deviceId);
                                _d.label = 2;
                            case 2:
                                // 同步状态到前端
                                eventBus_1.default.emit('sse');
                                _d.label = 3;
                            case 3: return [3 /*break*/, 5];
                            case 4:
                                error_1 = _d.sent();
                                console.log(error_1);
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); });
