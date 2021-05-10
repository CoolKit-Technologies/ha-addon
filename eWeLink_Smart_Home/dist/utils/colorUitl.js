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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRGB2HS = exports.parseHS2RGB = void 0;
var color_convert_1 = __importDefault(require("color-convert"));
var parseRGB2HS = function (red, green, blue) {
    var _a = __read(color_convert_1.default.rgb.hsl(red, green, blue), 2), hue = _a[0], saturation = _a[1];
    return [hue, saturation];
};
exports.parseRGB2HS = parseRGB2HS;
var parseHS2RGB = function (hs) {
    return color_convert_1.default.hsl.rgb(__spread(hs, [50]));
};
exports.parseHS2RGB = parseHS2RGB;
