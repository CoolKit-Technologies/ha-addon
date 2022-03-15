"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HaRestURL = exports.HaSocketURL = void 0;
var config_1 = require("./config");
var url = 'http://homeassistant:8123';
if (!config_1.debugMode && config_1.isSupervisor) {
    url = 'http://supervisor/core';
}
if (!config_1.debugMode && !config_1.isSupervisor) {
    url = process.env.HA_URL;
}
if (!url) {
    throw new Error('You have to set the HA_URL');
}
url = url.replace(/\/$/, '');
var HaSocketURL = url + "/api/websocket";
exports.HaSocketURL = HaSocketURL;
var HaRestURL = url;
exports.HaRestURL = HaRestURL;
