"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CloudDeviceController = (function () {
    function CloudDeviceController(data) {
        this.type = 4;
        this.apikey = data.apikey;
        this.deviceId = data.deviceId;
        this.deviceName = data.deviceName;
        this.extra = data.extra;
        this.index = data.index;
        this.online = data.online;
        this.devicekey = data.devicekey;
        this.disabled = data.disabled || false;
    }
    return CloudDeviceController;
}());
exports.default = CloudDeviceController;
