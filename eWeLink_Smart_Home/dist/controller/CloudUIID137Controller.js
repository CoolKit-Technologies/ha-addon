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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
var CloudDeviceController_1 = __importDefault(require("./CloudDeviceController"));
var logger_1 = require("../utils/logger");
var light_1 = require("../config/light");
var coolkit_ws_1 = __importDefault(require("coolkit-ws"));
var mergeDeviceParams_1 = __importDefault(require("../utils/mergeDeviceParams"));
var restApi_1 = require("../apis/restApi");
var CloudUIID137Controller = (function (_super) {
    __extends(CloudUIID137Controller, _super);
    function CloudUIID137Controller(params) {
        var _this = _super.call(this, params) || this;
        _this.uiid = 137;
        _this.effectList = __spreadArray([], __read(light_1.uiid137EffectList.keys()), false);
        _this.entityId = "light.".concat(params.deviceId);
        _this.params = params.params;
        _this.uiid = params.extra.uiid;
        return _this;
    }
    return CloudUIID137Controller;
}(CloudDeviceController_1.default));
CloudUIID137Controller.prototype.parseHaData2Ck = function (params) {
    var state = params.state, brightness_pct = params.brightness_pct, brightness = params.brightness, effect = params.effect, color_temp_kelvin = params.color_temp_kelvin, color_temp = params.color_temp, rgb_color = params.rgb_color;
    var res = { switch: 'on' };
    if (state === 'off') {
        return {
            switch: 'off',
        };
    }
    brightness === 0 && (brightness = 1);
    brightness_pct === 0 && (brightness_pct = 1);
    if (!brightness && !brightness_pct && !color_temp_kelvin && !effect && !rgb_color && !color_temp) {
        return {
            switch: 'on',
            mode: this.params.mode,
            colorTemp: this.params.colorTemp,
            colorR: this.params.colorR,
            colorG: this.params.colorG,
            bright: this.params.bright
        };
    }
    if (effect) {
        var mode = light_1.uiid137EffectList.get(effect);
        res = __assign(__assign({}, res), { mode: mode });
    }
    if (brightness_pct) {
        res = __assign(__assign({}, res), { mode: [1, 2, 3].includes(this.params.mode) ? this.params.mode : 1, bright: brightness_pct });
        if (res.mode === 1) {
            res.colorR = this.params.colorR;
            res.colorG = this.params.colorG;
            res.colorB = this.params.colorB;
        }
        if (res.mode === 2) {
            res.colorTemp = this.params.colorTemp;
        }
    }
    if (brightness) {
        var br = (brightness / 2.55) >> 0 === 0 ? 1 : (brightness / 2.55) >> 0;
        res = __assign(__assign({}, res), { mode: [1, 2, 3].includes(this.params.mode) ? this.params.mode : 1, bright: br });
        if (res.mode === 1) {
            res.colorR = this.params.colorR;
            res.colorG = this.params.colorG;
            res.colorB = this.params.colorB;
        }
        if (res.mode === 2) {
            res.colorTemp = this.params.colorTemp;
        }
    }
    if (rgb_color) {
        res = __assign(__assign({}, res), { mode: 1, colorR: rgb_color[0], colorG: rgb_color[1], colorB: rgb_color[2] });
        if (!res.bright) {
            res.bright = this.params.bright;
        }
    }
    if (color_temp_kelvin) {
        res = __assign(__assign({}, res), { mode: 2, colorTemp: Math.round((6700 - color_temp_kelvin) / 41) });
    }
    if (color_temp) {
        res = __assign(__assign({}, res), { mode: 2, colorTemp: color_temp });
    }
    return res;
};
CloudUIID137Controller.prototype.updateLight = function (params) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, coolkit_ws_1.default.updateThing({
                        ownerApikey: this.apikey,
                        deviceid: this.deviceId,
                        params: params
                    })];
                case 1:
                    res = _a.sent();
                    if (res.error === 0) {
                        this.params = (0, mergeDeviceParams_1.default)(this.params, params);
                        this.updateState(params);
                    }
                    return [2];
            }
        });
    });
};
CloudUIID137Controller.prototype.updateState = function (params) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, status, mode, colorTemp, colorB, colorG, colorR, bright, state, getEffect, ckColorTemp;
        return __generator(this, function (_b) {
            logger_1.logger.info('UIID 137 Device updateState: ' + JSON.stringify(params));
            if (this.disabled) {
                return [2];
            }
            _a = params.switch, status = _a === void 0 ? 'on' : _a, mode = params.mode, colorTemp = params.colorTemp, colorB = params.colorB, colorG = params.colorG, colorR = params.colorR, bright = params.bright;
            state = status;
            if (!this.online) {
                state = 'unavailable';
            }
            getEffect = function (mode) {
                var e_1, _a;
                var keys = light_1.uiid137EffectList.keys();
                try {
                    for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                        var key = keys_1_1.value;
                        if (light_1.uiid137EffectList.get(key) === mode) {
                            return key;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return '';
            };
            mode = mode || this.params.mode;
            ckColorTemp = (colorTemp || this.params.colorTemp);
            (0, restApi_1.updateStates)(this.entityId, {
                entity_id: this.entityId,
                state: state,
                attributes: {
                    restored: false,
                    supported_features: 4,
                    friendly_name: this.deviceName,
                    supported_color_modes: ['color_temp', 'rgb'],
                    color_mode: mode === 2 ? 'color_temp' : mode === 1 ? 'rgb' : '',
                    state: state,
                    min_mireds: 1,
                    max_mireds: 100,
                    min_color_temp_kelvin: 2600,
                    max_color_temp_kelvin: 6700,
                    color_temp_kelvin: 6700 - ckColorTemp * 41,
                    color_temp: ckColorTemp === 0 ? 1 : ckColorTemp,
                    effect: getEffect(mode),
                    effect_list: this.effectList,
                    brightness: bright ? (bright * 2.55) >> 0 : (this.params.bright * 2.55) >> 0,
                    rgb_color: [
                        colorR ? colorR : this.params.colorR,
                        colorG ? colorG : this.params.colorG,
                        colorB ? colorB : this.params.colorB
                    ],
                },
            });
            return [2];
        });
    });
};
exports.default = CloudUIID137Controller;
