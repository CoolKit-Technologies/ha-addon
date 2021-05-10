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
exports.auth = exports.isLogin = exports.logout = exports.login = void 0;
var coolkit_open_api_1 = __importDefault(require("coolkit-open-api"));
var dataUtil_1 = require("../utils/dataUtil");
var getThings_1 = __importDefault(require("../utils/getThings"));
var Controller_1 = __importDefault(require("../controller/Controller"));
var coolkit_ws_1 = __importDefault(require("coolkit-ws"));
var app_1 = require("../config/app");
var lodash_1 = __importDefault(require("lodash"));
var eventBus_1 = __importDefault(require("../utils/eventBus"));
var LanDeviceController_1 = __importDefault(require("../controller/LanDeviceController"));
var CloudDeviceController_1 = __importDefault(require("../controller/CloudDeviceController"));
var restApi_1 = require("../apis/restApi");
var AuthClass_1 = __importDefault(require("../class/AuthClass"));
var generateLovelace_1 = __importDefault(require("../utils/generateLovelace"));
var removeEntityByDevice_1 = __importDefault(require("../utils/removeEntityByDevice"));
/**
 * @param {string} lang
 * @param {string} email
 * @param {string} password
 * @param {string} countryCode
 * @param {string} phoneNumber
 */
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, countryCode, phoneNumber, lang, password, email, result, at, apikey, region, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, countryCode = _a.countryCode, phoneNumber = _a.phoneNumber, lang = _a.lang, password = _a.password, email = _a.email;
                return [4 /*yield*/, coolkit_open_api_1.default.user.login({
                        countryCode: countryCode,
                        phoneNumber: phoneNumber,
                        lang: lang,
                        password: password,
                        email: email,
                    })];
            case 1:
                result = _b.sent();
                console.log('Jia ~ file: user.ts ~ line 26 ~ login ~ result', result);
                if (!(result.error === 0)) return [3 /*break*/, 4];
                dataUtil_1.saveData('user.json', JSON.stringify(__assign(__assign({}, result.data), { login: __assign({}, req.body) })));
                at = lodash_1.default.get(result, ['data', 'at']);
                apikey = lodash_1.default.get(result, ['data', 'user', 'apikey']);
                region = lodash_1.default.get(result, ['data', 'region']);
                return [4 /*yield*/, coolkit_ws_1.default.init({
                        appid: app_1.appId,
                        at: at,
                        apikey: apikey,
                        region: region,
                        userAgent: 'app',
                    })];
            case 2:
                _b.sent();
                return [4 /*yield*/, getThings_1.default()];
            case 3:
                _b.sent();
                eventBus_1.default.emit('sse');
                generateLovelace_1.default();
                _b.label = 4;
            case 4:
                res.json(result);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                console.log(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, _a, _b, _c, id, device, ckRes, err_2;
    var e_1, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 3, , 4]);
                return [4 /*yield*/, dataUtil_1.clearData('user.json')];
            case 1:
                result = _e.sent();
                console.log('Jia ~ file: user.ts ~ line 37 ~ logout ~ result', result);
                dataUtil_1.clearData('disabled.json');
                try {
                    for (_a = __values(Controller_1.default.deviceMap.entries()), _b = _a.next(); !_b.done; _b = _a.next()) {
                        _c = __read(_b.value, 2), id = _c[0], device = _c[1];
                        removeEntityByDevice_1.default(device);
                        if (device instanceof LanDeviceController_1.default) {
                            device.selfApikey = undefined;
                            device.devicekey = undefined;
                            device.deviceName = undefined;
                            device.extra = undefined;
                            device.params = undefined;
                        }
                        if (device instanceof CloudDeviceController_1.default) {
                            Controller_1.default.deviceMap.delete(id);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                Controller_1.default.unsupportDeviceMap.clear();
                return [4 /*yield*/, coolkit_open_api_1.default.user.logout()];
            case 2:
                ckRes = _e.sent();
                console.log('Jia ~ file: user.ts ~ line 41 ~ logout ~ ckRes', ckRes);
                res.json({
                    error: 0,
                    data: null,
                });
                eventBus_1.default.emit('sse');
                return [3 /*break*/, 4];
            case 3:
                err_2 = _e.sent();
                console.log(err_2);
                res.json({
                    error: 500,
                    data: err_2,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.logout = logout;
var isLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, dataUtil_1.getDataSync('user.json')];
            case 1:
                result = _a.sent();
                if (result && result.at) {
                    res.json({
                        error: 0,
                        data: { isLogin: true },
                    });
                    return [2 /*return*/];
                }
                res.json({
                    error: 0,
                    data: { isLogin: false },
                });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.log(err_3);
                res.json({
                    error: 500,
                    data: err_3,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.isLogin = isLogin;
var auth = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, code, clientId, result, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                console.log('Jia ~ file: user.ts ~ line 110 ~ auth ~ req.body', req.body);
                if (AuthClass_1.default.isValid(req.ip)) {
                    res.json({
                        error: 0,
                        data: null,
                    });
                    return [2 /*return*/];
                }
                _a = req.body, code = _a.code, clientId = _a.clientId;
                return [4 /*yield*/, restApi_1.getAuth(clientId, code)];
            case 1:
                result = _b.sent();
                if (result && result.status === 200) {
                    // todo
                    // AuthClass.setAuth(req.ip, clientId, result.data);
                    // eventBus.emit('init-ha-socket');
                    console.log('Jia ~ file: redirectToAuth.ts ~ line 44 ~ result.data', result.data);
                    res.json({
                        error: 0,
                        data: null,
                    });
                }
                else {
                    res.json({
                        error: result.status,
                        data: null,
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _b.sent();
                console.log(err_4);
                res.json({
                    error: 500,
                    data: err_4,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.auth = auth;
