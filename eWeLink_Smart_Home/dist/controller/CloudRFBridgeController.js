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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var CloudDeviceController_1 = __importDefault(require("./CloudDeviceController"));
var restApi_1 = require("../apis/restApi");
var CloudRFBridgeController = (function (_super) {
    __extends(CloudRFBridgeController, _super);
    function CloudRFBridgeController(params) {
        var _this = this;
        var _a;
        _this = _super.call(this, params) || this;
        _this.uiid = 28;
        _this.entityMap = new Map();
        _this.rfValMap = new Map();
        _this.entityId = "binary_sensor.".concat(params.deviceId);
        _this.params = params.params;
        _this.uiid = params.extra.uiid;
        _this.tags = params.tags;
        if (Array.isArray(params.params.rfList)) {
            params.params.rfList.forEach(function (_a) {
                var rfChl = _a.rfChl, rfVal = _a.rfVal;
                _this.rfValMap.set(rfChl, rfVal);
            });
        }
        if (((_a = params.tags) === null || _a === void 0 ? void 0 : _a.zyx_info) && _this.rfValMap.size) {
            params.tags.zyx_info.forEach(function (_a) {
                var name = _a.name, buttonName = _a.buttonName, remote_type = _a.remote_type;
                buttonName.forEach(function (item) {
                    var _a = __read(Object.entries(item)[0], 2), key = _a[0], childName = _a[1];
                    var entityName = "".concat(name, "-").concat(childName);
                    var suffix = _this.rfValMap.get(+key);
                    var entityId = "".concat(_this.entityId, "_").concat(suffix);
                    if (suffix) {
                        _this.entityMap.set(+key, {
                            entityId: entityId,
                            name: entityName,
                            icon: +remote_type < 6 ? 'mdi:remote' : 'mdi:alert',
                        });
                    }
                });
            });
        }
        return _this;
    }
    return CloudRFBridgeController;
}(CloudDeviceController_1.default));
CloudRFBridgeController.prototype.parseCkData2Ha = function (data) {
    var res = [];
    if (data.cmd === 'trigger') {
        var keys = Object.keys(data);
        keys.forEach(function (item) {
            var tmp = item.match(/(?<=rfTrig)\d+/);
            if (tmp && tmp[0]) {
                res.push(+tmp[0]);
            }
        });
    }
    if (data.cmd === 'transmit') {
        var values = Object.values(data);
        values.forEach(function (item) {
            if (lodash_1.default.isNumber(item)) {
                res.push(item);
            }
        });
    }
    return res;
};
CloudRFBridgeController.prototype.updateState = function (ids) {
    return __awaiter(this, void 0, void 0, function () {
        var state, i, entity, entityId, icon, name_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (this.disabled) {
                        return [2];
                    }
                    state = 'on';
                    if (!ids) {
                        ids = __spreadArray([], __read(this.entityMap.keys()), false);
                        state = 'off';
                    }
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < ids.length)) return [3, 4];
                    entity = this.entityMap.get(ids[i]);
                    if (!entity) return [3, 3];
                    entityId = entity.entityId, icon = entity.icon, name_1 = entity.name;
                    return [4, (0, restApi_1.updateStates)(entityId, {
                            entity_id: "".concat(entityId),
                            state: state,
                            attributes: {
                                restored: false,
                                friendly_name: name_1,
                                state: state,
                                icon: icon,
                            },
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3, 1];
                case 4:
                    if (state === 'on' && ids) {
                        setTimeout(function () {
                            ids.map(function (id) {
                                var entity = _this.entityMap.get(id);
                                if (entity) {
                                    var entityId = entity.entityId, icon = entity.icon, name_2 = entity.name;
                                    (0, restApi_1.updateStates)(entityId, {
                                        entity_id: "".concat(entityId),
                                        state: 'off',
                                        attributes: {
                                            restored: false,
                                            friendly_name: name_2,
                                            state: 'off',
                                            icon: icon,
                                        },
                                    });
                                }
                            });
                        }, 1000);
                    }
                    return [2];
            }
        });
    });
};
exports.default = CloudRFBridgeController;
