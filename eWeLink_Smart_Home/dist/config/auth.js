"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HaToken = void 0;
var process_1 = __importDefault(require("process"));
var config_1 = require("./config");
var auth;
exports.HaToken = auth;
if (config_1.debugMode) {
    exports.HaToken = auth = process_1.default.env.HASS_LLAT;
}
