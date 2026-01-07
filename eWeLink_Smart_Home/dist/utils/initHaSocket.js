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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var HASocketClass_1 = __importDefault(require("../class/HASocketClass"));
var Controller_1 = __importDefault(require("../controller/Controller"));
var DiyDeviceController_1 = __importDefault(require("../controller/DiyDeviceController"));
var LanSwitchController_1 = __importDefault(require("../controller/LanSwitchController"));
var CloudSwitchController_1 = __importDefault(require("../controller/CloudSwitchController"));
var CloudRGBBulbController_1 = __importDefault(require("../controller/CloudRGBBulbController"));
var CloudDimmingController_1 = __importDefault(require("../controller/CloudDimmingController"));
var CloudPowerDetectionSwitchController_1 = __importDefault(require("../controller/CloudPowerDetectionSwitchController"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("../controller/CloudMultiChannelSwitchController"));
var CloudRGBLightStripController_1 = __importDefault(require("../controller/CloudRGBLightStripController"));
var LanMultiChannelSwitchController_1 = __importDefault(require("../controller/LanMultiChannelSwitchController"));
var CloudTandHModificationController_1 = __importDefault(require("../controller/CloudTandHModificationController"));
var CloudDoubleColorBulbController_1 = __importDefault(require("../controller/CloudDoubleColorBulbController"));
var CloudDualR3Controller_1 = __importDefault(require("../controller/CloudDualR3Controller"));
var eventBus_1 = __importDefault(require("./eventBus"));
var LanDualR3Controller_1 = __importDefault(require("../controller/LanDualR3Controller"));
var LanTandHModificationController_1 = __importDefault(require("../controller/LanTandHModificationController"));
var LanPowerDetectionSwitchController_1 = __importDefault(require("../controller/LanPowerDetectionSwitchController"));
var LanDoubleColorLightController_1 = __importDefault(require("../controller/LanDoubleColorLightController"));
var CloudUIID104Controller_1 = __importDefault(require("../controller/CloudUIID104Controller"));
var haServiceMap_1 = __importDefault(require("../config/haServiceMap"));
var CloudCoverController_1 = __importDefault(require("../controller/CloudCoverController"));
var CloudUIID44Controller_1 = __importDefault(require("../controller/CloudUIID44Controller"));
var CloudUIID34Controller_1 = __importDefault(require("../controller/CloudUIID34Controller"));
var LanUIID34Controller_1 = __importDefault(require("../controller/LanUIID34Controller"));
var logger_1 = require("./logger");
var CloudZigbeeMultiSwitchController_1 = __importDefault(require("../controller/CloudZigbeeMultiSwitchController"));
var CloudZigbeeDoubleColorBulbController_1 = __importDefault(require("../controller/CloudZigbeeDoubleColorBulbController"));
var CloudZigbeeFiveColorBulbController_1 = __importDefault(require("../controller/CloudZigbeeFiveColorBulbController"));
var CloudUIID181Controller_1 = __importDefault(require("../controller/CloudUIID181Controller"));
var CloudUIID190Controller_1 = __importDefault(require("../controller/CloudUIID190Controller"));
var CloudUIID130Controller_1 = __importDefault(require("../controller/CloudUIID130Controller"));
var CloudUIID182Controller_1 = __importDefault(require("../controller/CloudUIID182Controller"));
var CloudUIID137Controller_1 = __importDefault(require("../controller/CloudUIID137Controller"));
var CloudUIID173Controller_1 = __importDefault(require("../controller/CloudUIID173Controller"));
var handleDeviceByEntityId = function (entity_id, state, res, mutiSwitchState) { return __awaiter(void 0, void 0, void 0, function () {
    var device, _a, id, outlet, params, _b, _c, brightness_pct, _d, id, outlet, params, params, brightness_pct, switches, _e, brightness, color_temp, _f, id, outlet;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                device = Controller_1.default.getDevice(entity_id.replace(/_\d+$/, ''));
                if (!(device instanceof DiyDeviceController_1.default)) return [3, 2];
                return [4, device.setSwitch(state)];
            case 1:
                _g.sent();
                return [3, 58];
            case 2:
                if (!(device instanceof LanSwitchController_1.default)) return [3, 4];
                return [4, device.setSwitch(state)];
            case 3:
                _g.sent();
                return [3, 58];
            case 4:
                if (!(device instanceof LanMultiChannelSwitchController_1.default || device instanceof LanDualR3Controller_1.default)) return [3, 9];
                if (!mutiSwitchState) return [3, 6];
                return [4, device.setSwitch(mutiSwitchState)];
            case 5:
                _g.sent();
                return [3, 8];
            case 6:
                _a = __read(entity_id.split('_'), 2), id = _a[0], outlet = _a[1];
                return [4, device.setSwitch([
                        {
                            outlet: +outlet - 1,
                            switch: state,
                        },
                    ])];
            case 7:
                _g.sent();
                _g.label = 8;
            case 8: return [3, 58];
            case 9:
                if (!(device instanceof LanTandHModificationController_1.default)) return [3, 10];
                device.setSwitch(state);
                return [3, 58];
            case 10:
                if (!(device instanceof LanPowerDetectionSwitchController_1.default)) return [3, 11];
                device.setSwitch(state);
                return [3, 58];
            case 11:
                if (!(device instanceof LanDoubleColorLightController_1.default)) return [3, 12];
                device.updateLight(device.parseHaData2Ck(__assign({ state: state }, res.service_data)));
                return [3, 58];
            case 12:
                if (!(device instanceof LanUIID34Controller_1.default)) return [3, 17];
                params = device.parseHaData2Lan(__assign({ state: state }, res.service_data));
                _b = params.fan;
                if (!_b) return [3, 14];
                return [4, device.setFan(params)];
            case 13:
                _b = (_g.sent());
                _g.label = 14;
            case 14:
                _b;
                _c = params.light;
                if (!_c) return [3, 16];
                return [4, device.toggleLight(params)];
            case 15:
                _c = (_g.sent());
                _g.label = 16;
            case 16:
                _c;
                return [3, 58];
            case 17:
                if (!(device instanceof CloudSwitchController_1.default)) return [3, 19];
                return [4, device.updateSwitch(state)];
            case 18:
                _g.sent();
                return [3, 58];
            case 19:
                if (!(device instanceof CloudRGBBulbController_1.default)) return [3, 21];
                return [4, device.updateLight(device.parseHaData2Ck(__assign({ state: state }, res.service_data)))];
            case 20:
                _g.sent();
                return [3, 58];
            case 21:
                if (!(device instanceof CloudDimmingController_1.default)) return [3, 23];
                brightness_pct = res.service_data.brightness_pct;
                return [4, device.updateLight({
                        switch: state,
                        bright: brightness_pct,
                    })];
            case 22:
                _g.sent();
                return [3, 58];
            case 23:
                if (!(device instanceof CloudPowerDetectionSwitchController_1.default)) return [3, 25];
                return [4, device.updateSwitch(state)];
            case 24:
                _g.sent();
                return [3, 58];
            case 25:
                if (!(device instanceof CloudTandHModificationController_1.default)) return [3, 27];
                return [4, device.updateSwitch(state)];
            case 26:
                _g.sent();
                return [3, 58];
            case 27:
                if (!(device instanceof CloudMultiChannelSwitchController_1.default ||
                    device instanceof CloudDualR3Controller_1.default ||
                    device instanceof CloudZigbeeMultiSwitchController_1.default ||
                    device instanceof CloudUIID130Controller_1.default ||
                    device instanceof CloudUIID182Controller_1.default)) return [3, 32];
                if (!mutiSwitchState) return [3, 29];
                return [4, device.updateSwitch(mutiSwitchState)];
            case 28:
                _g.sent();
                return [3, 31];
            case 29:
                _d = __read(entity_id.split('_'), 2), id = _d[0], outlet = _d[1];
                return [4, device.updateSwitch([
                        {
                            outlet: +outlet - 1,
                            switch: state,
                        },
                    ])];
            case 30:
                _g.sent();
                _g.label = 31;
            case 31: return [3, 58];
            case 32:
                if (!(device instanceof CloudRGBLightStripController_1.default)) return [3, 33];
                params = device.parseHaData2Ck(__assign({ state: state }, res.service_data));
                device.updateLight(params);
                return [3, 58];
            case 33:
                if (!(device instanceof CloudDoubleColorBulbController_1.default)) return [3, 35];
                return [4, device.updateLight(device.parseHaData2Ck(__assign({ state: state }, res.service_data)))];
            case 34:
                _g.sent();
                return [3, 58];
            case 35:
                if (!(device instanceof CloudUIID104Controller_1.default)) return [3, 37];
                return [4, device.updateLight(device.parseHaData2Ck(__assign({ state: state }, res.service_data)))];
            case 36:
                _g.sent();
                return [3, 58];
            case 37:
                if (!(device instanceof CloudUIID137Controller_1.default || device instanceof CloudUIID173Controller_1.default)) return [3, 39];
                params = device.parseHaData2Ck(__assign({ state: state }, res.service_data));
                logger_1.logger.info('🚀 ~ 173 返回HA的参数' + JSON.stringify(params));
                return [4, device.updateLight(params)];
            case 38:
                _g.sent();
                return [3, 58];
            case 39:
                if (!(device instanceof CloudCoverController_1.default)) return [3, 41];
                return [4, device.setCover({ switch: state, setclose: lodash_1.default.get(res, 'service_data.position') })];
            case 40:
                _g.sent();
                return [3, 58];
            case 41:
                if (!(device instanceof CloudUIID44Controller_1.default)) return [3, 43];
                brightness_pct = res.service_data.brightness_pct;
                return [4, device.updateLight({ switch: state, brightness: brightness_pct })];
            case 42:
                _g.sent();
                return [3, 58];
            case 43:
                if (!(device instanceof CloudUIID34Controller_1.default)) return [3, 45];
                switches = device.parseHaData2Ck(__assign({ state: state }, res.service_data));
                return [4, device.updateSwitch(switches)];
            case 44:
                _g.sent();
                return [3, 58];
            case 45:
                if (!(device instanceof CloudZigbeeDoubleColorBulbController_1.default)) return [3, 50];
                _e = res.service_data, brightness = _e.brightness, color_temp = _e.color_temp;
                if (!(brightness && color_temp)) return [3, 48];
                return [4, device.updateLight(device.parseHaData2Ck({ state: state, brightness: brightness }))];
            case 46:
                _g.sent();
                return [4, device.updateLight(device.parseHaData2Ck({ state: state, color_temp: color_temp }))];
            case 47:
                _g.sent();
                return [2];
            case 48: return [4, device.updateLight(device.parseHaData2Ck(__assign({ state: state }, res.service_data)))];
            case 49:
                _g.sent();
                return [3, 58];
            case 50:
                if (!(device instanceof CloudZigbeeFiveColorBulbController_1.default)) return [3, 52];
                return [4, device.updateLight(device.parseHaData2Ck(__assign({ state: state }, res.service_data)))];
            case 51:
                _g.sent();
                return [3, 58];
            case 52:
                if (!(device instanceof CloudUIID181Controller_1.default)) return [3, 54];
                return [4, device.updateSwitch(state)];
            case 53:
                _g.sent();
                return [3, 58];
            case 54:
                if (!(device instanceof CloudUIID190Controller_1.default)) return [3, 58];
                if (!mutiSwitchState) return [3, 56];
                return [4, device.updateSwitch(mutiSwitchState)];
            case 55:
                _g.sent();
                return [3, 58];
            case 56:
                _f = __read(entity_id.split('_'), 2), id = _f[0], outlet = _f[1];
                return [4, device.updateSwitch([
                        {
                            outlet: +outlet - 1,
                            switch: state,
                        },
                    ])];
            case 57:
                _g.sent();
                _g.label = 58;
            case 58: return [2];
        }
    });
}); };
exports.default = (function (reconnect) {
    if (reconnect === void 0) { reconnect = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, HASocketClass_1.default.init(reconnect)];
                case 1:
                    res = _a.sent();
                    if (res === 0) {
                        HASocketClass_1.default.subscribeEvents('call_service');
                        HASocketClass_1.default.handleEvent('call_service', function (res) { return __awaiter(void 0, void 0, void 0, function () {
                            var entity_id, service, state, tmpMap_1, _a, _b, _c, id, mutiSwitchState, e_1_1;
                            var e_1, _d;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        logger_1.logger.info("HA emit call_service event: ".concat(JSON.stringify(res)));
                                        entity_id = res.service_data.entity_id, service = res.service;
                                        state = haServiceMap_1.default.get(service);
                                        if (!Array.isArray(entity_id)) return [3, 8];
                                        tmpMap_1 = new Map();
                                        entity_id.forEach(function (item) {
                                            var _a = __read(item.split('_'), 2), deviceid = _a[0], outlet = _a[1];
                                            var device = Controller_1.default.getDevice(deviceid);
                                            if (device instanceof LanMultiChannelSwitchController_1.default || device instanceof CloudMultiChannelSwitchController_1.default || device instanceof CloudDualR3Controller_1.default || device instanceof CloudZigbeeMultiSwitchController_1.default) {
                                                if (tmpMap_1.has(deviceid)) {
                                                    tmpMap_1.get(deviceid).push({
                                                        outlet: outlet - 1,
                                                        switch: state,
                                                    });
                                                }
                                                else {
                                                    tmpMap_1.set(deviceid, [
                                                        {
                                                            outlet: outlet - 1,
                                                            switch: state,
                                                        },
                                                    ]);
                                                }
                                            }
                                            else {
                                                handleDeviceByEntityId(item, state, res);
                                            }
                                        });
                                        _e.label = 1;
                                    case 1:
                                        _e.trys.push([1, 6, 7, 8]);
                                        _a = __values(tmpMap_1.entries()), _b = _a.next();
                                        _e.label = 2;
                                    case 2:
                                        if (!!_b.done) return [3, 5];
                                        _c = __read(_b.value, 2), id = _c[0], mutiSwitchState = _c[1];
                                        return [4, handleDeviceByEntityId(id, state, res, mutiSwitchState)];
                                    case 3:
                                        _e.sent();
                                        _e.label = 4;
                                    case 4:
                                        _b = _a.next();
                                        return [3, 2];
                                    case 5: return [3, 8];
                                    case 6:
                                        e_1_1 = _e.sent();
                                        e_1 = { error: e_1_1 };
                                        return [3, 8];
                                    case 7:
                                        try {
                                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                                        }
                                        finally { if (e_1) throw e_1.error; }
                                        return [7];
                                    case 8:
                                        if (!(typeof entity_id === 'string')) return [3, 10];
                                        return [4, handleDeviceByEntityId(entity_id, state, res)];
                                    case 9:
                                        _e.sent();
                                        _e.label = 10;
                                    case 10:
                                        eventBus_1.default.emit('sse');
                                        return [2];
                                }
                            });
                        }); });
                    }
                    return [3, 3];
                case 2:
                    err_1 = _a.sent();
                    logger_1.logger.error("initHaSocket error: ".concat(err_1));
                    return [3, 3];
                case 3: return [2];
            }
        });
    });
});
