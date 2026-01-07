"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var lodash_1 = __importDefault(require("lodash"));
var lanDeviceApi_1 = require("../apis/lanDeviceApi");
var restApi_1 = require("../apis/restApi");
var EFanPresetModes_1 = __importDefault(require("../ts/enum/EFanPresetModes"));
var mergeDeviceParams_1 = __importDefault(require("../utils/mergeDeviceParams"));
var LanDeviceController_1 = __importDefault(require("./LanDeviceController"));
var LanUIID34Controller = (function (_super) {
    __extends(LanUIID34Controller, _super);
    function LanUIID34Controller(props) {
        var _this = _super.call(this, props) || this;
        _this.uiid = 34;
        var deviceId = props.deviceId;
        _this.entityId = "light.".concat(deviceId);
        return _this;
    }
    return LanUIID34Controller;
}(LanDeviceController_1.default));
LanUIID34Controller.prototype.parseHaData2Lan = function (_a) {
    var entity_id = _a.entity_id, preset_mode = _a.preset_mode, state = _a.state;
    var res = {};
    if (entity_id === this.entityId) {
        res.light = state;
    }
    else {
        if (preset_mode === undefined) {
            var switches = lodash_1.default.get(this, 'params.switches', Array.from({ length: 4 }, function (v, k) { return ({ switch: 'off', outlet: k }); }));
            var lastSpeed = 1;
            if (switches[2].switch === 'on') {
                lastSpeed = 2;
            }
            if (switches[3].switch === 'on') {
                lastSpeed = 3;
            }
            res.fan = state;
            res.speed = lastSpeed;
        }
        else if (preset_mode === EFanPresetModes_1.default.Low) {
            res.fan = 'on';
            res.speed = 1;
        }
        else if (preset_mode === EFanPresetModes_1.default.Medium) {
            res.fan = 'on';
            res.speed = 2;
        }
        else if (preset_mode === EFanPresetModes_1.default.High) {
            res.fan = 'on';
            res.speed = 3;
        }
    }
    return res;
};
LanUIID34Controller.prototype.parseMdnsData2Ck = function (_a) {
    var fan = _a.fan, light = _a.light, speed = _a.speed;
    var res = Array.from({ length: 4 }, function (v, k) { return ({ switch: 'off', outlet: k }); });
    if (light === 'on') {
        res[0].switch = 'on';
    }
    if (fan === 'on') {
        res[1].switch = 'on';
    }
    if (speed === 2) {
        res[2].switch = 'on';
    }
    else if (speed === 3) {
        res[3].switch = 'on';
    }
    return res;
};
LanUIID34Controller.prototype.toggleLight = function (params) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(this.devicekey && this.selfApikey)) return [3, 2];
                    return [4, (0, lanDeviceApi_1.toggleLanLightAPI)({
                            ip: this.ip || this.target,
                            port: this.port,
                            deviceid: this.deviceId,
                            devicekey: this.devicekey,
                            selfApikey: this.selfApikey,
                            data: JSON.stringify(params),
                        })];
                case 1:
                    res = _a.sent();
                    if (lodash_1.default.get(res, ['data', 'error']) === 0) {
                        this.params = (0, mergeDeviceParams_1.default)(this.params, { switches: [{ switch: params.light, outlet: 0 }] });
                        this.updateState(this.params.switches);
                        return [2, 0];
                    }
                    _a.label = 2;
                case 2: return [2, -1];
            }
        });
    });
};
LanUIID34Controller.prototype.setFan = function (params) {
    return __awaiter(this, void 0, void 0, function () {
        var res, tmp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(this.devicekey && this.selfApikey)) return [3, 2];
                    return [4, (0, lanDeviceApi_1.setFanAPI)({
                            ip: this.ip || this.target,
                            port: this.port,
                            deviceid: this.deviceId,
                            devicekey: this.devicekey,
                            selfApikey: this.selfApikey,
                            data: JSON.stringify(params),
                        })];
                case 1:
                    res = _a.sent();
                    if (lodash_1.default.get(res, ['data', 'error']) === 0) {
                        tmp = [
                            {
                                switch: 'off',
                                outlet: 1,
                            },
                            {
                                switch: 'off',
                                outlet: 2,
                            },
                            {
                                switch: 'off',
                                outlet: 3,
                            },
                        ];
                        if (params.fan === 'on') {
                            tmp[0].switch = 'on';
                        }
                        if (params.speed === 2) {
                            tmp[1].switch = 'on';
                        }
                        else if (params.speed === 3) {
                            tmp[2].switch = 'on';
                        }
                        this.params = (0, mergeDeviceParams_1.default)(this.params, { switches: tmp });
                        this.updateState(this.params.switches);
                        return [2, 0];
                    }
                    _a.label = 2;
                case 2: return [2, -1];
            }
        });
    });
};
LanUIID34Controller.prototype.updateState = function (switches) {
    return __awaiter(this, void 0, void 0, function () {
        var lightState, fanState, presetMode;
        return __generator(this, function (_a) {
            if (this.disabled) {
                return [2];
            }
            lightState = switches[0].switch;
            fanState = switches[1].switch;
            presetMode = EFanPresetModes_1.default.Low;
            if (switches[2].switch === 'on') {
                presetMode = EFanPresetModes_1.default.Medium;
            }
            if (switches[3].switch === 'on') {
                presetMode = EFanPresetModes_1.default.High;
            }
            if (!this.online) {
                lightState = 'unavailable';
                fanState = 'unavailable';
            }
            (0, restApi_1.updateStates)("".concat(this.entityId), {
                entity_id: "".concat(this.entityId),
                state: lightState,
                attributes: {
                    restored: false,
                    supported_features: 0,
                    friendly_name: "".concat(this.deviceName),
                    state: lightState,
                },
            });
            (0, restApi_1.updateStates)("fan.".concat(this.deviceId), {
                entity_id: "fan.".concat(this.deviceId),
                state: fanState,
                attributes: {
                    restored: false,
                    supported_features: 0,
                    friendly_name: "".concat(this.deviceName),
                    state: lightState,
                    preset_mode: presetMode,
                    preset_modes: Object.values(EFanPresetModes_1.default),
                },
            });
            return [2];
        });
    });
};
exports.default = LanUIID34Controller;
