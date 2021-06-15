"use strict";
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
exports.clearData = exports.appendData = exports.saveData = exports.getDataSync = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var lodash_1 = __importDefault(require("lodash"));
var config_1 = require("../config/config");
var basePath = path_1.default.join('/data');
if (config_1.debugMode || !config_1.isSupervisor) {
    basePath = path_1.default.join(__dirname, '../../data');
}
if (!fs_1.default.existsSync(basePath)) {
    fs_1.default.mkdirSync(basePath);
}
var getDataSync = function (fileName, namePath) {
    if (namePath === void 0) { namePath = []; }
    try {
        var data = fs_1.default.readFileSync(path_1.default.join(basePath, "/" + fileName), { encoding: 'utf-8' });
        return namePath.reduce(function (cur, path) { return cur[path]; }, JSON.parse(data));
    }
    catch (err) {
        console.log('getDataSync-> no data');
        return null;
    }
};
exports.getDataSync = getDataSync;
var saveData = function (fileName, data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    fs_1.default.writeFile(path_1.default.join(basePath, "/" + fileName), data, function (err) {
                        if (err) {
                            console.log('Jia ~ file: data Util.ts ~ line 23 ~ fs.writeFile ~ err', err);
                            resolve(-1);
                        }
                        resolve(0);
                    });
                })];
        }
        catch (err) {
            console.log('saveData-> no data');
            return [2 /*return*/, -1];
        }
        return [2 /*return*/];
    });
}); };
exports.saveData = saveData;
var appendData = function (fileName, namePath, data) { return __awaiter(void 0, void 0, void 0, function () {
    var fileData;
    return __generator(this, function (_a) {
        fileData = getDataSync(fileName) || {};
        lodash_1.default.set(fileData, namePath, data);
        return [2 /*return*/, saveData(fileName, JSON.stringify(fileData))];
    });
}); };
exports.appendData = appendData;
var clearData = function (fileName) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, saveData(fileName, '{}')];
    });
}); };
exports.clearData = clearData;
