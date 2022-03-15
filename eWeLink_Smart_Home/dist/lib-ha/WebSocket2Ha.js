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
exports.WebSocket2Ha = exports.getEntityTypeById = void 0;
var ws_1 = __importDefault(require("ws"));
var lodash_1 = __importDefault(require("lodash"));
var init_1 = require("./init");
var protocols_1 = require("./protocols");
var coolkit_api_device_1 = __importDefault(require("coolkit-api-device"));
var coolkit_ws_device_1 = __importDefault(require("coolkit-ws-device"));
var process_1 = __importDefault(require("process"));
var ENTITY_TYPE_ALLOW_LIST = ['switch', 'light'];
function allowedEntityType(entityType) {
    return ENTITY_TYPE_ALLOW_LIST.includes(entityType);
}
function getEntityTypeById(entityId) {
    return entityId.split('.')[0];
}
exports.getEntityTypeById = getEntityTypeById;
function entityStateFilter(states) {
    var result = [];
    for (var i = 0; i < states.length; i++) {
        var entityType = getEntityTypeById(states[i]['entity_id']);
        if (allowedEntityType(entityType)) {
            result.push(states[i]);
        }
    }
    return result;
}
function entityFilter(list, states) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var entityType = getEntityTypeById(list[i]['entity_id']);
        var deviceId = list[i]['device_id'];
        var entityState = lodash_1.default.find(states, { 'entity_id': list[i]['entity_id'] });
        if (allowedEntityType(entityType) && deviceId && entityState.state !== 'unavailable') {
            result.push(list[i]);
        }
    }
    return result;
}
function getHaDeviceDataById(deviceList, id) {
    for (var i = 0; i < deviceList.length; i++) {
        for (var j = 0; j < deviceList[i].haDeviceData.entities.length; j++) {
            if (deviceList[i].haDeviceData.entities[j].entityId === id) {
                return deviceList[i];
            }
        }
    }
    return null;
}
var WebSocket2Ha = (function () {
    function WebSocket2Ha() {
        this.wsUrl = '';
        this.connected = false;
        this.cmdId = 1;
        this.msgQueue = [];
        this.wsUrl = 'http://supervisor/core/websocket';
        this.connect();
        this.msgQueueTimerId = setInterval(this.shrinkQueue.bind(this), 10000);
    }
    WebSocket2Ha.prototype.connect = function () {
        var ws = new ws_1.default(this.wsUrl);
        this.ws = ws;
        ws.on('open', this.handleOpen.bind(this));
        ws.on('close', this.handleClose.bind(this));
        ws.on('error', this.handleError.bind(this));
        ws.on('message', this.handleMessage.bind(this));
    };
    WebSocket2Ha.prototype.handleOpen = function () {
        console.log('WebSocket2Ha connecting...');
    };
    WebSocket2Ha.prototype.handleClose = function () {
        console.log('WebSocket2Ha will close');
        this.ws.removeEventListener('open');
        this.ws.removeEventListener('close');
        this.ws.removeEventListener('error');
        this.ws.removeEventListener('message');
        clearInterval(this.msgQueueTimerId);
    };
    WebSocket2Ha.prototype.handleError = function (err) {
        console.error('WebSocket2Ha error:', err);
    };
    WebSocket2Ha.prototype.handleMessage = function (msg) {
        try {
            var data = JSON.parse(msg);
            switch (data.type) {
                case 'auth_required':
                    var resMsg = {
                        type: 'auth',
                        access_token: process_1.default.env.SUPERVISOR_TOKEN,
                    };
                    this.ws.send(JSON.stringify(resMsg));
                    break;
                case 'auth_ok':
                    this.connected = true;
                    console.log('WebSocket2Ha connect success');
                    this.subscribeEvents('state_changed');
                    this.heartBeat();
                    break;
                case 'result':
                    var success = data.success, result = data.result, id = data.id;
                    var found = lodash_1.default.find(this.msgQueue, { id: id });
                    if (success && found) {
                        this.pushResult(id, result);
                    }
                    break;
                case 'event':
                    if (data.event.event_type === 'state_changed') {
                        this.handleHaStateChangedEvent(data);
                    }
                    break;
                default:
                    break;
            }
        }
        catch (err) {
            console.error('WebSocket2Ha error:', err);
        }
    };
    WebSocket2Ha.prototype.heartBeat = function () {
        var _this = this;
        setInterval(function () {
            _this.sendMessage({
                id: _this.cmdId++,
                type: 'ping'
            });
        }, 10000);
    };
    WebSocket2Ha.prototype.handleHaStateChangedEvent = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var entityId, gwInList, syncDeviceData, deviceList, deviceData, subDeviceListRes, subDeviceList, oldState, i, newState, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entityId = e.event.data.entity_id;
                        if (!init_1.curUserGwData) {
                            return [2];
                        }
                        gwInList = init_1.curUserGwData.gwInList, syncDeviceData = init_1.curUserGwData.syncDeviceData;
                        if (!(gwInList && syncDeviceData && allowedEntityType(getEntityTypeById(entityId)))) return [3, 2];
                        deviceList = syncDeviceData.filter(function (item) { return item.syncState && item.ckDeviceData; });
                        deviceData = getHaDeviceDataById(deviceList, entityId);
                        if (!deviceData) {
                            return [2, -1];
                        }
                        return [4, coolkit_api_device_1.default.getGateWayAndSubDevice()];
                    case 1:
                        subDeviceListRes = _a.sent();
                        if (subDeviceListRes.error !== 0) {
                            return [2, -1];
                        }
                        subDeviceList = subDeviceListRes.data.subDevicesInfo;
                        oldState = null;
                        for (i = 0; i < subDeviceList.length; i++) {
                            if (subDeviceList[i].itemData.deviceid === deviceData.ckDeviceData.deviceid) {
                                oldState = subDeviceList[i].itemData.params;
                                break;
                            }
                        }
                        if (!oldState) {
                            return [2, -1];
                        }
                        newState = e.event.data.new_state;
                        params = protocols_1.getDeviceUpdateParams(deviceData, oldState, newState);
                        if (!params) {
                            return [2, -1];
                        }
                        if (lodash_1.default.get(init_1.ws2ckRes, 'error') === 0) {
                            coolkit_ws_device_1.default.sendMessage(JSON.stringify({
                                action: 'update',
                                apikey: init_1.curUserGwData.userApiKey,
                                deviceid: deviceData.ckDeviceData.deviceid,
                                userAgent: 'device',
                                params: params
                            }));
                        }
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    WebSocket2Ha.prototype.sendMessage = function (data) {
        this.ws.send(JSON.stringify(__assign({ id: this.cmdId++ }, data)));
    };
    WebSocket2Ha.prototype.subscribeEvents = function (eventType) {
        var msg = {
            type: 'subscribe_events',
            event_type: eventType,
            id: this.cmdId++
        };
        this.ws.send(JSON.stringify(msg));
    };
    WebSocket2Ha.prototype.enMsgQueue = function (id, type) {
        this.msgQueue.push({
            id: id,
            type: type,
            createdTime: Date.now(),
            done: false
        });
    };
    WebSocket2Ha.prototype.pushResult = function (id, result) {
        var i = lodash_1.default.findIndex(this.msgQueue, { id: id });
        if (i !== -1) {
            this.msgQueue[i].result = result;
            this.msgQueue[i].done = true;
        }
    };
    WebSocket2Ha.prototype.shrinkQueue = function () {
        this.msgQueue = this.msgQueue.filter(function (msg) { return msg.done && (Date.now() > msg.createdTime + 10000); });
    };
    WebSocket2Ha.prototype.getHaData = function (type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var id = _this.cmdId++;
            _this.enMsgQueue(id, type);
            _this.ws.send(JSON.stringify({ id: id, type: type }));
            var retryTimes = 40;
            var timerId = setInterval(function () {
                if (retryTimes > 0) {
                    retryTimes--;
                    var found = lodash_1.default.find(_this.msgQueue, { id: id });
                    if (found === null || found === void 0 ? void 0 : found.result) {
                        clearInterval(timerId);
                        resolve(found.result);
                    }
                }
                else {
                    clearInterval(timerId);
                    resolve(-1);
                }
            }, 500);
        });
    };
    WebSocket2Ha.prototype.getEntityStates = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getHaData('get_states')];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    WebSocket2Ha.prototype.getConfigDeviceRegistryList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getHaData('config/device_registry/list')];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    WebSocket2Ha.prototype.getConfigEntityRegistryList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getHaData('config/entity_registry/list')];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    WebSocket2Ha.prototype.getHaDeviceEntityMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, entityStatesRes, entityStateList, deviceRes, deviceList, entityRes, entityList, i, device, deviceId, entityId, entityState, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        return [4, this.getEntityStates()];
                    case 1:
                        entityStatesRes = _a.sent();
                        if (entityStatesRes === -1) {
                            return [2, result];
                        }
                        entityStateList = entityStateFilter(entityStatesRes);
                        return [4, this.getConfigDeviceRegistryList()];
                    case 2:
                        deviceRes = _a.sent();
                        if (deviceRes === -1) {
                            return [2, result];
                        }
                        deviceList = deviceRes;
                        return [4, this.getConfigEntityRegistryList()];
                    case 3:
                        entityRes = _a.sent();
                        if (entityRes === -1) {
                            return [2, result];
                        }
                        entityList = entityFilter(entityRes, entityStateList);
                        for (i = 0; i < entityList.length; i++) {
                            device = lodash_1.default.find(deviceList, { id: entityList[i]['device_id'] });
                            deviceId = device['id'];
                            entityId = entityList[i]['entity_id'];
                            entityState = lodash_1.default.find(entityStateList, { entity_id: entityId });
                            index = lodash_1.default.findIndex(result, { deviceId: deviceId });
                            if (index === -1) {
                                result.push({
                                    deviceId: deviceId,
                                    deviceData: device,
                                    entities: [{ entityId: entityId, entityData: entityList[i], entityState: entityState }]
                                });
                            }
                            else {
                                result[index].entities.push({ entityId: entityId, entityData: entityList[i], entityState: entityState });
                            }
                        }
                        return [2, result];
                }
            });
        });
    };
    return WebSocket2Ha;
}());
exports.WebSocket2Ha = WebSocket2Ha;
