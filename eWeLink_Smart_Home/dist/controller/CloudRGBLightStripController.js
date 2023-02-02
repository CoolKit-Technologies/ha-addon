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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CloudDeviceController_1 = __importDefault(require("./CloudDeviceController"));
var restApi_1 = require("../apis/restApi");
var coolkit_ws_1 = __importDefault(require("coolkit-ws"));
var light_1 = require("../config/light");
var mergeDeviceParams_1 = __importDefault(require("../utils/mergeDeviceParams"));
var CloudRGBLightStripController = (function (_super) {
    __extends(CloudRGBLightStripController, _super);
    function CloudRGBLightStripController(params) {
        var _this = _super.call(this, params) || this;
        _this.uiid = 59;
        _this.effectList = light_1.effectList;
        _this.entityId = "light.".concat(params.deviceId);
        _this.params = params.params;
        _this.mode = _this.params.mode;
        return _this;
    }
    return CloudRGBLightStripController;
}(CloudDeviceController_1.default));
CloudRGBLightStripController.prototype.parseHaData2Ck = function (params) {
    var state = params.state, effect = params.effect, brightness_pct = params.brightness_pct, rgb_color = params.rgb_color, color_temp = params.color_temp, color_temp_kelvin = params.color_temp_kelvin;
    var res = {
        mode: 1,
    };
    brightness_pct && (res.bright = brightness_pct);
    if (state) {
        res.switch = state;
    }
    if (rgb_color) {
        res.colorR = rgb_color[0];
        res.colorG = rgb_color[1];
        res.colorB = rgb_color[2];
        res.light_type = 1;
    }
    if (color_temp_kelvin) {
        res.light_type = 2;
        var ct = Math.round((923000 - 142 * color_temp_kelvin) / 3800);
        var _a = __read(light_1.fakeTempList[ct].split(','), 3), r = _a[0], g = _a[1], b = _a[2];
        res.colorR = +r;
        res.colorG = +g;
        res.colorB = +b;
    }
    if (color_temp) {
        res.light_type = 2;
        var _b = __read(light_1.fakeTempList[color_temp].split(','), 3), r = _b[0], g = _b[1], b = _b[2];
        res.colorR = +r;
        res.colorG = +g;
        res.colorB = +b;
    }
    if (effect) {
        res.mode = this.effectList.indexOf(effect);
    }
    return res;
};
CloudRGBLightStripController.prototype.parseCkData2Ha = function (params) {
    var colorR = params.colorR, colorG = params.colorG, colorB = params.colorB, mode = params.mode, bright = params.bright, light_type = params.light_type, _a = params.switch, state = _a === void 0 ? 'on' : _a;
    var res = {
        state: state,
        effect: this.effectList[1],
    };
    bright && (res.brightness = (bright * 2.55) << 0);
    if (light_type === 1) {
        if (![colorR, colorG, colorB].includes(undefined)) {
            res.rgb_color = [colorR, colorG, colorB];
        }
    }
    if (light_type === 2) {
        if (![colorR, colorG, colorB].includes(undefined)) {
            var temp = light_1.fakeTempList.indexOf("".concat(colorR, ",").concat(colorG, ",").concat(colorB));
            if (temp !== -1) {
                res.color_temp = temp;
                res.color_temp_kelvin = Math.round((923000 - 3800 * temp) / 142);
            }
            else {
            }
        }
    }
    if (mode) {
        res.effect = this.effectList[mode];
    }
    return res;
};
CloudRGBLightStripController.prototype.updateLight = function (params) {
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
                        this.updateState(this.parseCkData2Ha(params));
                    }
                    return [2];
            }
        });
    });
};
CloudRGBLightStripController.prototype.updateState = function (params) {
    return __awaiter(this, void 0, void 0, function () {
        var status, state;
        return __generator(this, function (_a) {
            status = params.state;
            if (this.disabled) {
                return [2];
            }
            state = status;
            if (!this.online) {
                state = 'unavailable';
            }
            (0, restApi_1.updateStates)(this.entityId, {
                entity_id: this.entityId,
                state: state,
                attributes: __assign(__assign(__assign({ restored: false, supported_features: 4, supported_color_modes: ['color_temp', 'rgb'], effect_list: this.effectList.slice(1), min_mireds: 1, max_mireds: 142, min_color_temp_kelvin: 2700, max_color_temp_kelvin: 6500, friendly_name: this.deviceName }, this.parseCkData2Ha(this.params)), params), { state: state }),
            });
            return [2];
        });
    });
};
exports.default = CloudRGBLightStripController;
