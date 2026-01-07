"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("../services/user");
var router = express_1.default.Router();
router.post('/login', user_1.login);
router.post('/logout', user_1.logout);
router.post('/isLogin', user_1.isLogin);
router.post('/auth', user_1.auth);
router.get('/isAuth', user_1.isAuth);
exports.default = router;
