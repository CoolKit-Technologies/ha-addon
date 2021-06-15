"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HaRestURL = exports.HaSocketURL = void 0;
var config_1 = require("./config");
var url = 'http://homeassistant:8123';
// let url = 'http://192.168.1.111:8123';
if (!config_1.debugMode && config_1.isSupervisor) {
    // url = getDataSync('options.json', ['home_assistant_url']);
    url = 'http://supervisor/core';
}
if (!config_1.debugMode && !config_1.isSupervisor) {
    url = process.env.HA_URL;
}
if (!url) {
    throw new Error('You have to set the HA_URL');
}
// let HaSocketURL = `http://192.168.1.133:8123/api/websocket`;
// let HaRestURL = `http://192.168.1.133:8123`;
url = url.replace(/\/$/, '');
var HaSocketURL = url + "/api/websocket";
exports.HaSocketURL = HaSocketURL;
var HaRestURL = url;
exports.HaRestURL = HaRestURL;
