"use strict";
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
var multicast_dns_1 = __importDefault(require("multicast-dns"));
var Controller_1 = __importDefault(require("../controller/Controller"));
var ELanType_1 = __importDefault(require("../ts/enum/ELanType"));
var logger_1 = require("../utils/logger");
var Mdns = (function () {
    function Mdns(params) {
        var onResponseCb = params.onResponseCb, queryParams = params.queryParams, queryCb = params.queryCb;
        this.mdns = new multicast_dns_1.default();
        this.onResponse(onResponseCb);
        this.query(queryParams, queryCb);
    }
    Mdns.createInstance = function (params) {
        if (!Mdns.instance) {
            Mdns.instance = new Mdns(params);
        }
        return Mdns.instance;
    };
    Mdns.prototype.query = function (params, callback) {
        if (!this.mdns) {
            this.mdns = new multicast_dns_1.default();
        }
        this.mdns.query(params, callback);
    };
    Mdns.prototype.onResponse = function (callback) {
        this.mdns.on('response', function (packet) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            var answers = packet.answers;
            if (Array.isArray(answers)) {
                var tmp = {};
                var key = '';
                var _loop_1 = function (i) {
                    var data = answers[i].data;
                    switch (answers[i].type) {
                        case 'PTR':
                            if ("".concat(data).indexOf('ewelink') === -1) {
                                return { value: void 0 };
                            }
                            tmp.ptr = data;
                            break;
                        case 'A':
                            tmp.a = data;
                            break;
                        case 'SRV':
                            tmp.srv = data;
                            break;
                        case 'TXT':
                            var arr = data.toString().split(/(?<!\{.*),(?!\}.*)/);
                            var txtData_1 = {};
                            arr.map(function (str) {
                                var _a = __read(str.split('='), 2), key = _a[0], value = _a[1];
                                try {
                                    txtData_1[key] = JSON.parse(value);
                                }
                                catch (_b) {
                                    txtData_1[key] = value;
                                }
                            });
                            tmp.txt = txtData_1;
                            key = txtData_1.id;
                            break;
                        default:
                            break;
                    }
                };
                for (var i = 0; i < answers.length; i++) {
                    var state_1 = _loop_1(i);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
                if (!key) {
                    return;
                }
                if (((_a = tmp.txt) === null || _a === void 0 ? void 0 : _a.type) === 'diy_plug') {
                    logger_1.logger.info('Found DIY switch');
                    var diyDevice = Controller_1.default.setDevice({
                        id: key,
                        data: tmp,
                        type: 1,
                    });
                    callback && callback(diyDevice);
                }
                else if (((_b = tmp.txt) === null || _b === void 0 ? void 0 : _b.type) === ELanType_1.default.Plug) {
                    logger_1.logger.info('Found LAN switch');
                    var lanDevice = Controller_1.default.setDevice({
                        id: key,
                        data: tmp,
                        type: 2,
                        lanType: ELanType_1.default.Plug,
                    });
                    callback && callback(lanDevice);
                }
                else if (((_c = tmp.txt) === null || _c === void 0 ? void 0 : _c.type) === ELanType_1.default.Strip) {
                    logger_1.logger.info('Found LAN multi-channel switch');
                    var lanDevice = Controller_1.default.setDevice({
                        id: key,
                        data: tmp,
                        type: 2,
                        lanType: ELanType_1.default.Strip,
                    });
                    callback && callback(lanDevice);
                }
                else if (((_d = tmp.txt) === null || _d === void 0 ? void 0 : _d.type) === ELanType_1.default.MultifunSwitch) {
                    logger_1.logger.info('Found LAN DualR3');
                    var dualR3 = Controller_1.default.setDevice({
                        id: key,
                        data: tmp,
                        type: 2,
                        lanType: ELanType_1.default.MultifunSwitch,
                    });
                    callback && callback(dualR3);
                }
                else if (((_e = tmp.txt) === null || _e === void 0 ? void 0 : _e.type) === ELanType_1.default.EnhancedPlug) {
                    logger_1.logger.info('Found LAN enhanced plug');
                    var device = Controller_1.default.setDevice({
                        id: key,
                        data: tmp,
                        type: 2,
                        lanType: ELanType_1.default.EnhancedPlug,
                    });
                    callback && callback(device);
                }
                else if (((_f = tmp.txt) === null || _f === void 0 ? void 0 : _f.type) === ELanType_1.default.THPlug) {
                    logger_1.logger.info('Found LAN TH plug');
                    var device = Controller_1.default.setDevice({
                        id: key,
                        data: tmp,
                        type: 2,
                        lanType: ELanType_1.default.THPlug,
                    });
                    callback && callback(device);
                }
                else if (((_g = tmp.txt) === null || _g === void 0 ? void 0 : _g.type) === ELanType_1.default.RF) {
                    logger_1.logger.info('Found LAN RF-Bridge');
                    var device = Controller_1.default.setDevice({
                        id: key,
                        data: tmp,
                        type: 2,
                        lanType: ELanType_1.default.RF,
                    });
                    callback && callback(device);
                }
                else if (((_h = tmp.txt) === null || _h === void 0 ? void 0 : _h.type) === ELanType_1.default.FanLight) {
                    logger_1.logger.info('Found LAN fan light');
                    var device = Controller_1.default.setDevice({
                        id: key,
                        data: tmp,
                        type: 2,
                        lanType: ELanType_1.default.FanLight,
                    });
                    callback && callback(device);
                }
                else if (((_j = tmp.txt) === null || _j === void 0 ? void 0 : _j.type) === ELanType_1.default.Light) {
                    logger_1.logger.info('Found LAN multi-color lamp');
                }
            }
        });
    };
    Mdns.prototype.destroy = function () {
        this.mdns.destroy();
        this.mdns = null;
    };
    return Mdns;
}());
exports.default = Mdns;
