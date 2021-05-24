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
var HASocketClass_1 = __importDefault(require("../class/HASocketClass"));
var Controller_1 = __importDefault(require("../controller/Controller"));
var DiyDeviceController_1 = __importDefault(require("../controller/DiyDeviceController"));
var LanSwitchController_1 = __importDefault(require("../controller/LanSwitchController"));
var CloudSwitchController_1 = __importDefault(require("../controller/CloudSwitchController"));
var CloudRGBLightController_1 = __importDefault(require("../controller/CloudRGBLightController"));
var CloudDimmingController_1 = __importDefault(require("../controller/CloudDimmingController"));
var CloudPowerDetectionSwitchController_1 = __importDefault(require("../controller/CloudPowerDetectionSwitchController"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("../controller/CloudMultiChannelSwitchController"));
var CloudRGBLightStripController_1 = __importDefault(require("../controller/CloudRGBLightStripController"));
var LanMultiChannelSwitchController_1 = __importDefault(require("../controller/LanMultiChannelSwitchController"));
var CloudTandHModificationController_1 = __importDefault(require("../controller/CloudTandHModificationController"));
var CloudDoubleColorLightController_1 = __importDefault(require("../controller/CloudDoubleColorLightController"));
var CloudDualR3Controller_1 = __importDefault(require("../controller/CloudDualR3Controller"));
var eventBus_1 = __importDefault(require("./eventBus"));
var LanDualR3Controller_1 = __importDefault(require("../controller/LanDualR3Controller"));
var LanTandHModificationController_1 = __importDefault(require("../controller/LanTandHModificationController"));
var LanPowerDetectionSwitchController_1 = __importDefault(require("../controller/LanPowerDetectionSwitchController"));
/**
 * @param {string} entity_id 实体id
 * @param {string} state // on | off
 * @param {*} res socket 返回的信息主体
 * @param {{ outlet: number; switch: string }[]} [mutiSwitchState] 可选，控制多通道的全开/全关
 * @return {*}
 */
var handleDeviceByEntityId = function (entity_id, state, res, mutiSwitchState) { return __awaiter(void 0, void 0, void 0, function () {
    var device, _a, id, outlet, _b, hs_color, _c, brightness_pct, params, brightness_pct, _d, id, outlet, _e, hs_color, color_temp, _f, brightness_pct, params, _g, color_temp, brightness_pct;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                device = Controller_1.default.getDevice(entity_id.replace(/_\d+$/, ''));
                if (!(device instanceof DiyDeviceController_1.default)) return [3 /*break*/, 2];
                return [4 /*yield*/, device.setSwitch(state)];
            case 1:
                _h.sent();
                _h.label = 2;
            case 2:
                if (!(device instanceof LanSwitchController_1.default)) return [3 /*break*/, 4];
                return [4 /*yield*/, device.setSwitch(state)];
            case 3:
                _h.sent();
                _h.label = 4;
            case 4:
                if (!(device instanceof LanMultiChannelSwitchController_1.default || device instanceof LanDualR3Controller_1.default)) return [3 /*break*/, 8];
                if (!mutiSwitchState) return [3 /*break*/, 6];
                return [4 /*yield*/, device.setSwitch(mutiSwitchState)];
            case 5:
                _h.sent();
                return [3 /*break*/, 8];
            case 6:
                _a = __read(entity_id.split('_'), 2), id = _a[0], outlet = _a[1];
                return [4 /*yield*/, device.setSwitch([
                        {
                            outlet: +outlet - 1,
                            switch: state,
                        },
                    ])];
            case 7:
                _h.sent();
                _h.label = 8;
            case 8:
                // lan 恒温恒湿
                if (device instanceof LanTandHModificationController_1.default) {
                    device.setSwitch(state);
                }
                // lan 单通道插座增强版（用电统计）
                if (device instanceof LanPowerDetectionSwitchController_1.default) {
                    device.setSwitch(state);
                }
                if (!(device instanceof CloudSwitchController_1.default)) return [3 /*break*/, 10];
                return [4 /*yield*/, device.updateSwitch(state)];
            case 9:
                _h.sent();
                _h.label = 10;
            case 10:
                if (!(device instanceof CloudRGBLightController_1.default)) return [3 /*break*/, 14];
                if (!(state === 'off')) return [3 /*break*/, 12];
                return [4 /*yield*/, device.updateLight({
                        state: state,
                    })];
            case 11:
                _h.sent();
                return [2 /*return*/];
            case 12:
                _b = res.service_data, hs_color = _b.hs_color, _c = _b.brightness_pct, brightness_pct = _c === void 0 ? 0 : _c;
                params = device.parseHaData2Ck({ hs_color: hs_color, brightness_pct: brightness_pct, state: state });
                return [4 /*yield*/, device.updateLight(params)];
            case 13:
                _h.sent();
                _h.label = 14;
            case 14:
                if (!(device instanceof CloudDimmingController_1.default)) return [3 /*break*/, 16];
                brightness_pct = res.service_data.brightness_pct;
                return [4 /*yield*/, device.updateLight({
                        switch: state,
                        bright: brightness_pct,
                    })];
            case 15:
                _h.sent();
                _h.label = 16;
            case 16:
                if (!(device instanceof CloudPowerDetectionSwitchController_1.default)) return [3 /*break*/, 18];
                return [4 /*yield*/, device.updateSwitch(state)];
            case 17:
                _h.sent();
                _h.label = 18;
            case 18:
                if (!(device instanceof CloudTandHModificationController_1.default)) return [3 /*break*/, 20];
                return [4 /*yield*/, device.updateSwitch(state)];
            case 19:
                _h.sent();
                _h.label = 20;
            case 20:
                if (!(device instanceof CloudMultiChannelSwitchController_1.default || device instanceof CloudDualR3Controller_1.default)) return [3 /*break*/, 24];
                if (!mutiSwitchState) return [3 /*break*/, 22];
                return [4 /*yield*/, device.updateSwitch(mutiSwitchState)];
            case 21:
                _h.sent();
                return [3 /*break*/, 24];
            case 22:
                _d = __read(entity_id.split('_'), 2), id = _d[0], outlet = _d[1];
                return [4 /*yield*/, device.updateSwitch([
                        {
                            outlet: +outlet - 1,
                            switch: state,
                        },
                    ])];
            case 23:
                _h.sent();
                _h.label = 24;
            case 24:
                if (!(device instanceof CloudRGBLightStripController_1.default)) return [3 /*break*/, 28];
                if (!(state === 'off')) return [3 /*break*/, 26];
                return [4 /*yield*/, device.updateLight({
                        switch: state,
                    })];
            case 25:
                _h.sent();
                return [2 /*return*/];
            case 26:
                _e = res.service_data, hs_color = _e.hs_color, color_temp = _e.color_temp, _f = _e.brightness_pct, brightness_pct = _f === void 0 ? 0 : _f;
                params = device.parseHaData2Ck({ hs_color: hs_color, brightness_pct: brightness_pct, state: state });
                return [4 /*yield*/, device.updateLight(params)];
            case 27:
                _h.sent();
                _h.label = 28;
            case 28:
                if (!(device instanceof CloudDoubleColorLightController_1.default)) return [3 /*break*/, 32];
                if (!(state === 'off')) return [3 /*break*/, 30];
                return [4 /*yield*/, device.updateLight({
                        switch: state,
                    })];
            case 29:
                _h.sent();
                return [2 /*return*/];
            case 30:
                _g = res.service_data, color_temp = _g.color_temp, brightness_pct = _g.brightness_pct;
                return [4 /*yield*/, device.updateLight({
                        switch: state,
                        ct: color_temp,
                        br: brightness_pct,
                    })];
            case 31:
                _h.sent();
                _h.label = 32;
            case 32: return [2 /*return*/];
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
                    return [4 /*yield*/, HASocketClass_1.default.init(reconnect)];
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
                                        console.log('HA emit call_service event', res);
                                        entity_id = res.service_data.entity_id, service = res.service;
                                        state = service === 'turn_off' ? 'off' : 'on';
                                        if (!Array.isArray(entity_id)) return [3 /*break*/, 8];
                                        tmpMap_1 = new Map();
                                        entity_id.forEach(function (item) {
                                            var _a = __read(item.split('_'), 2), deviceid = _a[0], outlet = _a[1];
                                            var device = Controller_1.default.getDevice(deviceid);
                                            // 一次性控制多通道设备多个通道
                                            if (device instanceof LanMultiChannelSwitchController_1.default || device instanceof CloudMultiChannelSwitchController_1.default || device instanceof CloudDualR3Controller_1.default) {
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
                                        if (!!_b.done) return [3 /*break*/, 5];
                                        _c = __read(_b.value, 2), id = _c[0], mutiSwitchState = _c[1];
                                        return [4 /*yield*/, handleDeviceByEntityId(id, state, res, mutiSwitchState)];
                                    case 3:
                                        _e.sent();
                                        _e.label = 4;
                                    case 4:
                                        _b = _a.next();
                                        return [3 /*break*/, 2];
                                    case 5: return [3 /*break*/, 8];
                                    case 6:
                                        e_1_1 = _e.sent();
                                        e_1 = { error: e_1_1 };
                                        return [3 /*break*/, 8];
                                    case 7:
                                        try {
                                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                                        }
                                        finally { if (e_1) throw e_1.error; }
                                        return [7 /*endfinally*/];
                                    case 8:
                                        if (!(typeof entity_id === 'string')) return [3 /*break*/, 10];
                                        return [4 /*yield*/, handleDeviceByEntityId(entity_id, state, res)];
                                    case 9:
                                        _e.sent();
                                        _e.label = 10;
                                    case 10:
                                        eventBus_1.default.emit('sse');
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log('Jia ~ file: initHaSocket.ts ~ line 28 ~ err', err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
