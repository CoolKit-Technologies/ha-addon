"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnsupportDeviceController = (function () {
    function UnsupportDeviceController(params) {
        this.params = params.params;
        this.uiid = params.extra.uiid;
        this.online = params.online;
        this.deviceId = params.deviceId;
        this.deviceName = params.deviceName;
    }
    return UnsupportDeviceController;
}());
exports.default = UnsupportDeviceController;
