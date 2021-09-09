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
var CloudDeviceController_1 = __importDefault(require("./CloudDeviceController"));
var restApi_1 = require("../apis/restApi");
var coolkit_ws_1 = __importDefault(require("coolkit-ws"));
var lodash_1 = __importDefault(require("lodash"));
var light_1 = require("../config/light");
var mergeDeviceParams_1 = __importDefault(require("../utils/mergeDeviceParams"));
/**
 *
 * @class CloudUIID104Controller
 * @extends {CloudDeviceController}
 * @description RGB五色灯
 */
var CloudUIID104Controller = /** @class */ (function (_super) {
    __extends(CloudUIID104Controller, _super);
    function CloudUIID104Controller(params) {
        var _this = _super.call(this, params) || this;
        _this.uiid = 104;
        _this.effectList = light_1.rbgLEDBulbEffectList;
        _this.entityId = "light." + params.deviceId;
        _this.disabled = params.disabled;
        _this.params = params.params;
        return _this;
    }
    return CloudUIID104Controller;
}(CloudDeviceController_1.default));
CloudUIID104Controller.prototype.parseHaData2Ck = function (params) {
    var _a, _b;
    var state = params.state, brightness_pct = params.brightness_pct, effect = params.effect, color_temp = params.color_temp, rgb_color = params.rgb_color;
    var res = {};
    if (state === 'off') {
        return {
            switch: 'off',
        };
    }
    // 从关闭到打开
    if (!brightness_pct && !color_temp && !effect && !rgb_color) {
        var tmp = this.params.ltype;
        return _a = {
                switch: 'on',
                ltype: tmp
            },
            _a[tmp] = lodash_1.default.get(this, ['params', tmp]),
            _a;
    }
    if (brightness_pct) {
        var tmp = this.params.ltype;
        res = __assign(__assign({}, res), (_b = { ltype: tmp }, _b[tmp] = __assign(__assign({}, lodash_1.default.get(this, ['params', tmp], {})), { br: brightness_pct }), _b));
    }
    if (rgb_color) {
        var tmp = this.params.ltype;
        res = __assign(__assign({}, res), { ltype: 'color', color: __assign(__assign({}, lodash_1.default.get(this, ['params', tmp], {
                br: 100,
            })), { r: rgb_color[0], g: rgb_color[1], b: rgb_color[2] }) });
    }
    if (color_temp) {
        res.ltype = 'white';
        res.white = {
            br: lodash_1.default.get(this, ['params', 'white', 'br']),
            ct: 255 - color_temp,
        };
    }
    if (effect) {
        res = __assign(__assign({}, res), light_1.rbgLEDBulbLtypeMap.get(effect));
    }
    return res;
};
CloudUIID104Controller.prototype.updateLight = function (params) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, coolkit_ws_1.default.updateThing({
                        ownerApikey: this.apikey,
                        deviceid: this.deviceId,
                        params: params,
                    })];
                case 1:
                    res = _a.sent();
                    if (res.error === 0) {
                        this.params = mergeDeviceParams_1.default(this.params, params);
                        this.updateState(params);
                    }
                    return [2 /*return*/];
            }
        });
    });
};
/**
 * @description 更新状态到HA
 */
CloudUIID104Controller.prototype.updateState = function (params) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, status, ltype, br, ct, r, g, b, tmp, state;
        return __generator(this, function (_b) {
            if (this.disabled) {
                return [2 /*return*/];
            }
            _a = params.switch, status = _a === void 0 ? 'on' : _a, ltype = params.ltype;
            br = this.params.white.br, ct = this.params.white.ct, r = this.params.color.r, g = this.params.color.g, b = this.params.color.b;
            tmp = params[ltype];
            if (tmp) {
                tmp.br && (br = tmp.br);
                tmp.ct && (ct = tmp.ct);
                tmp.r && (r = tmp.r);
                tmp.g && (g = tmp.g);
                tmp.b && (b = tmp.b);
            }
            state = status;
            if (!this.online) {
                state = 'unavailable';
            }
            restApi_1.updateStates(this.entityId, {
                entity_id: this.entityId,
                state: state,
                attributes: {
                    restored: false,
                    supported_features: 4,
                    friendly_name: this.deviceName,
                    supported_color_modes: ['color_temp', 'rgb'],
                    effect_list: this.effectList,
                    state: state,
                    min_mireds: 1,
                    max_mireds: 255,
                    effect: ltype,
                    brightness: (br * 2.55) >> 0,
                    color_temp: 255 - ct,
                    rgb_color: [r, g, b],
                },
            });
            return [2 /*return*/];
        });
    });
};
exports.default = CloudUIID104Controller;
