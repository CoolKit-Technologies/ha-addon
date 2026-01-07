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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncHaDevice2Ck = exports.getHaDeviceList = exports.addHaGateway = void 0;
var coolkit_api_1 = __importDefault(require("coolkit-api"));
var coolkit_api_device_1 = __importDefault(require("coolkit-api-device"));
var init_1 = require("./init");
var app_1 = require("../config/app");
var lodash_1 = __importDefault(require("lodash"));
var dataUtil_1 = require("../utils/dataUtil");
var utils_1 = require("./utils");
var protocols_1 = require("./protocols");
var coolkit_ws_device_1 = __importDefault(require("coolkit-ws-device"));
var process_1 = __importDefault(require("process"));
var logger_1 = require("../utils/logger");
function addHaGateway(uniqueID) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, coolkit_api_1.default.device.addThirdPartyDevice({
                        type: 23,
                        partnerDevice: [{
                                uniqueID: uniqueID
                            }]
                    })];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.addHaGateway = addHaGateway;
function regHaGateway() {
    return __awaiter(this, void 0, void 0, function () {
        var res, apikey, deviceid, region, gwData, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.logger.info('start regHaGateway()');
                    return [4, addHaGateway(init_1.curUserGwData.gwuuid)];
                case 1:
                    res = _a.sent();
                    if (!(res.error === 0)) return [3, 4];
                    apikey = lodash_1.default.get(res.data.thingList[0], 'itemData.devicekey');
                    deviceid = lodash_1.default.get(res.data.thingList[0], 'itemData.deviceid');
                    region = (0, dataUtil_1.getDataSync)('user.json', ['region']);
                    coolkit_api_device_1.default.init({
                        apikey: apikey,
                        appSecret: app_1.appSecret,
                        deviceid: deviceid,
                        region: region,
                        useTestEnv: process_1.default.env.CK_API_ENV === 'test'
                    });
                    init_1.curUserGwData.gwInList = true;
                    init_1.curUserGwData.gwApikey = apikey;
                    init_1.curUserGwData.gwDeviceid = deviceid;
                    return [4, (0, dataUtil_1.getGwData)()];
                case 2:
                    gwData = _a.sent();
                    index = lodash_1.default.findIndex(gwData, { userApiKey: init_1.curUserGwData.userApiKey });
                    gwData[index] = init_1.curUserGwData;
                    return [4, (0, dataUtil_1.setGwData)(gwData)];
                case 3:
                    _a.sent();
                    return [3, 5];
                case 4:
                    logger_1.logger.warn("regHaGateway error: addHaGateway failed");
                    return [2, -1];
                case 5:
                    logger_1.logger.info('end regHaGateway()');
                    return [2];
            }
        });
    });
}
function getHaDeviceList() {
    return __awaiter(this, void 0, void 0, function () {
        var haDeviceList, subDeviceListRes, subDeviceList, result, i, uiid, data, j, result, i, uiid, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.logger.info('start getHaDeviceList()');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4, init_1.ws2ha.getHaDeviceEntityMap()];
                case 2:
                    haDeviceList = _a.sent();
                    if (!init_1.curUserGwData.gwInList) return [3, 4];
                    return [4, coolkit_api_device_1.default.getGateWayAndSubDevice()];
                case 3:
                    subDeviceListRes = _a.sent();
                    if (subDeviceListRes.error !== 0) {
                        logger_1.logger.error('getGatewayAndSubDevice failed');
                        return [2, -1];
                    }
                    subDeviceList = subDeviceListRes.data.subDevicesInfo;
                    result = [];
                    for (i = 0; i < haDeviceList.length; i++) {
                        uiid = (0, utils_1.getHaDeviceUiid)(haDeviceList[i]);
                        if (uiid === -1) {
                            continue;
                        }
                        else {
                            data = {
                                deviceUiid: uiid,
                                deviceNameHa: haDeviceList[i].deviceData.name,
                                deviceNameCk: '',
                                haDeviceId: haDeviceList[i].deviceId,
                                syncState: false,
                                haDeviceData: haDeviceList[i],
                                ckDeviceData: null
                            };
                            for (j = 0; j < subDeviceList.length; j++) {
                                if (subDeviceList[j].itemData.params.uniqueID === haDeviceList[i].deviceId) {
                                    data.deviceNameCk = subDeviceList[j].itemData.name;
                                    data.ckDeviceData = subDeviceList[j].itemData;
                                    data.syncState = true;
                                    break;
                                }
                            }
                            result.push(data);
                        }
                    }
                    if (result.length !== 0) {
                        init_1.curUserGwData.syncDeviceData = result;
                    }
                    return [2, result];
                case 4:
                    result = [];
                    for (i = 0; i < haDeviceList.length; i++) {
                        uiid = (0, utils_1.getHaDeviceUiid)(haDeviceList[i]);
                        if (uiid === -1) {
                            continue;
                        }
                        else {
                            result.push({
                                deviceUiid: uiid,
                                deviceNameHa: haDeviceList[i].deviceData.name,
                                deviceNameCk: '',
                                haDeviceId: haDeviceList[i].deviceId,
                                syncState: false,
                                haDeviceData: haDeviceList[i],
                                ckDeviceData: null
                            });
                        }
                    }
                    if (result.length !== 0) {
                        init_1.curUserGwData.syncDeviceData = result;
                    }
                    logger_1.logger.info('end getHaDeviceList()');
                    return [2, result];
                case 5: return [3, 7];
                case 6:
                    err_1 = _a.sent();
                    logger_1.logger.error("getHaDeviceList error: ".concat(err_1));
                    return [2, -1];
                case 7: return [2];
            }
        });
    });
}
exports.getHaDeviceList = getHaDeviceList;
function syncHaDevice2Ck(states) {
    return __awaiter(this, void 0, void 0, function () {
        var res, i, found, modelId, res, entities, online, params, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.logger.info('start syncHaDevice2Ck()');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 13, , 14]);
                    if (!!init_1.curUserGwData.gwInList) return [3, 3];
                    return [4, regHaGateway()];
                case 2:
                    res = _a.sent();
                    if (res === -1) {
                        return [2, res];
                    }
                    _a.label = 3;
                case 3:
                    if (!(lodash_1.default.get(init_1.ws2ckRes, 'error') !== 0)) return [3, 5];
                    return [4, (0, init_1.initWs2Ck)({
                            apikey: init_1.curUserGwData.gwApikey,
                            region: (0, dataUtil_1.getDataSync)('user.json', ['region']),
                            deviceid: init_1.curUserGwData.gwDeviceid
                        })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i = 0;
                    _a.label = 6;
                case 6:
                    if (!(i < states.length)) return [3, 12];
                    found = lodash_1.default.find(init_1.curUserGwData.syncDeviceData, { haDeviceId: states[i].haDeviceId });
                    modelId = (0, utils_1.getCkDeviceModelIdByUiid)(states[i].deviceUiid);
                    if (!states[i].state) return [3, 9];
                    if (!!found.ckDeviceData) return [3, 8];
                    return [4, coolkit_api_device_1.default.addSubDevice({
                            type: 2,
                            subDevices: [
                                {
                                    name: found.haDeviceData.deviceData.name,
                                    productModelId: modelId,
                                    deviceParams: {
                                        uniqueID: found.haDeviceData.deviceId
                                    }
                                }
                            ]
                        })];
                case 7:
                    res = _a.sent();
                    if (res.error !== 0) {
                        states[i].state = false;
                    }
                    else {
                        entities = found.haDeviceData.entities;
                        online = true;
                        if (entities.some(function (entity) { return entity.entityState.state === 'unavailable'; })) {
                            online = false;
                        }
                        (0, init_1.setCkDeviceOnlineState)({
                            subDevId: found.haDeviceData.deviceId,
                            uiid: found.deviceUiid,
                            deviceid: res.data.thingList[0].itemData.deviceid,
                            online: online
                        });
                        params = (0, protocols_1.initDeviceParams)(found);
                        coolkit_ws_device_1.default.sendMessage(JSON.stringify({
                            action: 'update',
                            apikey: init_1.curUserGwData.userApiKey,
                            deviceid: res.data.thingList[0].itemData.deviceid,
                            userAgent: 'device',
                            params: params
                        }));
                    }
                    return [3, 8];
                case 8: return [3, 11];
                case 9: return [4, coolkit_api_device_1.default.deleteSubDevice(found.ckDeviceData.deviceid)];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11:
                    i++;
                    return [3, 6];
                case 12:
                    logger_1.logger.info('end syncHaDevice2Ck()');
                    return [2, states];
                case 13:
                    err_2 = _a.sent();
                    logger_1.logger.error("syncHaDevice2Ck error: ".concat(err_2));
                    return [2, -1];
                case 14: return [2];
            }
        });
    });
}
exports.syncHaDevice2Ck = syncHaDevice2Ck;
