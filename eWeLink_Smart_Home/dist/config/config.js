"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSupervisor = exports.debugMode = void 0;
var debugMode = Boolean(process.env.DEBUG_MODE);
exports.debugMode = debugMode;
var isSupervisor = Boolean(process.env.SUPERVISOR_TOKEN);
exports.isSupervisor = isSupervisor;
