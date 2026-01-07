"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHaBrightness = exports.getCkBrightness = exports.getHaColorTemp = exports.getCkColorTemp = exports.getCkDeviceModelIdByUiid = exports.getHaDeviceUiid = void 0;
var const_1 = require("./const");
var WebSocket2Ha_1 = require("./WebSocket2Ha");
var process_1 = __importDefault(require("process"));
var logger_1 = require("../utils/logger");
function getHaDeviceUiid(data) {
    var e_1, _a, e_2, _b, e_3, _c;
    try {
        var type = '';
        try {
            for (var _d = __values(data.entities), _e = _d.next(); !_e.done; _e = _d.next()) {
                var ent = _e.value;
                if ((0, WebSocket2Ha_1.getEntityTypeById)(ent.entityData.entity_id) === 'light') {
                    type = 'light';
                    break;
                }
                else if ((0, WebSocket2Ha_1.getEntityTypeById)(ent.entityData.entity_id) === 'switch') {
                    type = 'switch';
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (type === 'light') {
            var lightEntity = void 0;
            try {
                for (var _f = __values(data.entities), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var ent = _g.value;
                    if ((0, WebSocket2Ha_1.getEntityTypeById)(ent.entityData.entity_id) === 'light') {
                        lightEntity = ent;
                        break;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                }
                finally { if (e_2) throw e_2.error; }
            }
            var supportedColorMode = lightEntity === null || lightEntity === void 0 ? void 0 : lightEntity.entityState.attributes.supported_color_modes;
            if (supportedColorMode.includes(const_1.HA_COLOR_MODE_COLOR_TEMP)
                && (supportedColorMode.includes(const_1.HA_COLOR_MODE_XY) || supportedColorMode.includes(const_1.HA_COLOR_MODE_HS))) {
                return const_1.CK_UIID_20008;
            }
            else if (supportedColorMode.includes(const_1.HA_COLOR_MODE_COLOR_TEMP)) {
                return const_1.CK_UIID_20007;
            }
            else if (supportedColorMode.includes(const_1.HA_COLOR_MODE_BRIGHTNESS)) {
                return const_1.CK_UIID_20006;
            }
            else if (supportedColorMode.length !== 0) {
                return const_1.CK_UIID_20005;
            }
            else {
                return -1;
            }
        }
        else if (type === 'switch') {
            var switchCnt = 0;
            try {
                for (var _h = __values(data.entities), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var ent = _j.value;
                    if ((0, WebSocket2Ha_1.getEntityTypeById)(ent.entityData.entity_id) === 'switch') {
                        switchCnt++;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                }
                finally { if (e_3) throw e_3.error; }
            }
            if (switchCnt === 1) {
                return const_1.CK_UIID_20001;
            }
            else if (switchCnt === 2) {
                return const_1.CK_UIID_20002;
            }
            else if (switchCnt === 3) {
                return const_1.CK_UIID_20003;
            }
            else {
                return const_1.CK_UIID_20004;
            }
        }
        else {
            logger_1.logger.info("getHaDeviceUiid(): unsupport ha device data: ".concat(JSON.stringify(data)));
            return -1;
        }
    }
    catch (err) {
        console.error('getHaDeviceUiid() error', err);
        console.error('ha device data:', JSON.stringify(data));
        return -1;
    }
}
exports.getHaDeviceUiid = getHaDeviceUiid;
function isCkApiTest() {
    return process_1.default.env.CK_API_ENV === 'test';
}
function getCkDeviceModelIdByUiid(uiid) {
    if (uiid === const_1.CK_UIID_20001) {
        return isCkApiTest() ? '620a2e3a2ce380e4ddb648af' : '620c592e8d85576e68376d34';
    }
    else if (uiid === const_1.CK_UIID_20002) {
        return isCkApiTest() ? '620a2e4f2ce380e4ddb648b0' : '620c59478d85576e68376d35';
    }
    else if (uiid === const_1.CK_UIID_20003) {
        return isCkApiTest() ? '620a2e672ce380e4ddb648b1' : '620c59d58d85576e68376d36';
    }
    else if (uiid === const_1.CK_UIID_20004) {
        return isCkApiTest() ? '620a2e922ce380e4ddb648b2' : '620c59ea8d85576e68376d37';
    }
    else if (uiid === const_1.CK_UIID_20005) {
        return isCkApiTest() ? '620a2ea82ce380e4ddb648b3' : '620c59fd8d85576e68376d38';
    }
    else if (uiid === const_1.CK_UIID_20006) {
        return isCkApiTest() ? '620a2ed42ce380e4ddb648b4' : '620c5a148d85576e68376d39';
    }
    else if (uiid === const_1.CK_UIID_20007) {
        return isCkApiTest() ? '620a2ee72ce380e4ddb648b5' : '620c5a598d85576e68376d3a';
    }
    else if (uiid === const_1.CK_UIID_20008) {
        return isCkApiTest() ? '620a2efa2ce380e4ddb648b6' : '620c5a748d85576e68376d3b';
    }
    else {
        return 'n/a';
    }
}
exports.getCkDeviceModelIdByUiid = getCkDeviceModelIdByUiid;
function getCkColorTemp(min, max, n) {
    var a1 = const_1.CK_COLOR_TEMP_MIN - const_1.CK_COLOR_TEMP_MAX;
    var b1 = max - min;
    var b2 = max - n;
    var x = Math.round(-(a1 * b2 / b1 - const_1.CK_COLOR_TEMP_MIN));
    return x;
}
exports.getCkColorTemp = getCkColorTemp;
function getHaColorTemp(min, max, n) {
    var a1 = const_1.CK_COLOR_TEMP_MIN - const_1.CK_COLOR_TEMP_MAX;
    var b1 = max - min;
    var a2 = const_1.CK_COLOR_TEMP_MIN - n;
    var x = Math.round(-(a2 * b1 / a1 - max));
    return x;
}
exports.getHaColorTemp = getHaColorTemp;
function getCkBrightness(haBr) {
    var result = Math.round(haBr / const_1.HA_BRIGHTNESS_MAX * 100);
    return result;
}
exports.getCkBrightness = getCkBrightness;
function getHaBrightness(ckBr) {
    var result = Math.round(ckBr / 100 * const_1.HA_BRIGHTNESS_MAX);
    return result;
}
exports.getHaBrightness = getHaBrightness;
