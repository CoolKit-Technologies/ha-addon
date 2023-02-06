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
var process_1 = __importDefault(require("process"));
var logger_1 = require("./logger");
var CloudZigbeeMultiSwitchController_1 = __importDefault(require("../controller/CloudZigbeeMultiSwitchController"));
var CloudZigbeeDoubleColorBulbController_1 = __importDefault(require("../controller/CloudZigbeeDoubleColorBulbController"));
var CloudZigbeeFiveColorBulbController_1 = __importDefault(require("../controller/CloudZigbeeFiveColorBulbController"));
var CloudUIID181Controller_1 = __importDefault(require("../controller/CloudUIID181Controller"));
var CloudUIID190Controller_1 = __importDefault(require("../controller/CloudUIID190Controller"));
var CloudUIID137Controller_1 = __importDefault(require("../controller/CloudUIID137Controller"));
var CloudUIID173Controller_1 = __importDefault(require("../controller/CloudUIID173Controller"));
var mergeDeviceParams_1 = __importDefault(require("./mergeDeviceParams"));
var LanDeviceController_1 = __importDefault(require("../controller/LanDeviceController"));
var CloudDeviceController_1 = __importDefault(require("../controller/CloudDeviceController"));
var CloudUIID130Controller_1 = __importDefault(require("../controller/CloudUIID130Controller"));
var CloudUIID182Controller_1 = __importDefault(require("../controller/CloudUIID182Controller"));
var lodash_1 = __importDefault(require("lodash"));
var channelMap_1 = require("../config/channelMap");
exports.default = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var apikey, at, region, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apikey = (0, dataUtil_1.getDataSync)('user.json', ['user', 'apikey']);
                at = (0, dataUtil_1.getDataSync)('user.json', ['at']);
                region = (0, dataUtil_1.getDataSync)('user.json', ['region']);
                logger_1.logger.debug("initCkWs.ts at: ".concat(at, " region: ").concat(region));
                if (!at || !apikey) {
                    return [2, -1];
                }
                return [4, coolkit_ws_1.default.init({
                        appid: app_1.appId,
                        at: at,
                        apikey: apikey,
                        region: region,
                        userAgent: 'app',
                        reqTimeout: 30000,
                        useTestEnv: process_1.default.env.CK_API_ENV === 'test',
                        maxRetry: 10000,
                    })];
            case 1:
                res = _a.sent();
                logger_1.logger.debug('initCkWs.ts res: ' + JSON.stringify(res));
                logger_1.logger.debug("initCkWs at: ".concat(at));
                coolkit_ws_1.default.on('message', function (ws) { return __awaiter(void 0, void 0, void 0, function () {
                    var type, data, tmp, device, _a, currentTemperature, currentHumidity, state, _b, bright, status_1, _c, current, voltage, power, status_2, switches, switches, ids, switches, switches, switches, _d, online, name_1, updateUnavailable2Ha, switches, channelNum, i;
                    return __generator(this, function (_e) {
                        try {
                            type = ws.type, data = ws.data;
                            logger_1.logger.debug("receive CK-WS msg: type: ".concat(type));
                            logger_1.logger.debug("receive CK-WS msg: data: ".concat(JSON.stringify(data)));
                            if (type === 'message' && data !== 'pong') {
                                tmp = JSON.parse(data);
                                if (!tmp.deviceid) {
                                    return [2];
                                }
                                device = Controller_1.default.getDevice(tmp.deviceid);
                                if (tmp.action === 'update') {
                                    if (device instanceof LanDeviceController_1.default || device instanceof CloudDeviceController_1.default) {
                                        (0, mergeDeviceParams_1.default)(device.params, tmp.params);
                                    }
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
                                        logger_1.logger.info("Get power detection switch message, params: ".concat(JSON.stringify(tmp.params)));
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
                                    else if (device instanceof CloudZigbeeMultiSwitchController_1.default) {
                                        switches = tmp.params.switches;
                                        if (Array.isArray(switches)) {
                                            device.updateState(switches);
                                        }
                                    }
                                    else if (device instanceof CloudRGBLightStripController_1.default) {
                                        logger_1.logger.info("Get lamp strip message, params: ".concat(JSON.stringify(tmp.params)));
                                        device.updateState(device.parseCkData2Ha(tmp.params));
                                    }
                                    else if (device instanceof CloudDoubleColorBulbController_1.default) {
                                        logger_1.logger.info("Get double color bulb message, params: ".concat(JSON.stringify(tmp.params)));
                                        device.updateState(tmp.params);
                                    }
                                    else if (device instanceof CloudUIID104Controller_1.default) {
                                        logger_1.logger.info("Get UIID 104 message, params: ".concat(tmp.params));
                                        device.updateState(tmp.params);
                                    }
                                    else if (device instanceof CloudDualR3Controller_1.default || device instanceof LanDualR3Controller_1.default) {
                                        logger_1.logger.info("Get DualR3 message, params: ".concat(tmp.params));
                                        if (tmp.params && tmp.params.switches) {
                                            device.updateState(tmp.params.switches);
                                        }
                                    }
                                    else if (device instanceof CloudDW2WiFiController_1.default) {
                                        logger_1.logger.info("Get DW2 message, params: ".concat(tmp.params));
                                        if (tmp.params) {
                                            device.updateState(tmp.params);
                                        }
                                    }
                                    else if (device instanceof CloudZigbeeUIID1000Controller_1.default) {
                                        logger_1.logger.info("Get Zigbee UIID 1000 message, params: ".concat(tmp.params));
                                        if (tmp.params) {
                                            device.updateState(tmp.params);
                                        }
                                    }
                                    else if (device instanceof CloudZigbeeUIID1770Controller_1.default) {
                                        logger_1.logger.info("Get Zigbee UIID 1770 message, params: ".concat(tmp.params));
                                        if (tmp.params) {
                                            device.updateState(tmp.params);
                                        }
                                    }
                                    else if (device instanceof CloudZigbeeUIID2026Controller_1.default) {
                                        logger_1.logger.info("Get Zigbee UIID 2026 message, params: ".concat(tmp.params));
                                        if (tmp.params) {
                                            device.updateState(tmp.params);
                                        }
                                    }
                                    else if (device instanceof CloudZigbeeUIID3026Controller_1.default) {
                                        logger_1.logger.info("Get Zigbee UIID 3026 message, params: ".concat(tmp.params));
                                        if (tmp.params) {
                                            device.updateState(tmp.params);
                                        }
                                    }
                                    else if (device instanceof CloudZigbeeUIID4026Controller_1.default) {
                                        logger_1.logger.info("Get Zigbee UIID 4026 message, params: ".concat(tmp.params));
                                        if (tmp.params) {
                                            device.updateState(tmp.params);
                                        }
                                    }
                                    else if (device instanceof CloudCoverController_1.default) {
                                        logger_1.logger.info("Get cover message, params: ".concat(tmp.params));
                                        if (tmp.params) {
                                            device.updateState(tmp.params);
                                        }
                                    }
                                    else if (device instanceof CloudRFBridgeController_1.default) {
                                        logger_1.logger.info("Get RF-Bridge message, params: ".concat(tmp.params));
                                        ids = device.parseCkData2Ha(tmp.params);
                                        device.updateState(ids);
                                    }
                                    else if (device instanceof CloudUIID34Controller_1.default) {
                                        logger_1.logger.info("Get UIID 34 message, params: ".concat(tmp.params));
                                        device.updateState(tmp.params.switches);
                                    }
                                    else if (device instanceof CloudUIID44Controller_1.default) {
                                        logger_1.logger.info("Get UIID 44 message, params: ".concat(tmp.params));
                                        device.updateState(tmp.params);
                                    }
                                    else if (device instanceof CloudZigbeeDoubleColorBulbController_1.default || device instanceof CloudZigbeeFiveColorBulbController_1.default) {
                                        logger_1.logger.info("Get UIID 1258 message, params: ".concat(JSON.stringify(tmp.params)));
                                        device.updateState(tmp.params);
                                    }
                                    else if (device instanceof CloudUIID181Controller_1.default) {
                                        device.updateState(tmp.params.switch);
                                    }
                                    else if (device instanceof CloudUIID190Controller_1.default) {
                                        logger_1.logger.info("Get UIID 190 message, params: ".concat(JSON.stringify(tmp.params)));
                                        switches = tmp.params.switches;
                                        if (Array.isArray(switches)) {
                                            device.updateState(switches);
                                        }
                                    }
                                    else if (device instanceof CloudUIID137Controller_1.default) {
                                        logger_1.logger.info("Get UIID 137 message, params: ".concat(JSON.stringify(tmp.params)));
                                        device.updateState(tmp.params);
                                    }
                                    else if (device instanceof CloudUIID173Controller_1.default) {
                                        logger_1.logger.info("Get UIID 173 message, params: ".concat(JSON.stringify(tmp.params)));
                                        device.updateState(tmp.params);
                                    }
                                    else if (device instanceof CloudUIID130Controller_1.default) {
                                        logger_1.logger.info("Get UIID 130 message, params: ".concat(JSON.stringify(tmp.params)));
                                        switches = tmp.params.switches;
                                        if (Array.isArray(switches)) {
                                            device.updateState(switches);
                                        }
                                    }
                                    else if (device instanceof CloudUIID182Controller_1.default) {
                                        logger_1.logger.info("Get UIID 182 message, params: ".concat(JSON.stringify(tmp.params)));
                                        switches = tmp.params.switches;
                                        if (Array.isArray(switches)) {
                                            device.updateState(switches);
                                        }
                                    }
                                    eventBus_1.default.emit('update-controller', data);
                                }
                                if (tmp.action === 'sysmsg' && (device === null || device === void 0 ? void 0 : device.entityId)) {
                                    _d = tmp.params, online = _d.online, name_1 = _d.name;
                                    if (device instanceof LanDeviceController_1.default || device instanceof CloudDeviceController_1.default) {
                                        (0, mergeDeviceParams_1.default)(device, { online: online, deviceName: name_1 });
                                    }
                                    if (online === false) {
                                        updateUnavailable2Ha = function (entityId) { return __awaiter(void 0, void 0, void 0, function () {
                                            var state, entityRes;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        state = 'unavailable';
                                                        return [4, (0, restApi_1.getStateByEntityId)(entityId)];
                                                    case 1:
                                                        entityRes = _a.sent();
                                                        if (entityRes && entityRes.data) {
                                                            (0, restApi_1.updateStates)(entityId, {
                                                                entity_id: entityId,
                                                                state: state,
                                                                attributes: __assign(__assign({}, entityRes.data.attributes), { state: state })
                                                            });
                                                        }
                                                        return [2];
                                                }
                                            });
                                        }); };
                                        switches = lodash_1.default.get(device, ['params', 'switches'], undefined);
                                        if (switches && switches.length > 0) {
                                            channelNum = (0, channelMap_1.getMaxChannelByUiid)(device.uiid);
                                            for (i = 0; i < channelNum; i++) {
                                                updateUnavailable2Ha("".concat(device.entityId, "_").concat(i + 1));
                                            }
                                        }
                                        else {
                                            updateUnavailable2Ha(device.entityId);
                                        }
                                        eventBus_1.default.emit('device-offline', device.deviceId);
                                    }
                                }
                                eventBus_1.default.emit('sse');
                            }
                        }
                        catch (error) {
                            logger_1.logger.error("initCkWs error: ".concat(error));
                        }
                        return [2];
                    });
                }); });
                return [2];
        }
    });
}); });
