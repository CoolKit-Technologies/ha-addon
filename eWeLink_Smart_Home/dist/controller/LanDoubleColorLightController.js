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
var lodash_1 = __importDefault(require("lodash"));
var lanDeviceApi_1 = require("../apis/lanDeviceApi");
var restApi_1 = require("../apis/restApi");
var light_1 = require("../config/light");
var mergeDeviceParams_1 = __importDefault(require("../utils/mergeDeviceParams"));
var LanDeviceController_1 = __importDefault(require("./LanDeviceController"));
var LanDoubleColorLightController = (function (_super) {
    __extends(LanDoubleColorLightController, _super);
    function LanDoubleColorLightController(props) {
        var _this = _super.call(this, props) || this;
        _this.effectList = light_1.doubleColorBulbEffectList;
        var deviceId = props.deviceId;
        _this.entityId = "light.".concat(deviceId);
        return _this;
    }
    return LanDoubleColorLightController;
}(LanDeviceController_1.default));
LanDoubleColorLightController.prototype.parseHaData2Ck = function (params) {
    var _a;
    var state = params.state, brightness_pct = params.brightness_pct, effect = params.effect, color_temp = params.color_temp, color_temp_kelvin = params.color_temp_kelvin;
    var res = {};
    if (state === 'off') {
        return {
            switch: 'off',
        };
    }
    if (!brightness_pct && !color_temp && !effect && !color_temp_kelvin) {
        var tmp = lodash_1.default.get(this, ['params', 'ltype']);
        return _a = {
                switch: 'on',
                ltype: tmp
            },
            _a[tmp] = lodash_1.default.get(this, ['params', tmp]),
            _a;
    }
    if (brightness_pct) {
        res.ltype = 'white';
        res.white = {
            br: brightness_pct,
            ct: lodash_1.default.get(this, ['params', 'white', 'ct']),
        };
    }
    if (color_temp) {
        res.ltype = 'white';
        res.white = {
            br: lodash_1.default.get(this, ['params', 'white', 'br']),
            ct: 255 - color_temp,
        };
    }
    if (color_temp_kelvin) {
        res.ltype = 'white';
        res.white = {
            br: lodash_1.default.get(this, ['params', 'white', 'br']),
            ct: Math.round((1657500 - 255 * color_temp_kelvin) / 3800)
        };
    }
    if (effect) {
        res = __assign(__assign({}, res), light_1.doubleColorBulbLtypeMap.get(effect));
    }
    return res;
};
LanDoubleColorLightController.prototype.updateLight = function (params) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(this.devicekey && this.selfApikey)) return [3, 5];
                    res = void 0;
                    if (!params.ltype) return [3, 2];
                    return [4, (0, lanDeviceApi_1.updateLanLight)({
                            ip: this.ip || this.target,
                            port: this.port,
                            deviceid: this.deviceId,
                            devicekey: this.devicekey,
                            selfApikey: this.selfApikey,
                            data: JSON.stringify(params),
                        })];
                case 1:
                    res = _a.sent();
                    return [3, 4];
                case 2: return [4, (0, lanDeviceApi_1.setSwitch)({
                        ip: this.ip || this.target,
                        port: this.port,
                        deviceid: this.deviceId,
                        devicekey: this.devicekey,
                        selfApikey: this.selfApikey,
                        data: JSON.stringify(params),
                    })];
                case 3:
                    res = _a.sent();
                    _a.label = 4;
                case 4:
                    if (lodash_1.default.get(res, ['data', 'error']) === 0) {
                        this.params = (0, mergeDeviceParams_1.default)(this.params, params);
                        this.updateState(params);
                    }
                    _a.label = 5;
                case 5: return [2, -1];
            }
        });
    });
};
LanDoubleColorLightController.prototype.updateState = function (params) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, status, ltype, br, ct, tmp, state;
        return __generator(this, function (_b) {
            if (this.disabled) {
                return [2];
            }
            _a = params.switch, status = _a === void 0 ? 'on' : _a, ltype = params.ltype;
            br = lodash_1.default.get(this, ['params', 'white', 'br']), ct = lodash_1.default.get(this, ['params', 'white', 'ct']);
            tmp = params[ltype];
            if (tmp) {
                br = tmp.br;
                ct = tmp.ct;
            }
            state = status;
            if (!this.online) {
                state = 'unavailable';
            }
            (0, restApi_1.updateStates)(this.entityId, {
                entity_id: this.entityId,
                state: state,
                attributes: {
                    restored: false,
                    supported_features: 4,
                    friendly_name: this.deviceName,
                    supported_color_modes: ['color_temp'],
                    effect_list: this.effectList,
                    state: state,
                    min_mireds: 1,
                    max_mireds: 255,
                    min_color_temp_kelvin: 2700,
                    max_color_temp_kelvin: 6500,
                    effect: ltype,
                    brightness: (br * 2.55) >> 0,
                    color_temp: 255 - ct,
                    color_temp_kelvin: Math.round((1657500 - 3800 * ct) / 255),
                },
            });
            return [2];
        });
    });
};
exports.default = LanDoubleColorLightController;
