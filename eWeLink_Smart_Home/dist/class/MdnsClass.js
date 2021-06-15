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
// @ts-ignore
var multicast_dns_1 = __importDefault(require("multicast-dns"));
var Controller_1 = __importDefault(require("../controller/Controller"));
var Mdns = /** @class */ (function () {
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
    /**
     *
     *
     * @param {*} params
     * @param {Function} [callback] 发起查询后的回调
     * @memberof Mdns
     */
    Mdns.prototype.query = function (params, callback) {
        if (!this.mdns) {
            this.mdns = new multicast_dns_1.default();
        }
        this.mdns.query(params, callback);
    };
    /**
     *
     *
     * @param {Function} [callback] 查询到eWelink设备后的回调
     * @memberof Mdns
     */
    Mdns.prototype.onResponse = function (callback) {
        this.mdns.on('response', function (packet) {
            var _a, _b, _c, _d, _e, _f, _g;
            var answers = packet.answers;
            if (Array.isArray(answers)) {
                var tmp = {};
                var key = '';
                var _loop_1 = function (i) {
                    var data = answers[i].data;
                    switch (answers[i].type) {
                        case 'PTR':
                            if (("" + data).indexOf('ewelink') === -1) {
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
                    console.log('Found Diy Switch ');
                    var diyDevice = Controller_1.default.setDevice({
                        id: key,
                        data: tmp,
                        type: 1,
                    });
                    callback && callback(diyDevice);
                }
                if (((_b = tmp.txt) === null || _b === void 0 ? void 0 : _b.type) === 'plug') {
                    console.log('Found Lan Switch');
                    var lanDevice = Controller_1.default.setDevice({
                        id: key,
                        data: tmp,
                        type: 2,
                        lanType: 'plug',
                    });
                    callback && callback(lanDevice);
                }
                if (((_c = tmp.txt) === null || _c === void 0 ? void 0 : _c.type) === 'strip') {
                    console.log('Found Lan Multi-Switch');
                    var lanDevice = Controller_1.default.setDevice({
                        id: key,
                        data: tmp,
                        type: 2,
                        lanType: 'strip',
                    });
                    callback && callback(lanDevice);
                }
                if (((_d = tmp.txt) === null || _d === void 0 ? void 0 : _d.type) === 'multifun_switch') {
                    console.log('Found Lan DualR3');
                    var dualR3 = Controller_1.default.setDevice({
                        id: key,
                        data: tmp,
                        type: 2,
                        lanType: 'multifun_switch',
                    });
                    callback && callback(dualR3);
                }
                if (((_e = tmp.txt) === null || _e === void 0 ? void 0 : _e.type) === 'enhanced_plug') {
                    console.log('Found Lan 单通道插座增强版（用电统计）');
                    var device = Controller_1.default.setDevice({
                        id: key,
                        data: tmp,
                        type: 2,
                        lanType: 'enhanced_plug',
                    });
                    callback && callback(device);
                }
                if (((_f = tmp.txt) === null || _f === void 0 ? void 0 : _f.type) === 'th_plug') {
                    console.log('Found Lan 单通道温湿度控制器');
                    var device = Controller_1.default.setDevice({
                        id: key,
                        data: tmp,
                        type: 2,
                        lanType: 'th_plug',
                    });
                    callback && callback(device);
                }
                if (((_g = tmp.txt) === null || _g === void 0 ? void 0 : _g.type) === 'light') {
                    console.log('Found Lan 双色灯球 or RBG五色灯');
                    // todo 如何区分双色灯跟五色灯
                    // * 目前发现无法通过局域网进行控制
                    // const device = Controller.setDevice({
                    //     id: key,
                    //     data: tmp as TypeLanDevice,
                    //     type: 2,
                    //     lanType: 'light',
                    // });
                    // callback && callback(device);
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
