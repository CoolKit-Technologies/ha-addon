"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sse_1 = __importDefault(require("../services/sse"));
var router = express_1.default.Router();
router.get('/', sse_1.default);
exports.default = router;
