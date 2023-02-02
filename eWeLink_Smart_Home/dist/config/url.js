"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HaRestURL = exports.HaSocketURL = void 0;
var process_1 = __importDefault(require("process"));
var config_1 = require("./config");
var url = 'http://homeassistant:8123';
if (!config_1.debugMode && config_1.isSupervisor) {
    url = 'http://supervisor/core';
}
if (!config_1.debugMode && !config_1.isSupervisor) {
    url = process_1.default.env.HA_URL;
}
if (process_1.default.env.DEBUG_MODE) {
    url = process_1.default.env.HASS_URL;
}
if (!url) {
    throw new Error('You have to set the HA_URL');
}
url = url.replace(/\/$/, '');
var HaSocketURL = "".concat(url, "/api/websocket");
exports.HaSocketURL = HaSocketURL;
var HaRestURL = url;
exports.HaRestURL = HaRestURL;
if (process_1.default.env.HA_URL) {
    var hassHost = process_1.default.env.HA_URL.slice(7);
    exports.HaSocketURL = HaSocketURL = "ws://".concat(hassHost, "/api/websocket");
    exports.HaRestURL = HaRestURL = "http://".concat(hassHost);
}
