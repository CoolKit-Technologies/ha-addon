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
Object.defineProperty(exports, "__esModule", { value: true });
var restApi_1 = require("../apis/restApi");
var auth_1 = require("../config/auth");
var config_1 = require("../config/config");
var dataUtil_1 = require("../utils/dataUtil");
var logger_1 = require("../utils/logger");
var AuthClass = (function () {
    function AuthClass() {
        this.init();
    }
    AuthClass.createInstance = function () {
        if (!AuthClass.instance) {
            AuthClass.instance = new AuthClass();
        }
        return AuthClass.instance;
    };
    AuthClass.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var auths, _a, _b, _c, _i, origin_1, auth, tmp, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (config_1.debugMode) {
                            this.curAuth = auth_1.HaToken;
                            return [2];
                        }
                        if (config_1.isSupervisor) {
                            this.curAuth = process.env.SUPERVISOR_TOKEN;
                            return [2];
                        }
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, , 7]);
                        auths = (0, dataUtil_1.getDataSync)('auth.json', []);
                        _a = auths;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _d.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3, 5];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3, 4];
                        origin_1 = _c;
                        auth = JSON.parse(auths[origin_1]);
                        if (!(auth && Date.now() < +auth.expires_time)) return [3, 4];
                        AuthClass.AuthMap.set(origin_1, auth);
                        return [4, this.refresh(origin_1)];
                    case 3:
                        tmp = _d.sent();
                        if (tmp) {
                            this.curAuth = auth.access_token;
                        }
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3, 2];
                    case 5: return [3, 7];
                    case 6:
                        error_1 = _d.sent();
                        logger_1.logger.warn("AuthClass init error: ".concat(error_1));
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    AuthClass.prototype.isValid = function (host) {
        var auth = AuthClass.AuthMap.get(host);
        if (auth && auth.expires_time > Date.now()) {
            this.curAuth = auth.access_token;
            return true;
        }
        return false;
    };
    AuthClass.prototype.setAuth = function (origin, clientId, auth) {
        var _this = this;
        var data = __assign(__assign({}, auth), { cliend_id: clientId, expires_time: Date.now() + auth.expires_in * 1000 });
        this.curAuth = auth.access_token;
        AuthClass.AuthMap.set(origin, data);
        (0, dataUtil_1.appendData)('auth.json', [origin], JSON.stringify(data));
        setTimeout(function () {
            _this.refresh(origin);
        }, (auth.expires_in - 300) * 1000);
    };
    AuthClass.prototype.refresh = function (origin) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, cliend_id, refresh_token, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth = AuthClass.AuthMap.get(origin);
                        if (!auth) return [3, 2];
                        cliend_id = auth.cliend_id, refresh_token = auth.refresh_token;
                        if (config_1.isSupervisor) {
                            AuthClass.AuthMap.delete(origin);
                            return [2];
                        }
                        logger_1.logger.info('Start refresh the HA token');
                        return [4, (0, restApi_1.refreshAuth)(cliend_id, refresh_token)];
                    case 1:
                        res = _a.sent();
                        logger_1.logger.info('Refresh HA token success!');
                        if (res && res.status === 200) {
                            this.setAuth(origin, cliend_id, __assign(__assign({}, auth), res.data));
                        }
                        return [2, res.data];
                    case 2: return [2];
                }
            });
        });
    };
    AuthClass.AuthMap = new Map();
    return AuthClass;
}());
var instance = AuthClass.createInstance();
instance.init();
exports.default = instance;
