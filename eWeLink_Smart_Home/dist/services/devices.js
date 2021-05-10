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
exports.setRate = exports.changeUnit = exports.removeDiyDevice = exports.updateDiyDevice = exports.upgradeDevice = exports.getOTAinfo = exports.proxy2ws = exports.updateChannelName = exports.updateDeviceName = exports.disableDevice = exports.getDeviceById = exports.getDevices = void 0;
var coolkit_ws_1 = __importDefault(require("coolkit-ws"));
var Controller_1 = __importDefault(require("../controller/Controller"));
var initMdns_1 = __importDefault(require("../utils/initMdns"));
var modifyDeviceStatus_1 = require("../utils/modifyDeviceStatus");
var formatDevice_1 = require("../utils/formatDevice");
var CloudTandHModificationController_1 = __importDefault(require("../controller/CloudTandHModificationController"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("../controller/CloudMultiChannelSwitchController"));
var LanMultiChannelSwitchController_1 = __importDefault(require("../controller/LanMultiChannelSwitchController"));
var ckApi_1 = require("../apis/ckApi");
var diyDeviceApi_1 = require("../apis/diyDeviceApi");
var DiyDeviceController_1 = __importDefault(require("../controller/DiyDeviceController"));
var dataUtil_1 = require("../utils/dataUtil");
var lodash_1 = __importDefault(require("lodash"));
var eventBus_1 = __importDefault(require("../utils/eventBus"));
var LanDeviceController_1 = __importDefault(require("../controller/LanDeviceController"));
var CloudDeviceController_1 = __importDefault(require("../controller/CloudDeviceController"));
var CloudDualR3Controller_1 = __importDefault(require("../controller/CloudDualR3Controller"));
var CloudPowerDetectionSwitchController_1 = __importDefault(require("../controller/CloudPowerDetectionSwitchController"));
var mergeDeviceParams_1 = __importDefault(require("../utils/mergeDeviceParams"));
var CloudSwitchController_1 = __importDefault(require("../controller/CloudSwitchController"));
var syncDevice2Ha_1 = __importDefault(require("../utils/syncDevice2Ha"));
var removeEntityByDevice_1 = __importDefault(require("../utils/removeEntityByDevice"));
var mdns = initMdns_1.default();
var getDevices = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var type, refresh, data;
    return __generator(this, function (_a) {
        try {
            type = req.query.type;
            refresh = req.body.refresh;
            if (type === undefined) {
                res.json({
                    error: 401,
                    data: null,
                });
            }
            if (refresh) {
                syncDevice2Ha_1.default({
                    syncLovelace: false,
                    sleepTime: 2000,
                });
            }
            data = formatDevice_1.getFormattedDeviceList();
            res.json({
                error: 0,
                data: data,
            });
        }
        catch (err) {
            console.log('Jia ~ file: devices.ts ~ line 22 ~ getDevices ~ err', err);
            res.json({
                error: 500,
                data: null,
            });
        }
        return [2 /*return*/];
    });
}); };
exports.getDevices = getDevices;
var getDeviceById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, device;
    return __generator(this, function (_a) {
        try {
            id = req.query.id;
            device = Controller_1.default.getDevice(id);
            if (!device) {
                res.json({
                    error: 402,
                    msg: 'device not found',
                });
            }
            res.json({
                error: 0,
                data: formatDevice_1.formatDevice(device),
            });
        }
        catch (err) {
            console.log('Jia ~ file: devices.ts ~ line 22 ~ getDevices ~ err', err);
            res.json({
                error: 500,
                data: null,
            });
        }
        return [2 /*return*/];
    });
}); };
exports.getDeviceById = getDeviceById;
var disableDevice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, disabled, id, device, error, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, disabled = _a.disabled, id = _a.id;
                device = Controller_1.default.getDevice(id);
                if (!device) {
                    res.json({
                        error: 402,
                        msg: 'not such device',
                    });
                }
                device.disabled = disabled;
                return [4 /*yield*/, modifyDeviceStatus_1.modifyDeviceStatus(id, disabled)];
            case 1:
                error = _b.sent();
                if (device && disabled) {
                    removeEntityByDevice_1.default(device);
                }
                if (!disabled) {
                    syncDevice2Ha_1.default({
                        syncLovelace: true,
                        sleepTime: 2000,
                    });
                }
                if (error === 0) {
                    res.json({
                        error: 0,
                        data: null,
                    });
                }
                else {
                    res.json({
                        error: 500,
                        data: null,
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                console.log('Jia ~ file: devices.ts ~ line 71 ~ disableDevice ~ err', err_1);
                res.json({
                    error: 500,
                    data: null,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.disableDevice = disableDevice;
var updateDeviceName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, newName, id, device, error, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, newName = _a.newName, id = _a.id;
                device = Controller_1.default.getDevice(id);
                if (!(device instanceof CloudDeviceController_1.default || device instanceof LanDeviceController_1.default)) return [3 /*break*/, 2];
                return [4 /*yield*/, ckApi_1.updateDeviceNameAPI(id, newName)];
            case 1:
                error = (_b.sent()).error;
                if (error === 0) {
                    res.json({
                        error: 0,
                        data: null,
                    });
                    device.deviceName = newName;
                    eventBus_1.default.emit('sse');
                }
                else {
                    console.log('更新设备名称出错, id:', id, '\nerror:', error);
                    res.json({
                        error: error,
                        data: null,
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                res.json({
                    error: 402,
                    msg: 'not such device',
                });
                _b.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                console.log('Jia ~ file: devices.ts ~ line 71 ~ disableDevice ~ err', err_2);
                res.json({
                    error: 500,
                    data: null,
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateDeviceName = updateDeviceName;
var updateChannelName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, tags, id, ck_channel_name, device, error, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, tags = _a.tags, id = _a.id;
                ck_channel_name = tags;
                device = Controller_1.default.getDevice(id);
                if (!(device instanceof LanMultiChannelSwitchController_1.default || device instanceof CloudMultiChannelSwitchController_1.default || device instanceof CloudDualR3Controller_1.default)) return [3 /*break*/, 2];
                ck_channel_name = __assign(__assign({}, device.channelName), ck_channel_name);
                return [4 /*yield*/, ckApi_1.updateChannelNameAPI(id, {
                        ck_channel_name: ck_channel_name,
                    })];
            case 1:
                error = (_b.sent()).error;
                if (error === 0) {
                    res.json({
                        error: 0,
                        data: null,
                    });
                    device.channelName = ck_channel_name;
                    eventBus_1.default.emit('sse');
                    return [2 /*return*/];
                }
                else {
                    res.json({
                        error: error,
                        data: null,
                    });
                }
                _b.label = 2;
            case 2:
                res.json({
                    error: 500,
                    data: null,
                });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                console.log('Jia ~ file: devices.ts ~ line 71 ~ disableDevice ~ err', err_3);
                res.json({
                    error: 500,
                    data: null,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateChannelName = updateChannelName;
var proxy2ws = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, apikey, id, params, result, error, device, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, apikey = _a.apikey, id = _a.id, params = _a.params;
                console.log('Jia ~ file: devices.ts ~ line 259 ~ proxy2ws ~ params', params);
                return [4 /*yield*/, coolkit_ws_1.default.updateThing({
                        ownerApikey: apikey,
                        deviceid: id,
                        params: params,
                    })];
            case 1:
                result = _b.sent();
                console.log('Jia ~ file: devices.ts ~ line 222 ~ proxy2ws ~ result', result);
                error = result.error;
                if (error === 0) {
                    res.json({
                        error: 0,
                        data: result,
                    });
                    device = Controller_1.default.getDevice(id);
                    if (device instanceof CloudDeviceController_1.default || device instanceof LanDeviceController_1.default) {
                        device.params = mergeDeviceParams_1.default(device.params, params);
                        device.online = true;
                    }
                    if (device instanceof CloudSwitchController_1.default || device instanceof CloudTandHModificationController_1.default) {
                        // 同步到HA
                        device.updateState(device.params.switch);
                    }
                    if (device instanceof CloudPowerDetectionSwitchController_1.default) {
                        // 同步到HA
                        device.updateState({
                            status: device.params.switch,
                        });
                    }
                    if (device instanceof CloudMultiChannelSwitchController_1.default || device instanceof CloudDualR3Controller_1.default) {
                        // 同步到HA
                        device.updateState(device.params.switches);
                    }
                    eventBus_1.default.emit('sse');
                }
                else {
                    res.json({
                        error: error,
                        data: result,
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _b.sent();
                res.json({
                    error: 500,
                    data: null,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.proxy2ws = proxy2ws;
var getOTAinfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var list, _a, error, data, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                list = req.body.list;
                console.log('Jia ~ file: devices.ts ~ line 246 ~ getOTAinfo ~ list', list);
                return [4 /*yield*/, ckApi_1.getOTAinfoAPI(list)];
            case 1:
                _a = _b.sent(), error = _a.error, data = _a.data;
                if (error === 0) {
                    res.json({
                        error: 0,
                        data: data,
                    });
                }
                else {
                    res.json({
                        error: error,
                        data: null,
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                err_5 = _b.sent();
                res.json({
                    error: 500,
                    data: null,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOTAinfo = getOTAinfo;
var upgradeDevice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, apikey, id, params, result, error, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, apikey = _a.apikey, id = _a.id, params = _a.params;
                return [4 /*yield*/, coolkit_ws_1.default.upgradeThing({
                        ownerApikey: apikey,
                        deviceid: id,
                        params: params,
                    })];
            case 1:
                result = _b.sent();
                console.log('Jia ~ file: devices.ts ~ line 275 ~ upgradeDevice ~ result', result);
                error = result.error;
                if (error === 0) {
                    res.json({
                        error: 0,
                        data: null,
                    });
                }
                else {
                    res.json({
                        error: error,
                        data: null,
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                err_6 = _b.sent();
                res.json({
                    error: 500,
                    data: null,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.upgradeDevice = upgradeDevice;
var updateDiyDevice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, type, id, params, device, result, reqParams, err_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, type = _a.type, id = _a.id, params = _a.params;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 11, , 12]);
                device = Controller_1.default.getDevice(id);
                if (!(device instanceof DiyDeviceController_1.default)) return [3 /*break*/, 10];
                result = void 0;
                reqParams = __assign({ deviceid: id, ip: device.ip, port: device.port }, params);
                console.log('Jia ~ file: devices.ts ~ line 366 ~ updateDiyDevice ~ reqParams', reqParams);
                if (!(type === 'switch')) return [3 /*break*/, 3];
                return [4 /*yield*/, diyDeviceApi_1.updateDiySwitchAPI(reqParams)];
            case 2:
                result = _b.sent();
                _b.label = 3;
            case 3:
                if (!(type === 'startup')) return [3 /*break*/, 5];
                return [4 /*yield*/, diyDeviceApi_1.updateDiyStartupAPI(reqParams)];
            case 4:
                result = _b.sent();
                _b.label = 5;
            case 5:
                if (!(type === 'pulse')) return [3 /*break*/, 7];
                return [4 /*yield*/, diyDeviceApi_1.updateDiyPulseAPI(reqParams)];
            case 6:
                result = _b.sent();
                _b.label = 7;
            case 7:
                if (!(type === 'sledOnline')) return [3 /*break*/, 9];
                return [4 /*yield*/, diyDeviceApi_1.updateDiySledOnlineAPI(reqParams)];
            case 8:
                result = _b.sent();
                _b.label = 9;
            case 9:
                console.log('Jia ~ file: devices.ts ~ line 381 ~ updateDiyDevice ~ result', result);
                if (result && result.error === 0) {
                    res.json({
                        error: 0,
                        data: null,
                    });
                }
                else {
                    res.json({
                        error: result.error,
                        data: null,
                    });
                }
                _b.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                err_7 = _b.sent();
                res.json({
                    error: 500,
                    data: null,
                });
                Controller_1.default.deviceMap.delete(id);
                eventBus_1.default.emit('sse');
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.updateDiyDevice = updateDiyDevice;
var removeDiyDevice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, diyDevices, code;
    return __generator(this, function (_a) {
        try {
            id = req.body.id;
            diyDevices = dataUtil_1.getDataSync('diy.json', []);
            code = dataUtil_1.saveData('diy.json', JSON.stringify(lodash_1.default.omit(diyDevices, [id])));
            if (code) {
                res.json({
                    error: 0,
                    data: null,
                });
            }
            else {
                res.json({
                    error: 500,
                    data: null,
                });
            }
        }
        catch (err) {
            res.json({
                error: 500,
                data: null,
            });
        }
        return [2 /*return*/];
    });
}); };
exports.removeDiyDevice = removeDiyDevice;
// 更改恒温恒湿设备的温度单位
var changeUnit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, unit, device, code, err_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, id = _a.id, unit = _a.unit;
                device = Controller_1.default.getDevice(id);
                if (!(device instanceof CloudTandHModificationController_1.default)) return [3 /*break*/, 2];
                return [4 /*yield*/, modifyDeviceStatus_1.changeDeviceUnit(id, unit)];
            case 1:
                code = _b.sent();
                if (code === 0) {
                    res.json({
                        error: 0,
                        data: null,
                    });
                    device.unit = unit;
                }
                else {
                    res.json({
                        error: 500,
                        data: null,
                    });
                }
                eventBus_1.default.emit('sse');
                return [3 /*break*/, 3];
            case 2:
                res.json({
                    error: 402,
                    data: null,
                    msg: 'not such device',
                });
                _b.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_8 = _b.sent();
                res.json({
                    error: 500,
                    data: null,
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.changeUnit = changeUnit;
// 设置功率检查插座 & DualR3费率
var setRate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, rate, device, code, err_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, id = _a.id, rate = _a.rate;
                device = Controller_1.default.getDevice(id);
                if (!(device instanceof CloudPowerDetectionSwitchController_1.default || device instanceof CloudDualR3Controller_1.default)) return [3 /*break*/, 2];
                return [4 /*yield*/, modifyDeviceStatus_1.setDeviceRate(id, rate)];
            case 1:
                code = _b.sent();
                if (code === 0) {
                    res.json({
                        error: 0,
                        data: null,
                    });
                    device.rate = rate;
                }
                else {
                    res.json({
                        error: 500,
                        data: null,
                    });
                }
                eventBus_1.default.emit('sse');
                return [3 /*break*/, 3];
            case 2:
                res.json({
                    error: 402,
                    data: null,
                    msg: 'not such device',
                });
                _b.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_9 = _b.sent();
                res.json({
                    error: 500,
                    data: null,
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.setRate = setRate;
