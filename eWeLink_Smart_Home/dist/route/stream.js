"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var sse_1 = __importDefault(require("../services/sse"));
var router = express_1.default.Router();
router.get('/', (0, cors_1.default)(), sse_1.default);
exports.default = router;
