"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var express_1 = __importDefault(require("express"));
var path = __importStar(require("path"));
var coolkit_api_1 = __importDefault(require("coolkit-api"));
var cors_1 = __importDefault(require("cors"));
var user_1 = __importDefault(require("./route/user"));
var devices_1 = __importDefault(require("./route/devices"));
var language_1 = __importDefault(require("./route/language"));
var stream_1 = __importDefault(require("./route/stream"));
var ha_devices_1 = __importDefault(require("./route/ha-devices"));
var util_1 = __importDefault(require("./route/util"));
var initMdns_1 = __importDefault(require("./utils/initMdns"));
var initCkWs_1 = __importDefault(require("./utils/initCkWs"));
var initHaSocket_1 = __importDefault(require("./utils/initHaSocket"));
var initCkApi_1 = __importDefault(require("./utils/initCkApi"));
var app_1 = require("./config/app");
var config_1 = require("./config/config");
var redirectToAuth_1 = __importDefault(require("./middleware/redirectToAuth"));
var AuthClass_1 = __importDefault(require("./class/AuthClass"));
var eventBus_1 = __importDefault(require("./utils/eventBus"));
var init_1 = require("./lib-ha/init");
var process_1 = __importDefault(require("process"));
var logger_1 = require("./utils/logger");
coolkit_api_1.default.init({
    useTestEnv: process_1.default.env.CK_API_ENV === 'test',
    appId: app_1.appId,
    appSecret: app_1.appSecret,
});
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, initMdns_1.default)();
                return [4, AuthClass_1.default.init()];
            case 1:
                res = _a.sent();
                if (!AuthClass_1.default.curAuth) return [3, 2];
                eventBus_1.default.emit('init-ha-socket');
                return [3, 4];
            case 2: return [4, (0, initHaSocket_1.default)()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [4, (0, initCkApi_1.default)()];
            case 5:
                _a.sent();
                return [4, (0, initCkWs_1.default)()];
            case 6:
                _a.sent();
                return [4, (0, init_1.init)()];
            case 7:
                _a.sent();
                return [2];
        }
    });
}); })();
var app = (0, express_1.default)();
var port = 3000;
var apiPrefix = '/api';
if (config_1.debugMode) {
    app.use((0, cors_1.default)());
}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("".concat(apiPrefix, "/user"), user_1.default);
app.use('/', express_1.default.static(path.join(__dirname, '/pages')));
app.use(redirectToAuth_1.default);
app.use("".concat(apiPrefix, "/language"), language_1.default);
app.use("".concat(apiPrefix, "/devices"), devices_1.default);
app.use("".concat(apiPrefix, "/stream"), stream_1.default);
app.use("".concat(apiPrefix, "/util"), util_1.default);
app.use("".concat(apiPrefix, "/ha-devices"), ha_devices_1.default);
app.use('/', function (req, res) {
    res.type('.html');
    res.sendFile(path.join(__dirname, '/pages/index.html'));
});
app.listen(port, function () {
    logger_1.logger.info("server is running at ".concat(port));
});
