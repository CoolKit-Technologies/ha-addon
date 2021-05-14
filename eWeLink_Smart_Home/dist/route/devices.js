"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var devices_1 = require("../services/devices");
var router = express_1.default.Router();
// 获取设备列表
router.get('/', devices_1.getDevices);
// 刷新设备列表
router.get('/refresh', function (req, res, next) {
    req.body.refresh = true;
    next();
}, devices_1.getDevices);
// 获取单个设备信息
router.get('/device', devices_1.getDeviceById);
// 升级固件
router.post('/device/upgrade', devices_1.upgradeDevice);
// 禁用实体
router.post('/disabled', devices_1.disableDevice);
// 更改设备名称
router.post('/updateName', devices_1.updateDeviceName);
// 更新通道名称
router.post('/updateChannelName', devices_1.updateChannelName);
// 代理到CK-WS
router.post('/proxy2ws', devices_1.proxy2ws);
// 获取OTA信息
router.post('/getOTAinfo', devices_1.getOTAinfo);
// 修改diy设备状态 --> 设备名称 开关 点动 通电状态
router.post('/diy', devices_1.updateDiyDevice);
// 删除DIY设备
router.delete('/diy', devices_1.removeDiyDevice);
// 修改恒温恒湿设备温度单位
router.post('/device/unit', devices_1.changeUnit);
// 修改电量统计设备的费率
router.post('/device/rate', devices_1.setRate);
// 操控lan设备
router.post('/lan', devices_1.updateLanDevice);
exports.default = router;
