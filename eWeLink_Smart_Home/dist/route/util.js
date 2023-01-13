"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var util_1 = require("../services/util");
var router = express_1.default.Router();
router.post('/syncLovelaceCard', util_1.syncLovelaceCard);
exports.default = router;
