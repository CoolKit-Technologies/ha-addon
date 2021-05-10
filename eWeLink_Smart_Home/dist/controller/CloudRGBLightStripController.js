"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
var colorUitl_1 = require("../utils/colorUitl");
var CloudRGBLightStripController = /** @class */ (function (_super) {
    __extends(CloudRGBLightStripController, _super);
    function CloudRGBLightStripController(params) {
        var _this = _super.call(this, params) || this;
        _this.uiid = 59;
        _this.entityId = "light." + params.deviceId;
        _this.params = params.params;
        _this.disabled = params.disabled;
        _this.online = params.online;
        _this.brightness = _this.params.bright * 2.55;
        _this.mode = _this.params.mode;
        _this.speed = _this.params.speed;
        _this.sensitive = _this.params.sensitive;
        _this.hsColor = _this.parseRGB2HS(_this.params.colorR, _this.params.colorG, _this.params.colorB);
        return _this;
    }
    return CloudRGBLightStripController;
}(CloudDeviceController_1.default));
CloudRGBLightStripController.prototype.parseRGB2HS = colorUitl_1.parseRGB2HS;
CloudRGBLightStripController.prototype.parseHS2RGB = colorUitl_1.parseHS2RGB;
CloudRGBLightStripController.prototype.parseHaData2Ck = function (_a) {
    var _b;
    var hs_color = _a.hs_color, brightness_pct = _a.brightness_pct, state = _a.state;
    var colorR, colorG, colorB, bright = this.brightness / 2.55;
    if (hs_color) {
        _b = __read(this.parseHS2RGB(hs_color), 3), colorR = _b[0], colorG = _b[1], colorB = _b[2];
    }
    if (brightness_pct) {
        bright = brightness_pct;
    }
    return {
        switch: state,
        colorR: colorR,
        colorG: colorG,
        colorB: colorB,
        bright: bright,
    };
};
CloudRGBLightStripController.prototype.parseCkData2Ha = function (_a) {
    var colorR = _a.colorR, colorB = _a.colorB, colorG = _a.colorG, bright = _a.bright, mode = _a.mode, speed = _a.speed, sensitive = _a.sensitive, _b = _a.switch, status = _b === void 0 ? 'on' : _b;
    var hs_color, brightness;
    if (colorR !== undefined && colorG !== undefined && colorB !== undefined) {
        hs_color = this.parseRGB2HS(colorR, colorG, colorB);
    }
    if (bright !== undefined) {
        brightness = bright * 2.55;
    }
    return {
        mode: mode,
        status: status,
        speed: speed,
        hs_color: hs_color,
        sensitive: sensitive,
        brightness: brightness,
    };
};
CloudRGBLightStripController.prototype.updateLight = function (params) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, coolkit_ws_1.default.updateThing({
                        ownerApikey: this.apikey,
                        deviceid: this.deviceId,
                        params: __assign(__assign({}, params), { mode: 1, speed: this.speed, sensitive: this.sensitive }),
                    })];
                case 1:
                    res = _a.sent();
                    if (res.error === 0) {
                        this.updateState({
                            status: params.switch,
                            mode: 1,
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
};
/**
 * @description 更新状态到HA
 */
CloudRGBLightStripController.prototype.updateState = function (_a) {
    var status = _a.status, brightness = _a.brightness, hs_color = _a.hs_color, mode = _a.mode, speed = _a.speed, sensitive = _a.sensitive;
    return __awaiter(this, void 0, void 0, function () {
        var state;
        return __generator(this, function (_b) {
            if (this.disabled) {
                return [2 /*return*/];
            }
            state = status;
            if (!this.online) {
                state = 'unavailable';
            }
            restApi_1.updateStates(this.entityId, {
                entity_id: this.entityId,
                state: state,
                attributes: {
                    restored: true,
                    supported_features: 17,
                    friendly_name: this.deviceName,
                    state: state,
                    brightness: brightness === undefined ? this.brightness : brightness,
                    hs_color: hs_color,
                    mode: mode === undefined ? this.mode : mode,
                    speed: speed === undefined ? this.speed : speed,
                    sensitive: sensitive === undefined ? this.sensitive : sensitive,
                },
            });
            brightness !== undefined && (this.brightness = brightness);
            mode !== undefined && (this.mode = mode);
            speed !== undefined && (this.speed = speed);
            sensitive !== undefined && (this.sensitive = sensitive);
            hs_color && (this.hsColor = hs_color);
            return [2 /*return*/];
        });
    });
};
exports.default = CloudRGBLightStripController;
