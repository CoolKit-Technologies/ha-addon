"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsupportedLanModeModelSet = exports.unsupportedLanModeUiidSet = exports.multiChannelSwitchUiidSet = exports.switchUiidSet = void 0;
var switchUiidSet = new Set([
    1,
    6,
    14,
    1009,
    1256, // Zigbee单通道开关
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
    141, // MiniR3
]);
exports.multiChannelSwitchUiidSet = multiChannelSwitchUiidSet;
// 有局域网功能但不支持的设备
var unsupportedLanModeUiidSet = new Set([
    138,
    139,
    140,
    141, // MiniR3
]);
exports.unsupportedLanModeUiidSet = unsupportedLanModeUiidSet;
// 不支持局域网控制的固件
var unsupportedLanModeModelSet = new Set([
    'CKA-D01-GL', // 该model(UIID2)局域网控制不稳定，不做局域网控制
]);
exports.unsupportedLanModeModelSet = unsupportedLanModeModelSet;
