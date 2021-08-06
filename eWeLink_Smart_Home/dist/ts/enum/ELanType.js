"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ELanType;
(function (ELanType) {
    /** 单通道 */
    ELanType["Plug"] = "plug";
    /** 多通道 */
    ELanType["Strip"] = "strip";
    /** DualR3 */
    ELanType["MultifunSwitch"] = "multifun_switch";
    /** 温湿度开关 */
    ELanType["THPlug"] = "th_plug";
    /** 功率检查插座 */
    ELanType["EnhancedPlug"] = "enhanced_plug";
    /** RF-Bridge */
    ELanType["RF"] = "rf";
    /** 风扇灯 */
    ELanType["FanLight"] = "fan_light";
    /** 灯球+灯泡 */
    ELanType["Light"] = "light";
})(ELanType || (ELanType = {}));
exports.default = ELanType;
