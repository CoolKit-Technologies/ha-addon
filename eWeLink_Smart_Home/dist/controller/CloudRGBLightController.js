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
var CloudRGBLightController = /** @class */ (function (_super) {
    __extends(CloudRGBLightController, _super);
    function CloudRGBLightController(params) {
        var _this = _super.call(this, params) || this;
        _this.uiid = 22;
        var _a = params.params, channel0 = _a.channel0, channel1 = _a.channel1, channel2 = _a.channel2, channel3 = _a.channel3, channel4 = _a.channel4, zyx_mode = _a.zyx_mode, type = _a.type;
        _this.entityId = "light." + params.deviceId;
        _this.params = params.params;
        _this.disabled = params.disabled;
        _this.online = params.online;
        switch (type) {
            case 'cold':
                _this.colorTemp = 1;
                break;
            case 'middle':
                _this.colorTemp = 2;
                break;
            case 'warm':
                _this.colorTemp = 3;
                break;
            default:
                _this.colorTemp = 2;
                break;
        }
        _this.brightness = Math.max(+channel0, +channel1);
        if (zyx_mode === 2) {
            _this.hsColor = [0, 0];
        }
        else {
            _this.hsColor = _this.parseRGB2HS(+channel2, +channel3, +channel4);
        }
        return _this;
    }
    return CloudRGBLightController;
}(CloudDeviceController_1.default));
CloudRGBLightController.prototype.parseRGB2HS = colorUitl_1.parseRGB2HS;
CloudRGBLightController.prototype.parseHS2RGB = colorUitl_1.parseHS2RGB;
CloudRGBLightController.prototype.parseHaData2Ck = function (_a) {
    var _b, _c;
    var hs_color = _a.hs_color, color_temp = _a.color_temp, _d = _a.brightness_pct, brightness_pct = _d === void 0 ? 0 : _d, state = _a.state;
    var brightness = brightness_pct * 2.55;
    var channel0 = 0, channel1 = 0, channel2 = 0, channel3 = 0, channel4 = 0, type;
    if (hs_color) {
        _b = __read(this.parseHS2RGB(hs_color), 3), channel2 = _b[0], channel3 = _b[1], channel4 = _b[2];
    }
    if (color_temp) {
        if (color_temp === 1) {
            type = 'cold';
            channel0 = this.brightness || 128;
        }
        else if (color_temp === 3) {
            type = 'warm';
            channel1 = this.brightness || 128;
        }
        else {
            type = 'middle';
            channel0 = this.brightness || 128;
            channel1 = this.brightness || 128;
        }
    }
    if (brightness) {
        channel0 = brightness;
        channel1 = brightness;
    }
    if (state === 'on' && !hs_color && !color_temp && !brightness) {
        channel0 = this.brightness;
        channel1 = this.brightness;
        _c = __read(this.parseHS2RGB(this.hsColor), 3), channel2 = _c[0], channel3 = _c[1], channel4 = _c[2];
    }
    return {
        type: type,
        state: state,
        channel0: "" + channel0,
        channel1: "" + channel1,
        channel2: "" + channel2,
        channel3: "" + channel3,
        channel4: "" + channel4,
    };
};
CloudRGBLightController.prototype.parseCkData2Ha = function (params) {
    var hs, temp, brightness;
    var channel0 = params.channel0, channel1 = params.channel1, channel2 = params.channel2, channel3 = params.channel3, channel4 = params.channel4, type = params.type, state = params.state;
    if (channel2 && channel3 && channel4) {
        hs = this.parseRGB2HS(+channel2, +channel3, +channel4);
        brightness = 128;
    }
    if (channel0 || channel1) {
        brightness = Math.max(+channel1, +channel0);
    }
    switch (type) {
        case 'cold':
            temp = 1;
            break;
        case 'middle':
            temp = 2;
            break;
        case 'warm':
            temp = 3;
            break;
    }
    return {
        status: state || 'on',
        colorTemp: temp,
        hsColor: hs,
        brightness: brightness,
    };
};
CloudRGBLightController.prototype.updateLight = function (params) {
    return __awaiter(this, void 0, void 0, function () {
        var res, channel0, channel1, channel2, channel3, channel4, type;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (this.disabled) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, coolkit_ws_1.default.updateThing({
                            ownerApikey: this.apikey,
                            deviceid: this.deviceId,
                            params: params,
                        })];
                case 1:
                    res = _a.sent();
                    channel0 = params.channel0, channel1 = params.channel1, channel2 = params.channel2, channel3 = params.channel3, channel4 = params.channel4, type = params.type;
                    if (channel0 && channel1) {
                        this.brightness = Math.max(+channel0, +channel1);
                    }
                    if (channel2 && channel3 && channel4) {
                        this.hsColor = this.parseRGB2HS(+channel2, +channel3, +channel4);
                    }
                    switch (type) {
                        case 'cold':
                            this.colorTemp = 1;
                            break;
                        case 'middle':
                            this.colorTemp = 2;
                            break;
                        case 'warm':
                            this.colorTemp = 3;
                            break;
                        default:
                            this.colorTemp = 2;
                            break;
                    }
                    if (res.error === 0) {
                        this.updateState({
                            status: params.state,
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
CloudRGBLightController.prototype.updateState = function (_a) {
    var status = _a.status, brightness = _a.brightness, colorTemp = _a.colorTemp, hsColor = _a.hsColor;
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
                    supported_features: 19,
                    friendly_name: this.deviceName,
                    state: state,
                    min_mireds: 1,
                    max_mireds: 3,
                    brightness: brightness !== undefined ? brightness : this.brightness,
                    color_temp: colorTemp !== undefined ? colorTemp : this.colorTemp,
                    hs_color: hsColor || this.hsColor,
                },
            });
            if (status === 'on') {
                brightness !== undefined && (this.brightness = brightness);
                colorTemp !== undefined && (this.colorTemp = colorTemp);
                hsColor && (this.hsColor = hsColor);
            }
            return [2 /*return*/];
        });
    });
};
exports.default = CloudRGBLightController;
