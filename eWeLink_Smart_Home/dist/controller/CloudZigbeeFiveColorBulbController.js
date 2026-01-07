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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CloudDeviceController_1 = __importDefault(require("./CloudDeviceController"));
var restApi_1 = require("../apis/restApi");
var coolkit_ws_1 = __importDefault(require("coolkit-ws"));
var mergeDeviceParams_1 = __importDefault(require("../utils/mergeDeviceParams"));
var colorConvertUtils_1 = require("../utils/colorConvertUtils");
var CloudZigbeeFiveColorBulbController = (function (_super) {
    __extends(CloudZigbeeFiveColorBulbController, _super);
    function CloudZigbeeFiveColorBulbController(params) {
        var _this = _super.call(this, params) || this;
        _this.uiid = 3258;
        _this.type = 8;
        _this.entityId = "light.".concat(params.deviceId);
        _this.params = params.params;
        return _this;
    }
    return CloudZigbeeFiveColorBulbController;
}(CloudDeviceController_1.default));
CloudZigbeeFiveColorBulbController.prototype.parseHaData2Ck = function (params) {
    var _a;
    var state = params.state, brightness_pct = params.brightness_pct, brightness = params.brightness, color_temp = params.color_temp, _b = params.rgb_color, rgb_color = _b === void 0 ? [] : _b, color_temp_kelvin = params.color_temp_kelvin;
    var res = { switch: 'on' };
    if (state === 'off') {
        return {
            switch: 'off',
        };
    }
    var _c = this.params, _d = _c.cctBrightness, cctBrightness = _d === void 0 ? 1 : _d, _e = _c.rgbBrightness, rgbBrightness = _e === void 0 ? 1 : _e, _f = _c.colorTemp, colorTemp = _f === void 0 ? 1 : _f, _g = _c.hue, hue = _g === void 0 ? 1 : _g, _h = _c.saturation, saturation = _h === void 0 ? 1 : _h;
    var _j = this.params.colorMode, colorMode = _j === void 0 ? 'cct' : _j;
    if (color_temp !== undefined || color_temp_kelvin !== undefined) {
        colorMode = 'cct';
    }
    else if (rgb_color.length !== 0) {
        colorMode = 'rgb';
    }
    var ltype = "".concat(colorMode, "Brightness");
    if (typeof brightness_pct !== 'number' && typeof brightness !== 'number' && typeof color_temp !== 'number' && typeof color_temp_kelvin !== 'number' && rgb_color.length === 0) {
        var tempParams = (_a = {
                switch: 'on',
                colorMode: colorMode
            },
            _a[ltype] = this.params[ltype],
            _a);
        colorMode === 'cct' ? Object.assign(tempParams, { colorTemp: colorTemp }) : Object.assign(tempParams, { hue: hue, saturation: saturation });
        return tempParams;
    }
    if (brightness_pct) {
        res.colorMode = colorMode;
        res[ltype] = brightness_pct;
        colorMode === 'cct' ? res.colorTemp = colorTemp : (res.hue = hue, res.saturation = saturation);
    }
    if (brightness) {
        res.colorMode = colorMode;
        res[ltype] = (brightness / 2.55) >> 0 === 0 ? 1 : (brightness / 2.55) >> 0;
        colorMode === 'cct' ? res.colorTemp = colorTemp : (res.hue = hue, res.saturation = saturation);
    }
    if (color_temp) {
        res.colorMode = 'cct';
        res.cctBrightness = typeof brightness === 'number' ? (brightness / 2.55) >> 0 === 0 ? 1 : (brightness / 2.55) >> 0 : cctBrightness;
        res.colorTemp = 100 - color_temp;
    }
    if (color_temp_kelvin) {
        res.colorMode = 'cct';
        res.cctBrightness = typeof brightness === 'number' ? (brightness / 2.55) >> 0 === 0 ? 1 : (brightness / 2.55) >> 0 : cctBrightness;
        res.colorTemp = 100 - Math.round((6500 - color_temp_kelvin) / 38);
    }
    if (rgb_color.length !== 0) {
        var _k = __read((0, colorConvertUtils_1.rgbToHue)(rgb_color), 3), _l = _k[0], h = _l === void 0 ? 1 : _l, _m = _k[1], s = _m === void 0 ? 1 : _m, v = _k[2];
        return {
            switch: 'on',
            colorMode: 'rgb',
            rgbBrightness: typeof brightness === 'number' ? (brightness / 2.55) >> 0 === 0 ? 1 : (brightness / 2.55) >> 0 : rgbBrightness,
            hue: h,
            saturation: s
        };
    }
    return res;
};
CloudZigbeeFiveColorBulbController.prototype.updateLight = function (params) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, coolkit_ws_1.default.updateThing({
                        ownerApikey: this.apikey,
                        deviceid: this.deviceId,
                        params: params,
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
CloudZigbeeFiveColorBulbController.prototype.updateState = function (params) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        var _f, status, _g, colorMode, colorTemp, cctBrightness, hue, saturation, rgbBrightness, currentColorMode, currentBrightness, currentColorTemp, currentHue, currentSaturation, state, rgb_color, br, ct;
        return __generator(this, function (_h) {
            if (this.disabled) {
                return [2];
            }
            _f = params.switch, status = _f === void 0 ? 'on' : _f, _g = params.colorMode, colorMode = _g === void 0 ? 'cct' : _g, colorTemp = params.colorTemp, cctBrightness = params.cctBrightness, hue = params.hue, saturation = params.saturation, rgbBrightness = params.rgbBrightness;
            currentColorMode = (_a = this.params.colorMode) !== null && _a !== void 0 ? _a : 'cct', currentBrightness = (_b = this.params["".concat(currentColorMode, "Brightness")]) !== null && _b !== void 0 ? _b : 1, currentColorTemp = (_c = this.params.colorTemp) !== null && _c !== void 0 ? _c : 1, currentHue = (_d = this.params.hue) !== null && _d !== void 0 ? _d : 1, currentSaturation = (_e = this.params.saturation) !== null && _e !== void 0 ? _e : 1;
            state = status, rgb_color = [], br = 1, ct = 1;
            br = currentBrightness;
            ct = currentColorTemp;
            rgb_color = (0, colorConvertUtils_1.hueToRgb)(currentHue, currentSaturation);
            if (!this.online) {
                state = 'unavailable';
            }
            if (colorMode && (typeof cctBrightness === 'number' || typeof rgbBrightness === 'number')) {
                br = colorMode === 'cct' ? cctBrightness : rgbBrightness;
            }
            if (colorMode && typeof colorTemp === 'number') {
                ct = 100 - colorTemp;
                currentColorMode = 'cct';
            }
            if (hue && saturation) {
                rgb_color = (0, colorConvertUtils_1.hueToRgb)(hue, saturation);
                currentColorMode = 'rgb';
            }
            (0, restApi_1.updateStates)(this.entityId, {
                entity_id: this.entityId,
                state: state,
                attributes: {
                    restored: false,
                    supported_features: 4,
                    friendly_name: this.deviceName,
                    supported_color_modes: ['color_temp', 'rgb'],
                    color_mode: currentColorMode === 'cct' ? 'color_temp' : 'rgb',
                    state: state,
                    min_mireds: 0,
                    max_mireds: 100,
                    min_color_temp_kelvin: 2700,
                    max_color_temp_kelvin: 6500,
                    brightness: (br * 2.55) >> 0,
                    color_temp: ct,
                    color_temp_kelvin: Math.round(2700 + 38 * (colorTemp || currentColorTemp)),
                    rgb_color: rgb_color,
                },
            });
            return [2];
        });
    });
};
exports.default = CloudZigbeeFiveColorBulbController;
