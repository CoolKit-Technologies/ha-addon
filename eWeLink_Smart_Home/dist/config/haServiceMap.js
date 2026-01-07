"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var haServiceMap = new Map([
    ['turn_on', 'on'],
    ['turn_off', 'off'],
    ['open_cover', 'on'],
    ['close_cover', 'off'],
    ['stop_cover', 'pause'],
    ['set_cover_position', 'on'],
    ['set_preset_mode', 'on'],
]);
exports.default = haServiceMap;
