"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var restApi_1 = require("../apis/restApi");
exports.default = (function () {
    restApi_1.registerService('switch', 'toggle');
    restApi_1.registerService('switch', 'turn_on');
    restApi_1.registerService('switch', 'turn_off');
    restApi_1.registerService('light', 'toggle');
    restApi_1.registerService('light', 'turn_on');
    restApi_1.registerService('light', 'turn_off');
});
