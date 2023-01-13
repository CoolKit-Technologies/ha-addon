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
exports.setCkDeviceOnlineState = exports.initWs2Ck = exports.ws2ckRes = exports.curUserGwData = exports.ws2ha = exports.init = exports.closeWs2Ck = void 0;
var WebSocket2Ha_1 = require("./WebSocket2Ha");
var dataUtil_1 = require("../utils/dataUtil");
var coolkit_api_1 = __importDefault(require("coolkit-api"));
var coolkit_api_device_1 = __importDefault(require("coolkit-api-device"));
var lodash_1 = __importDefault(require("lodash"));
var app_1 = require("../config/app");
var coolkit_ws_device_1 = __importDefault(require("coolkit-ws-device"));
var protocols_1 = require("./protocols");
var eventBus_1 = __importDefault(require("../utils/eventBus"));
var process_1 = __importDefault(require("process"));
var logger_1 = require("../utils/logger");
var api_1 = require("./api");
var uuid4 = require('uuid').v4;
var WS_ONLINE = 2;
var WS_OFFLINE = 3;
var ws2ha;
exports.ws2ha = ws2ha;
var curUserGwData = null;
exports.curUserGwData = curUserGwData;
var ws2ckRes;
exports.ws2ckRes = ws2ckRes;
function setCkDeviceOnlineState(_a) {
    var subDevId = _a.subDevId, uiid = _a.uiid, deviceid = _a.deviceid, online = _a.online;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            coolkit_ws_device_1.default.sendMessage({
                action: 'subDevice',
                apikey: curUserGwData.userApiKey,
                deviceid: curUserGwData.gwDeviceid,
                userAgent: 'device',
                params: {
                    cmds: [
                        {
                            uiid: uiid,
                            type: online ? WS_ONLINE : WS_OFFLINE,
                            subDevId: subDevId,
                            deviceid: deviceid
                        }
                    ]
                }
            });
            return [2];
        });
    });
}
exports.setCkDeviceOnlineState = setCkDeviceOnlineState;
function handleDeleteGateway() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    exports.curUserGwData = curUserGwData = [];
                    return [4, (0, dataUtil_1.setGwData)([])];
                case 1:
                    _a.sent();
                    closeWs2Ck();
                    init();
                    setTimeout(function () {
                        eventBus_1.default.emit('sse-update-ha-device');
                    }, 1000);
                    return [2];
            }
        });
    });
}
function initWs2Ck(_a) {
    var apikey = _a.apikey, region = _a.region, deviceid = _a.deviceid;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logger_1.logger.info('Init websocket to CK...');
                    logger_1.logger.verbose("apikey: ".concat(apikey));
                    return [4, coolkit_ws_device_1.default.init({
                            userAgent: 'device',
                            apikey: apikey,
                            region: region,
                            deviceid: deviceid,
                            useTestEnv: process_1.default.env.CK_API_ENV === 'test',
                            debug: true
                        })];
                case 1:
                    exports.ws2ckRes = ws2ckRes = _b.sent();
                    coolkit_ws_device_1.default.on('message', function (e) {
                        try {
                            var msg = JSON.parse(e.data);
                            if (msg.action === 'update') {
                                (0, protocols_1.handleCkWsUpdateMessage)(msg);
                            }
                            else if (msg.action === 'notify' && msg.cmd === 'deleteNotify') {
                                handleDeleteGateway();
                            }
                        }
                        catch (err) {
                        }
                    });
                    return [2];
            }
        });
    });
}
exports.initWs2Ck = initWs2Ck;
function closeWs2Ck() {
    if (coolkit_ws_device_1.default.isWsExist()) {
        coolkit_ws_device_1.default.close();
        ws2ckRes.error = -1;
    }
}
exports.closeWs2Ck = closeWs2Ck;
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var userData, userApiKey, gwData, gwuuid, found, data, deviceListRes, deviceList, newGwData, index, i, userGwuuid, apikey, deviceid, region, devList, devList_1, devList_1_1, dev, entities, online, params;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logger_1.logger.info('Start init lib-ha...');
                    if (!lodash_1.default.get(ws2ha, 'connected')) {
                        exports.ws2ha = ws2ha = new WebSocket2Ha_1.WebSocket2Ha();
                    }
                    return [4, (0, dataUtil_1.initLibHaFiles)()];
                case 1:
                    _b.sent();
                    userData = (0, dataUtil_1.getDataSync)('user.json', ['user']);
                    if (!userData) {
                        return [2];
                    }
                    userApiKey = userData.apikey;
                    return [4, (0, dataUtil_1.getGwData)()];
                case 2:
                    gwData = _b.sent();
                    gwuuid = uuid4();
                    if (!!(found = lodash_1.default.find(gwData, { userApiKey: userApiKey }))) return [3, 4];
                    data = {
                        userApiKey: userData.apikey,
                        gwuuid: gwuuid,
                        gwInList: false,
                    };
                    gwData.push(data);
                    exports.curUserGwData = curUserGwData = data;
                    return [4, (0, dataUtil_1.setGwData)(gwData)];
                case 3:
                    _b.sent();
                    return [3, 5];
                case 4:
                    exports.curUserGwData = curUserGwData = found;
                    _b.label = 5;
                case 5: return [4, coolkit_api_1.default.device.getThingList()];
                case 6:
                    deviceListRes = _b.sent();
                    if (deviceListRes.error !== 0) {
                        return [2];
                    }
                    deviceList = deviceListRes.data.thingList;
                    return [4, (0, dataUtil_1.getGwData)()];
                case 7:
                    newGwData = _b.sent();
                    index = lodash_1.default.findIndex(newGwData, { userApiKey: userApiKey });
                    for (i = 0; i < deviceList.length; i++) {
                        userGwuuid = lodash_1.default.get(deviceList[i].itemData, 'params.partnerDevice.ezVedioSerial');
                        if (userGwuuid === newGwData[index].gwuuid) {
                            apikey = lodash_1.default.get(deviceList[i], 'itemData.devicekey');
                            deviceid = lodash_1.default.get(deviceList[i], 'itemData.deviceid');
                            region = (0, dataUtil_1.getDataSync)('user.json', ['region']);
                            coolkit_api_device_1.default.init({
                                apikey: apikey,
                                appSecret: app_1.appSecret,
                                deviceid: deviceid,
                                region: region,
                                useTestEnv: process_1.default.env.CK_API_ENV === 'test'
                            });
                            newGwData[index].gwInList = true;
                            break;
                        }
                        else {
                            newGwData[index].gwInList = false;
                            continue;
                        }
                    }
                    exports.curUserGwData = curUserGwData = newGwData[index];
                    return [4, (0, dataUtil_1.setGwData)(newGwData)];
                case 8:
                    _b.sent();
                    if (!(curUserGwData.gwInList && lodash_1.default.get(ws2ckRes, 'error') !== 0)) return [3, 11];
                    return [4, initWs2Ck({
                            apikey: curUserGwData.gwApikey,
                            region: (0, dataUtil_1.getDataSync)('user.json', ['region']),
                            deviceid: curUserGwData.gwDeviceid
                        })];
                case 9:
                    _b.sent();
                    return [4, (0, api_1.getHaDeviceList)()];
                case 10:
                    devList = _b.sent();
                    if (devList !== -1) {
                        try {
                            for (devList_1 = __values(devList), devList_1_1 = devList_1.next(); !devList_1_1.done; devList_1_1 = devList_1.next()) {
                                dev = devList_1_1.value;
                                if (dev.ckDeviceData) {
                                    entities = dev.haDeviceData.entities;
                                    online = true;
                                    if (entities.some(function (entity) { return entity.entityState.state === 'unavailable'; })) {
                                        online = false;
                                    }
                                    setCkDeviceOnlineState({
                                        subDevId: dev.haDeviceData.deviceId,
                                        uiid: dev.deviceUiid,
                                        deviceid: dev.ckDeviceData.deviceid,
                                        online: online
                                    });
                                    params = (0, protocols_1.initDeviceParams)(dev);
                                    coolkit_ws_device_1.default.sendMessage(JSON.stringify({
                                        action: 'update',
                                        apikey: curUserGwData.userApiKey,
                                        deviceid: dev.ckDeviceData.deviceid,
                                        userAgent: 'device',
                                        params: params
                                    }));
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (devList_1_1 && !devList_1_1.done && (_a = devList_1.return)) _a.call(devList_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    _b.label = 11;
                case 11: return [2];
            }
        });
    });
}
exports.init = init;
