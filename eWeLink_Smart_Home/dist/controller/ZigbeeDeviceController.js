"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ZigbeeDeviceController = /** @class */ (function () {
    function ZigbeeDeviceController(data) {
        this.type = 8;
        this.extra = data.extra;
        this.uiid = this.extra.uiid;
        this.disabled = data.disabled || false;
        this.deviceId = data.deviceId;
        this.deviceName = data.deviceName;
        this.apikey = data.apikey;
        this.online = data.online;
        this.index = data.index;
    }
    return ZigbeeDeviceController;
}());
exports.default = ZigbeeDeviceController;
