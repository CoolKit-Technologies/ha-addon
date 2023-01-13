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
exports.updateElectricRate = exports.getDevTempHumHistory = exports.updateLanDevice = exports.setRate = exports.changeUnit = exports.removeDiyDevice = exports.updateDiyDevice = exports.upgradeDevice = exports.getOTAinfo = exports.proxy2ws = exports.updateChannelName = exports.updateDeviceName = exports.disableDevice = exports.getDeviceById = exports.getDevices = void 0;
var lodash_1 = __importDefault(require("lodash"));
var coolkit_ws_1 = __importDefault(require("coolkit-ws"));
var eventBus_1 = __importDefault(require("../utils/eventBus"));
var initMdns_1 = __importDefault(require("../utils/initMdns"));
var Controller_1 = __importDefault(require("../controller/Controller"));
var syncDevice2Ha_1 = __importDefault(require("../utils/syncDevice2Ha"));
var dataUtil_1 = require("../utils/dataUtil");
var mergeDeviceParams_1 = __importDefault(require("../utils/mergeDeviceParams"));
var DiyDeviceController_1 = __importDefault(require("../controller/DiyDeviceController"));
var updateDiyDeviceName_1 = __importDefault(require("../utils/updateDiyDeviceName"));
var removeEntityByDevice_1 = __importDefault(require("../utils/removeEntityByDevice"));
var LanSwitchController_1 = __importDefault(require("../controller/LanSwitchController"));
var LanDualR3Controller_1 = __importDefault(require("../controller/LanDualR3Controller"));
var LanDeviceController_1 = __importDefault(require("../controller/LanDeviceController"));
var CloudDeviceController_1 = __importDefault(require("../controller/CloudDeviceController"));
var CloudDualR3Controller_1 = __importDefault(require("../controller/CloudDualR3Controller"));
var CloudSwitchController_1 = __importDefault(require("../controller/CloudSwitchController"));
var formatDevice_1 = require("../utils/formatDevice");
var ckApi_1 = require("../apis/ckApi");
var LanTandHModificationController_1 = __importDefault(require("../controller/LanTandHModificationController"));
var LanMultiChannelSwitchController_1 = __importDefault(require("../controller/LanMultiChannelSwitchController"));
var CloudTandHModificationController_1 = __importDefault(require("../controller/CloudTandHModificationController"));
var CloudMultiChannelSwitchController_1 = __importDefault(require("../controller/CloudMultiChannelSwitchController"));
var modifyDeviceStatus_1 = require("../utils/modifyDeviceStatus");
var CloudPowerDetectionSwitchController_1 = __importDefault(require("../controller/CloudPowerDetectionSwitchController"));
var diyDeviceApi_1 = require("../apis/diyDeviceApi");
var LanPowerDetectionSwitchController_1 = __importDefault(require("../controller/LanPowerDetectionSwitchController"));
var LanRFBridgeController_1 = __importDefault(require("../controller/LanRFBridgeController"));
var CloudRFBridgeController_1 = __importDefault(require("../controller/CloudRFBridgeController"));
var CloudUIID44Controller_1 = __importDefault(require("../controller/CloudUIID44Controller"));
var CloudUIID34Controller_1 = __importDefault(require("../controller/CloudUIID34Controller"));
var LanUIID34Controller_1 = __importDefault(require("../controller/LanUIID34Controller"));
var logger_1 = require("../utils/logger");
var CloudZigbeeMultiSwitchController_1 = __importDefault(require("../controller/CloudZigbeeMultiSwitchController"));
var CloudZigbeeDoubleColorBulbController_1 = __importDefault(require("../controller/CloudZigbeeDoubleColorBulbController"));
var CloudZigbeeFiveColorBulbController_1 = __importDefault(require("../controller/CloudZigbeeFiveColorBulbController"));
var CloudUIID181Controller_1 = __importDefault(require("../controller/CloudUIID181Controller"));
var CloudUIID190Controller_1 = __importDefault(require("../controller/CloudUIID190Controller"));
var getThings_1 = __importDefault(require("../utils/getThings"));
var CloudUIID130Controller_1 = __importDefault(require("../controller/CloudUIID130Controller"));
var CloudUIID137Controller_1 = __importDefault(require("../controller/CloudUIID137Controller"));
var CloudUIID173Controller_1 = __importDefault(require("../controller/CloudUIID173Controller"));
var CloudUIID182Controller_1 = __importDefault(require("../controller/CloudUIID182Controller"));
var mdns = (0, initMdns_1.default)();
var getDevTempHumHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, deviceid, last, format, data, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, deviceid = _a.deviceid, last = _a.last, format = _a.format;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4, (0, ckApi_1.getTempHumHistory)(deviceid, last, format)];
            case 2:
                data = _b.sent();
                res.json({
                    error: 0,
                    data: data.data
                });
                return [3, 4];
            case 3:
                err_1 = _b.sent();
                logger_1.logger.error("getDevTempHumHistory error", err_1);
                res.json({
                    error: 500,
                    data: null
                });
                return [3, 4];
            case 4: return [2];
        }
    });
}); };
exports.getDevTempHumHistory = getDevTempHumHistory;
var getDevices = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var type, refresh, data, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                type = req.query.type;
                refresh = req.body.refresh;
                if (type === undefined) {
                    res.json({
                        error: 401,
                        data: null,
                    });
                }
                if (!refresh) return [3, 2];
                return [4, (0, syncDevice2Ha_1.default)({
                        syncLovelace: false,
                        sleepTime: 2000,
                    })];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [4, (0, getThings_1.default)()];
            case 3:
                _a.sent();
                data = (0, formatDevice_1.getFormattedDeviceList)();
                res.json({
                    error: 0,
                    data: data,
                });
                return [3, 5];
            case 4:
                err_2 = _a.sent();
                logger_1.logger.error("getDevices error: ".concat(err_2));
                res.json({
                    error: 500,
                    data: null,
                });
                return [3, 5];
            case 5: return [2];
        }
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
                data: (0, formatDevice_1.formatDevice)(device),
            });
        }
        catch (err) {
            logger_1.logger.error("getDeviceById error: ".concat(err));
            res.json({
                error: 500,
                data: null,
            });
        }
        return [2];
    });
}); };
exports.getDeviceById = getDeviceById;
var disableDevice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, disabled, id, device, error, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, disabled = _a.disabled, id = _a.id;
                device = Controller_1.default.getDevice(id);
                if (!device) {
                    res.json({
                        error: 402,
                        msg: 'not such device',
                    });
                }
                device.disabled = disabled;
                return [4, (0, modifyDeviceStatus_1.modifyDeviceStatus)(id, disabled)];
            case 1:
                error = _b.sent();
                if (device && disabled) {
                    (0, removeEntityByDevice_1.default)(device);
                }
                if (!!disabled) return [3, 3];
                return [4, (0, syncDevice2Ha_1.default)({
                        syncLovelace: false,
                        sleepTime: 2000,
                    })];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                if (error === 0) {
                    res.json({
                        error: 0,
                        data: null,
                    });
                    eventBus_1.default.emit('sse');
                }
                else {
                    res.json({
                        error: 500,
                        data: null,
                    });
                }
                return [3, 5];
            case 4:
                err_3 = _b.sent();
                logger_1.logger.error("disableDevice error: ".concat(err_3));
                res.json({
                    error: 500,
                    data: null,
                });
                return [3, 5];
            case 5: return [2];
        }
    });
}); };
exports.disableDevice = disableDevice;
var updateDeviceName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, newName, id, device, error, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, newName = _a.newName, id = _a.id;
                device = Controller_1.default.getDevice(id);
                if (!(device instanceof CloudDeviceController_1.default || device instanceof LanDeviceController_1.default)) return [3, 2];
                return [4, (0, ckApi_1.updateDeviceNameAPI)(id, newName)];
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
                    logger_1.logger.warn("updateDeviceName error, deviceid: ".concat(id, ", error: ").concat(error));
                    res.json({
                        error: error,
                        data: null,
                    });
                }
                return [3, 3];
            case 2:
                res.json({
                    error: 402,
                    msg: 'not such device',
                });
                _b.label = 3;
            case 3: return [3, 5];
            case 4:
                err_4 = _b.sent();
                logger_1.logger.error("updateDeviceName error: ".concat(err_4));
                res.json({
                    error: 500,
                    data: null,
                });
                return [3, 5];
            case 5: return [2];
        }
    });
}); };
exports.updateDeviceName = updateDeviceName;
var updateChannelName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, tags, id, ck_channel_name, device, error, error, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, tags = _a.tags, id = _a.id;
                ck_channel_name = tags;
                device = Controller_1.default.getDevice(id);
                if (!(device instanceof LanMultiChannelSwitchController_1.default ||
                    device instanceof CloudMultiChannelSwitchController_1.default ||
                    device instanceof CloudDualR3Controller_1.default ||
                    device instanceof LanDualR3Controller_1.default ||
                    device instanceof CloudZigbeeMultiSwitchController_1.default ||
                    device instanceof LanSwitchController_1.default ||
                    device instanceof CloudUIID130Controller_1.default)) return [3, 2];
                ck_channel_name = __assign(__assign({}, device.channelName), ck_channel_name);
                return [4, (0, ckApi_1.updateChannelNameAPI)(id, {
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
                    return [2];
                }
                else {
                    res.json({
                        error: error,
                        data: null,
                    });
                }
                _b.label = 2;
            case 2:
                if (!(device instanceof LanRFBridgeController_1.default || device instanceof CloudRFBridgeController_1.default)) return [3, 4];
                return [4, (0, ckApi_1.updateChannelNameAPI)(id, tags)];
            case 3:
                error = (_b.sent()).error;
                if (error === 0) {
                    res.json({
                        error: 0,
                        data: null,
                    });
                    device.tags = tags;
                    eventBus_1.default.emit('sse');
                    return [2];
                }
                else {
                    res.json({
                        error: error,
                        data: null,
                    });
                }
                _b.label = 4;
            case 4:
                res.json({
                    error: 500,
                    data: null,
                });
                return [3, 6];
            case 5:
                err_5 = _b.sent();
                logger_1.logger.error("updateChannelName error: ".concat(err_5));
                res.json({
                    error: 500,
                    data: null,
                });
                return [3, 6];
            case 6: return [2];
        }
    });
}); };
exports.updateChannelName = updateChannelName;
var proxy2ws = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, apikey, id, params, result, error, device, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                logger_1.logger.info('start proxy2ws()');
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                _a = req.body, apikey = _a.apikey, id = _a.id, params = _a.params;
                logger_1.logger.verbose("proxy2ws params: ".concat(JSON.stringify(params)));
                return [4, coolkit_ws_1.default.updateThing({
                        ownerApikey: apikey,
                        deviceid: id,
                        params: params,
                    })];
            case 2:
                result = _b.sent();
                logger_1.logger.verbose("proxy2ws result: ".concat(JSON.stringify(result)));
                error = result.error;
                if (error === 0) {
                    res.json({
                        error: 0,
                        data: result,
                    });
                    device = Controller_1.default.getDevice(id);
                    if (device instanceof CloudDeviceController_1.default || device instanceof LanDeviceController_1.default) {
                        device.params = (0, mergeDeviceParams_1.default)(device.params, params);
                        device.online = true;
                        eventBus_1.default.emit('sse');
                    }
                    if (device instanceof CloudSwitchController_1.default ||
                        device instanceof LanSwitchController_1.default ||
                        device instanceof CloudTandHModificationController_1.default ||
                        device instanceof LanTandHModificationController_1.default) {
                        device.updateState(device.params.switch);
                    }
                    else if (device instanceof CloudPowerDetectionSwitchController_1.default || device instanceof LanPowerDetectionSwitchController_1.default) {
                        device.updateState({
                            status: device.params.switch,
                        });
                    }
                    else if (device instanceof CloudMultiChannelSwitchController_1.default ||
                        device instanceof LanMultiChannelSwitchController_1.default ||
                        device instanceof CloudDualR3Controller_1.default ||
                        device instanceof LanDualR3Controller_1.default ||
                        device instanceof CloudZigbeeMultiSwitchController_1.default ||
                        device instanceof CloudUIID130Controller_1.default ||
                        device instanceof CloudUIID182Controller_1.default) {
                        device.updateState(device.params.switches);
                    }
                    else if (device instanceof CloudUIID34Controller_1.default) {
                        device.updateState(device.params.switches);
                    }
                    else if (device instanceof CloudUIID44Controller_1.default) {
                        device.updateState(device.params);
                    }
                    else if (device instanceof CloudZigbeeDoubleColorBulbController_1.default || device instanceof CloudZigbeeFiveColorBulbController_1.default) {
                        device.updateState(device.params);
                    }
                    else if (device instanceof CloudUIID181Controller_1.default) {
                        device.updateState(device.params.switch);
                    }
                    else if (device instanceof CloudUIID190Controller_1.default) {
                        device.updateState(device.params.switches);
                    }
                    else if (device instanceof CloudUIID137Controller_1.default || device instanceof CloudUIID173Controller_1.default) {
                        device.updateState(device.params);
                    }
                }
                else {
                    logger_1.logger.warn("call proxy2ws failed, error: ".concat(error));
                    res.json({
                        error: error,
                        data: result,
                    });
                }
                return [3, 4];
            case 3:
                err_6 = _b.sent();
                logger_1.logger.error('call proxy2ws() error', err_6);
                res.json({
                    error: 500,
                    data: null,
                });
                return [3, 4];
            case 4: return [2];
        }
    });
}); };
exports.proxy2ws = proxy2ws;
var getOTAinfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var list, _a, error, data, err_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                list = req.body.list;
                logger_1.logger.verbose("getOTAinfo list: ".concat(JSON.stringify(list)));
                return [4, (0, ckApi_1.getOTAinfoAPI)(list)];
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
                return [3, 3];
            case 2:
                err_7 = _b.sent();
                res.json({
                    error: 500,
                    data: null,
                });
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
exports.getOTAinfo = getOTAinfo;
var upgradeDevice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, apikey, id, params, result, error, err_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, apikey = _a.apikey, id = _a.id, params = _a.params;
                return [4, coolkit_ws_1.default.upgradeThing({
                        ownerApikey: apikey,
                        deviceid: id,
                        params: params,
                    })];
            case 1:
                result = _b.sent();
                logger_1.logger.verbose("upgradeDevice result: ".concat(JSON.stringify(result)));
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
                return [3, 3];
            case 2:
                err_8 = _b.sent();
                res.json({
                    error: 500,
                    data: null,
                });
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
exports.upgradeDevice = upgradeDevice;
var updateDiyDevice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, type, id, params, device, result, reqParams, err_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, type = _a.type, id = _a.id, params = _a.params;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 13, , 14]);
                device = Controller_1.default.getDevice(id);
                if (!(device instanceof DiyDeviceController_1.default)) return [3, 12];
                result = void 0;
                reqParams = __assign({ deviceid: id, ip: device.ip, port: device.port }, params);
                logger_1.logger.verbose("updateDiyDevice reqParams: ".concat(JSON.stringify(reqParams)));
                if (!(type === 'switch')) return [3, 3];
                return [4, (0, diyDeviceApi_1.updateDiySwitchAPI)(reqParams)];
            case 2:
                result = _b.sent();
                return [3, 11];
            case 3:
                if (!(type === 'startup')) return [3, 5];
                return [4, (0, diyDeviceApi_1.updateDiyStartupAPI)(reqParams)];
            case 4:
                result = _b.sent();
                return [3, 11];
            case 5:
                if (!(type === 'pulse')) return [3, 7];
                return [4, (0, diyDeviceApi_1.updateDiyPulseAPI)(reqParams)];
            case 6:
                result = _b.sent();
                return [3, 11];
            case 7:
                if (!(type === 'sledOnline')) return [3, 9];
                return [4, (0, diyDeviceApi_1.updateDiySledOnlineAPI)(reqParams)];
            case 8:
                result = _b.sent();
                return [3, 11];
            case 9:
                if (!(type === 'deviceName')) return [3, 11];
                return [4, (0, updateDiyDeviceName_1.default)(id, params)];
            case 10:
                result = _b.sent();
                _b.label = 11;
            case 11:
                logger_1.logger.verbose("updateDiyDevice result: ".concat(JSON.stringify(result)));
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
                _b.label = 12;
            case 12: return [3, 14];
            case 13:
                err_9 = _b.sent();
                res.json({
                    error: 500,
                    data: null,
                });
                return [3, 14];
            case 14: return [2];
        }
    });
}); };
exports.updateDiyDevice = updateDiyDevice;
var updateLanDevice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, params, device, result, _b, _c, err_10;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, id = _a.id, params = _a.params;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 19, , 20]);
                device = Controller_1.default.getDevice(id);
                if (!(device instanceof LanDeviceController_1.default)) return [3, 17];
                result = void 0;
                if (!(device instanceof LanSwitchController_1.default)) return [3, 3];
                return [4, device.setSwitch(params.switch)];
            case 2:
                result = _d.sent();
                _d.label = 3;
            case 3:
                if (!(device instanceof LanMultiChannelSwitchController_1.default || device instanceof LanDualR3Controller_1.default)) return [3, 5];
                return [4, device.setSwitch(params.switches)];
            case 4:
                result = _d.sent();
                _d.label = 5;
            case 5:
                if (!(device instanceof LanTandHModificationController_1.default)) return [3, 7];
                return [4, device.setSwitch(params.switch)];
            case 6:
                result = _d.sent();
                _d.label = 7;
            case 7:
                if (!(device instanceof LanPowerDetectionSwitchController_1.default)) return [3, 9];
                return [4, device.setSwitch(params.switch)];
            case 8:
                result = _d.sent();
                _d.label = 9;
            case 9:
                if (!(device instanceof LanRFBridgeController_1.default)) return [3, 11];
                return [4, device.transmitRfChl(params)];
            case 10:
                result = _d.sent();
                _d.label = 11;
            case 11:
                if (!(device instanceof LanUIID34Controller_1.default)) return [3, 16];
                _b = params.fan;
                if (!_b) return [3, 13];
                return [4, device.setFan(params)];
            case 12:
                _b = (result = _d.sent());
                _d.label = 13;
            case 13:
                _b;
                _c = params.light;
                if (!_c) return [3, 15];
                return [4, device.toggleLight(params)];
            case 14:
                _c = (result = _d.sent());
                _d.label = 15;
            case 15:
                _c;
                _d.label = 16;
            case 16:
                if (result === 0) {
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
                return [3, 18];
            case 17:
                res.json({
                    error: 402,
                    msg: 'not such device',
                    data: null,
                });
                _d.label = 18;
            case 18: return [3, 20];
            case 19:
                err_10 = _d.sent();
                res.json({
                    error: 500,
                    data: null,
                });
                return [3, 20];
            case 20: return [2];
        }
    });
}); };
exports.updateLanDevice = updateLanDevice;
var removeDiyDevice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, diyDevices, code, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.body.id;
                diyDevices = (0, dataUtil_1.getDataSync)('diy.json', []);
                return [4, (0, dataUtil_1.saveData)('diy.json', JSON.stringify(lodash_1.default.omit(diyDevices, [id])))];
            case 1:
                code = _a.sent();
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
                return [3, 3];
            case 2:
                err_11 = _a.sent();
                res.json({
                    error: 500,
                    data: null,
                });
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
exports.removeDiyDevice = removeDiyDevice;
var changeUnit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, unit, device, code, err_12;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, id = _a.id, unit = _a.unit;
                device = Controller_1.default.getDevice(id);
                if (!(device instanceof CloudTandHModificationController_1.default || device instanceof LanTandHModificationController_1.default)) return [3, 2];
                return [4, (0, modifyDeviceStatus_1.changeDeviceUnit)(id, unit)];
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
                return [3, 3];
            case 2:
                res.json({
                    error: 402,
                    data: null,
                    msg: 'not such device',
                });
                _b.label = 3;
            case 3: return [3, 5];
            case 4:
                err_12 = _b.sent();
                res.json({
                    error: 500,
                    data: null,
                });
                return [3, 5];
            case 5: return [2];
        }
    });
}); };
exports.changeUnit = changeUnit;
var setRate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, rate, device, code, err_13;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, id = _a.id, rate = _a.rate;
                device = Controller_1.default.getDevice(id);
                if (!(device instanceof CloudPowerDetectionSwitchController_1.default ||
                    device instanceof CloudDualR3Controller_1.default ||
                    device instanceof LanPowerDetectionSwitchController_1.default ||
                    device instanceof LanDualR3Controller_1.default)) return [3, 2];
                return [4, (0, modifyDeviceStatus_1.setDeviceRate)(id, rate)];
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
                return [3, 3];
            case 2:
                res.json({
                    error: 402,
                    data: null,
                    msg: 'not such device',
                });
                _b.label = 3;
            case 3: return [3, 5];
            case 4:
                err_13 = _b.sent();
                res.json({
                    error: 500,
                    data: null,
                });
                return [3, 5];
            case 5: return [2];
        }
    });
}); };
exports.setRate = setRate;
var updateElectricRate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, tags, resp, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, id = _a.id, tags = _a.tags;
                return [4, (0, ckApi_1.updateDeviceTags)({ id: id, tags: tags })];
            case 1:
                resp = _b.sent();
                if (resp.error === 0) {
                    res.json({
                        error: 0,
                        data: null
                    });
                }
                else {
                    res.json({
                        error: 400,
                        data: null
                    });
                }
                return [3, 3];
            case 2:
                error_1 = _b.sent();
                res.json({
                    error: 500,
                    data: null
                });
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
exports.updateElectricRate = updateElectricRate;
