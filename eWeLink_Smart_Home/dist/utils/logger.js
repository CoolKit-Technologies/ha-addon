"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = require("winston");
exports.logger = winston_1.createLogger({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf(function (_a) {
        var timestamp = _a.timestamp, level = _a.level, message = _a.message;
        return timestamp + " [" + level.toUpperCase() + "] " + message;
    })),
    transports: [new winston_1.transports.Console(), new winston_1.transports.File({ filename: 'total.log' })]
});
