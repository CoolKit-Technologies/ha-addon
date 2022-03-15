"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaxChannelByUiid = void 0;
var channelMap = new Map([
    [2, 2],
    [3, 3],
    [4, 4],
    [7, 2],
    [8, 3],
    [9, 4],
    [77, 1],
    [78, 1],
    [112, 1],
    [113, 2],
    [114, 3],
    [126, 2],
    [138, 1],
    [139, 2],
    [140, 3],
    [141, 4],
]);
var getMaxChannelByUiid = function (uiid) {
    return channelMap.get(uiid) || 0;
};
exports.getMaxChannelByUiid = getMaxChannelByUiid;
