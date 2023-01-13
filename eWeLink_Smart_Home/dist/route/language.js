"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var language_1 = require("../services/language");
var router = express_1.default.Router();
router.get('/', language_1.getLanguage);
exports.default = router;
