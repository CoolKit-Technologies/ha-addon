"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsupportedLanModeModelSet = exports.unsupportedLanModeUiidSet = exports.zigbeeMultiSwitchSet = exports.multiChannelSwitchUiidSet = exports.switchUiidSet = void 0;
var switchUiidSet = new Set([
    1,
    6,
    14,
    1009,
    1256,
    7004,
]);
exports.switchUiidSet = switchUiidSet;
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
    130,
    138,
    139,
    140,
    141,
    133,
    138,
    160,
    161,
    162,
    182,
]);
exports.multiChannelSwitchUiidSet = multiChannelSwitchUiidSet;
var zigbeeMultiSwitchSet = new Set([
    2256,
    3256,
    4256
]);
exports.zigbeeMultiSwitchSet = zigbeeMultiSwitchSet;
var unsupportedLanModeUiidSet = new Set([
    138,
    139,
    140,
    141,
    160,
    161,
    162
]);
exports.unsupportedLanModeUiidSet = unsupportedLanModeUiidSet;
var unsupportedLanModeModelSet = new Set([
    'CKA-D01-GL',
]);
exports.unsupportedLanModeModelSet = unsupportedLanModeModelSet;
