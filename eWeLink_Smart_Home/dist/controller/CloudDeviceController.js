"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CloudDeviceController = /** @class */ (function () {
    function CloudDeviceController(data) {
        this.type = 4;
        this.rssi = data.params.rssi;
        this.apikey = data.apikey;
        this.deviceId = data.deviceId;
        this.deviceName = data.deviceName;
        this.extra = data.extra;
        this.index = data.index;
        this.online = data.online;
    }
    return CloudDeviceController;
}());
exports.default = CloudDeviceController;
