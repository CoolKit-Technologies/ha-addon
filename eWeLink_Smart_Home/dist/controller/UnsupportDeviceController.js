"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnsupportDeviceController = /** @class */ (function () {
    function UnsupportDeviceController(params) {
        this.uiid = 1;
        this.params = params.params;
        this.uiid = params.extra.uiid;
        this.online = params.online;
    }
    return UnsupportDeviceController;
}());
exports.default = UnsupportDeviceController;
