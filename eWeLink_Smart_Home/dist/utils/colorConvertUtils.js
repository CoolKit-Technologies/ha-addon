"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbToHue = exports.hueToRgb = void 0;
var color_convert_1 = __importDefault(require("color-convert"));
function hueToRgb(hue, saturation) {
    var hsv = [hue, saturation, 100];
    return color_convert_1.default.hsv.rgb(hsv);
}
exports.hueToRgb = hueToRgb;
function rgbToHue(rgb) {
    return color_convert_1.default.rgb.hsv(rgb);
}
exports.rgbToHue = rgbToHue;
