"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsupportedLanModeUiidSet = exports.multiChannelSwitchUiidSet = exports.switchUiidSet = void 0;
var switchUiidSet = new Set([
    1,
    6,
    14,
    1009,
    1256,
]);
exports.switchUiidSet = switchUiidSet;
// not include DualR3
var multiChannelSwitchUiidSet = new Set([
    2,
    3,
    4,
    7,
    8,
    9,
    77,
    78,
    112,
    113,
    114,
    138,
    139,
    140,
    141,
]);
exports.multiChannelSwitchUiidSet = multiChannelSwitchUiidSet;
// 有局域网功能但不支持的设备
var unsupportedLanModeUiidSet = new Set([
    138,
    139,
    140,
    141,
]);
exports.unsupportedLanModeUiidSet = unsupportedLanModeUiidSet;
