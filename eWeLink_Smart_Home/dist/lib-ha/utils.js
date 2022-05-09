"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHaBrightness = exports.getCkBrightness = exports.getHaColorTemp = exports.getCkColorTemp = exports.getCkDeviceModelIdByUiid = exports.getHaDeviceUiid = void 0;
var const_1 = require("./const");
var WebSocket2Ha_1 = require("./WebSocket2Ha");
var process_1 = __importDefault(require("process"));
function getHaDeviceUiid(data) {
    var entityNum = data.entities.length;
    if (entityNum > 4) {
        return -1;
    }
    else if (entityNum === 1 && WebSocket2Ha_1.getEntityTypeById(data.entities[0].entityData.entity_id) === 'switch') {
        return const_1.CK_UIID_20001;
    }
    else if (entityNum === 2
        && WebSocket2Ha_1.getEntityTypeById(data.entities[0].entityData.entity_id) === 'switch'
        && WebSocket2Ha_1.getEntityTypeById(data.entities[1].entityData.entity_id) === 'switch') {
        return const_1.CK_UIID_20002;
    }
    else if (entityNum === 3
        && WebSocket2Ha_1.getEntityTypeById(data.entities[0].entityData.entity_id) === 'switch'
        && WebSocket2Ha_1.getEntityTypeById(data.entities[1].entityData.entity_id) === 'switch'
        && WebSocket2Ha_1.getEntityTypeById(data.entities[2].entityData.entity_id) === 'switch') {
        return const_1.CK_UIID_20003;
    }
    else if (entityNum === 4
        && WebSocket2Ha_1.getEntityTypeById(data.entities[0].entityData.entity_id) === 'switch'
        && WebSocket2Ha_1.getEntityTypeById(data.entities[1].entityData.entity_id) === 'switch'
        && WebSocket2Ha_1.getEntityTypeById(data.entities[2].entityData.entity_id) === 'switch'
        && WebSocket2Ha_1.getEntityTypeById(data.entities[3].entityData.entity_id) === 'switch') {
        return const_1.CK_UIID_20004;
    }
    else if (entityNum === 1 && WebSocket2Ha_1.getEntityTypeById(data.entities[0].entityData.entity_id) === 'light') {
        var supportedColorMode = data.entities[0].entityState.attributes.supported_color_modes;
        if (supportedColorMode.includes(const_1.HA_COLOR_MODE_COLOR_TEMP)
            && supportedColorMode.includes(const_1.HA_COLOR_MODE_XY)) {
            return const_1.CK_UIID_20008;
        }
        else if (supportedColorMode.includes(const_1.HA_COLOR_MODE_COLOR_TEMP)) {
            return const_1.CK_UIID_20007;
        }
        else if (supportedColorMode.includes(const_1.HA_COLOR_MODE_BRIGHTNESS)) {
            return const_1.CK_UIID_20006;
        }
        else if (supportedColorMode.length !== 0) {
            return const_1.CK_UIID_20005;
        }
        else {
            return -1;
        }
    }
    else {
        return -1;
    }
}
exports.getHaDeviceUiid = getHaDeviceUiid;
function isCkApiTest() {
    return process_1.default.env.CK_API_ENV === 'test';
}
function getCkDeviceModelIdByUiid(uiid) {
    if (uiid === const_1.CK_UIID_20001) {
        return isCkApiTest() ? '620a2e3a2ce380e4ddb648af' : '620c592e8d85576e68376d34';
    }
    else if (uiid === const_1.CK_UIID_20002) {
        return isCkApiTest() ? '620a2e4f2ce380e4ddb648b0' : '620c59478d85576e68376d35';
    }
    else if (uiid === const_1.CK_UIID_20003) {
        return isCkApiTest() ? '620a2e672ce380e4ddb648b1' : '620c59d58d85576e68376d36';
    }
    else if (uiid === const_1.CK_UIID_20004) {
        return isCkApiTest() ? '620a2e922ce380e4ddb648b2' : '620c59ea8d85576e68376d37';
    }
    else if (uiid === const_1.CK_UIID_20005) {
        return isCkApiTest() ? '620a2ea82ce380e4ddb648b3' : '620c59fd8d85576e68376d38';
    }
    else if (uiid === const_1.CK_UIID_20006) {
        return isCkApiTest() ? '620a2ed42ce380e4ddb648b4' : '620c5a148d85576e68376d39';
    }
    else if (uiid === const_1.CK_UIID_20007) {
        return isCkApiTest() ? '620a2ee72ce380e4ddb648b5' : '620c5a598d85576e68376d3a';
    }
    else if (uiid === const_1.CK_UIID_20008) {
        return isCkApiTest() ? '620a2efa2ce380e4ddb648b6' : '620c5a748d85576e68376d3b';
    }
    else {
        return 'n/a';
    }
}
exports.getCkDeviceModelIdByUiid = getCkDeviceModelIdByUiid;
function getCkColorTemp(min, max, n) {
    var a1 = const_1.CK_COLOR_TEMP_MIN - const_1.CK_COLOR_TEMP_MAX;
    var b1 = max - min;
    var b2 = max - n;
    var x = Math.round(-(a1 * b2 / b1 - const_1.CK_COLOR_TEMP_MIN));
    return x;
}
exports.getCkColorTemp = getCkColorTemp;
function getHaColorTemp(min, max, n) {
    var a1 = const_1.CK_COLOR_TEMP_MIN - const_1.CK_COLOR_TEMP_MAX;
    var b1 = max - min;
    var a2 = const_1.CK_COLOR_TEMP_MIN - n;
    var x = Math.round(-(a2 * b1 / a1 - max));
    return x;
}
exports.getHaColorTemp = getHaColorTemp;
function getCkBrightness(haBr) {
    var result = Math.round(haBr / const_1.HA_BRIGHTNESS_MAX * 100);
    return result;
}
exports.getCkBrightness = getCkBrightness;
function getHaBrightness(ckBr) {
    var result = Math.round(ckBr / 100 * const_1.HA_BRIGHTNESS_MAX);
    return result;
}
exports.getHaBrightness = getHaBrightness;
