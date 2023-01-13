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
exports.assignDeviceParams = void 0;
var lodash_1 = __importDefault(require("lodash"));
exports.default = (function (source, params) {
    return lodash_1.default.mergeWith(source, params, function (objVal, srcVal, key) {
        var e_1, _a;
        if (key === 'rfList') {
            return srcVal;
        }
        if (key.includes('lightScenes')) {
            return srcVal;
        }
        if (key === 'locks') {
            return srcVal;
        }
        if (Array.isArray(objVal) && Array.isArray(srcVal)) {
            try {
                for (var srcVal_1 = __values(srcVal), srcVal_1_1 = srcVal_1.next(); !srcVal_1_1.done; srcVal_1_1 = srcVal_1.next()) {
                    var item = srcVal_1_1.value;
                    if (item.outlet !== undefined) {
                        objVal[item.outlet] = item;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (srcVal_1_1 && !srcVal_1_1.done && (_a = srcVal_1.return)) _a.call(srcVal_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return objVal;
        }
        return srcVal;
    });
});
function assignDeviceParams(object, source) {
    return lodash_1.default.assign(object, source);
}
exports.assignDeviceParams = assignDeviceParams;
