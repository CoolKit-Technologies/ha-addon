"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var devices_1 = require("../services/devices");
var router = express_1.default.Router();
router.get('/', devices_1.getDevices);
router.get('/refresh', function (req, res, next) {
    req.body.refresh = true;
    next();
}, devices_1.getDevices);
router.get('/device', devices_1.getDeviceById);
router.post('/device/upgrade', devices_1.upgradeDevice);
router.post('/disabled', devices_1.disableDevice);
router.post('/updateName', devices_1.updateDeviceName);
router.post('/updateChannelName', devices_1.updateChannelName);
router.post('/proxy2ws', devices_1.proxy2ws);
router.post('/getOTAinfo', devices_1.getOTAinfo);
router.post('/diy', devices_1.updateDiyDevice);
router.delete('/diy', devices_1.removeDiyDevice);
router.post('/device/unit', devices_1.changeUnit);
router.post('/device/rate', devices_1.setRate);
router.post('/device/tempHumHistory', devices_1.getDevTempHumHistory);
router.post('/lan', devices_1.updateLanDevice);
router.post('/electricRate', devices_1.updateElectricRate);
exports.default = router;
