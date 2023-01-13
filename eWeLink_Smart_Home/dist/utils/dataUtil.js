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
exports.setGwData = exports.getGwData = exports.initLibHaFiles = exports.clearData = exports.appendData = exports.saveData = exports.getDataSync = void 0;
var fs_1 = __importDefault(require("fs"));
var promises_1 = __importDefault(require("fs/promises"));
var path_1 = __importDefault(require("path"));
var lodash_1 = __importDefault(require("lodash"));
var config_1 = require("../config/config");
var const_1 = require("../lib-ha/const");
var logger_1 = require("./logger");
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
        var data = fs_1.default.readFileSync(path_1.default.join(basePath, "/".concat(fileName)), { encoding: 'utf-8' });
        return namePath.reduce(function (cur, path) { return cur[path]; }, JSON.parse(data));
    }
    catch (err) {
        logger_1.logger.error("getDataSync: ".concat(fileName, " -> ").concat(namePath, " no data"));
        return null;
    }
};
exports.getDataSync = getDataSync;
var saveData = function (fileName, data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            return [2, new Promise(function (resolve, reject) {
                    fs_1.default.writeFile(path_1.default.join(basePath, "/".concat(fileName)), data, function (err) {
                        if (err) {
                            logger_1.logger.error("fs.writeFile error: ".concat(err));
                            resolve(-1);
                        }
                        resolve(0);
                    });
                })];
        }
        catch (err) {
            logger_1.logger.error("saveData -> no data");
            return [2, -1];
        }
        return [2];
    });
}); };
exports.saveData = saveData;
var appendData = function (fileName, namePath, data) { return __awaiter(void 0, void 0, void 0, function () {
    var fileData;
    return __generator(this, function (_a) {
        fileData = getDataSync(fileName) || {};
        lodash_1.default.set(fileData, namePath, data);
        return [2, saveData(fileName, JSON.stringify(fileData))];
    });
}); };
exports.appendData = appendData;
var clearData = function (fileName) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2, saveData(fileName, '{}')];
    });
}); };
exports.clearData = clearData;
function initLibHaFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var FILEPATH, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    FILEPATH = path_1.default.join(basePath, const_1.GW_DATA_FILENAME);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 6]);
                    return [4, promises_1.default.stat(FILEPATH)];
                case 2:
                    _a.sent();
                    return [3, 6];
                case 3:
                    err_1 = _a.sent();
                    if (!(err_1.code === 'ENOENT')) return [3, 5];
                    return [4, promises_1.default.writeFile(FILEPATH, JSON.stringify([]))];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3, 6];
                case 6: return [2];
            }
        });
    });
}
exports.initLibHaFiles = initLibHaFiles;
function getGwData() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, promises_1.default.readFile(path_1.default.join(basePath, const_1.GW_DATA_FILENAME), { encoding: 'utf-8' })];
                case 1:
                    data = _a.sent();
                    return [2, JSON.parse(data)];
            }
        });
    });
}
exports.getGwData = getGwData;
function setGwData(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, promises_1.default.writeFile(path_1.default.join(basePath, const_1.GW_DATA_FILENAME), JSON.stringify(data))];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
exports.setGwData = setGwData;
