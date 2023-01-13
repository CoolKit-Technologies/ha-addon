"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCkWsUpdateMessage = exports.sendWsUpdateMsg2Ha = exports.handleHaLight = exports.handleHaSwitch = exports.getDeviceUpdateParams = exports.initDeviceParams = exports.getEntityListByType = void 0;
var const_1 = require("./const");
var lodash_1 = __importDefault(require("lodash"));
var init_1 = require("./init");
var coolkit_ws_device_1 = __importDefault(require("coolkit-ws-device"));
var utils_1 = require("./utils");
var logger_1 = require("../utils/logger");
var WebSocket2Ha_1 = require("./WebSocket2Ha");
function checkUnavailableState(state) {
    return state === 'unavailable' ? 'off' : state;
}
function getEntityListByType(entities, type) {
    var e_1, _a;
    var entList = [];
    try {
        for (var entities_1 = __values(entities), entities_1_1 = entities_1.next(); !entities_1_1.done; entities_1_1 = entities_1.next()) {
            var ent = entities_1_1.value;
            if ((0, WebSocket2Ha_1.getEntityTypeById)(ent.entityId) === type) {
                entList.push(ent);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (entities_1_1 && !entities_1_1.done && (_a = entities_1.return)) _a.call(entities_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return entList;
}
exports.getEntityListByType = getEntityListByType;
function initDeviceParams(data) {
    var uiid = data.deviceUiid;
    var haDeviceData = data.haDeviceData;
    var params = null;
    if (uiid === const_1.CK_UIID_20001) {
        var entList = getEntityListByType(haDeviceData.entities, 'switch');
        params = {
            switch: checkUnavailableState(entList[0].entityState.state)
        };
    }
    else if (uiid === const_1.CK_UIID_20002) {
        var entList = getEntityListByType(haDeviceData.entities, 'switch');
        params = {
            switches: [
                {
                    switch: checkUnavailableState(entList[0].entityState.state),
                    outlet: 0
                },
                {
                    switch: checkUnavailableState(entList[1].entityState.state),
                    outlet: 1
                }
            ]
        };
    }
    else if (uiid === const_1.CK_UIID_20003) {
        var entList = getEntityListByType(haDeviceData.entities, 'switch');
        params = {
            switches: [
                {
                    switch: checkUnavailableState(entList[0].entityState.state),
                    outlet: 0
                },
                {
                    switch: checkUnavailableState(entList[1].entityState.state),
                    outlet: 1
                },
                {
                    switch: checkUnavailableState(entList[2].entityState.state),
                    outlet: 2
                }
            ]
        };
    }
    else if (uiid === const_1.CK_UIID_20004) {
        var entList = getEntityListByType(haDeviceData.entities, 'switch');
        params = {
            switches: [
                {
                    switch: checkUnavailableState(entList[0].entityState.state),
                    outlet: 0
                },
                {
                    switch: checkUnavailableState(entList[1].entityState.state),
                    outlet: 1
                },
                {
                    switch: checkUnavailableState(entList[2].entityState.state),
                    outlet: 2
                },
                {
                    switch: checkUnavailableState(entList[3].entityState.state),
                    outlet: 3
                },
            ]
        };
    }
    else if (uiid === const_1.CK_UIID_20005) {
        var entList = getEntityListByType(haDeviceData.entities, 'light');
        var entityState = entList[0].entityState;
        params = {
            switch: checkUnavailableState(entityState.state)
        };
    }
    else if (uiid === const_1.CK_UIID_20006) {
        var entList = getEntityListByType(haDeviceData.entities, 'light');
        var entityState = entList[0].entityState;
        if (entityState.state === 'on') {
            var brightness = entityState.attributes.brightness;
            params = {
                switch: checkUnavailableState(entityState.state),
                brightness: (0, utils_1.getCkBrightness)(brightness)
            };
        }
        else {
            params = {
                switch: entityState.state
            };
        }
    }
    else if (uiid === const_1.CK_UIID_20007) {
        var entList = getEntityListByType(haDeviceData.entities, 'light');
        var entityState = entList[0].entityState;
        if (entityState.state === 'on') {
            var _a = entityState.attributes, brightness = _a.brightness, min_mireds = _a.min_mireds, max_mireds = _a.max_mireds, color_temp = _a.color_temp;
            params = {
                switch: checkUnavailableState(entityState.state),
                brightness: (0, utils_1.getCkBrightness)(brightness),
                colorTemp: (0, utils_1.getCkColorTemp)(min_mireds, max_mireds, color_temp),
            };
        }
        else {
            params = {
                switch: entityState.state
            };
        }
    }
    else if (uiid === const_1.CK_UIID_20008) {
        var entList = getEntityListByType(haDeviceData.entities, 'light');
        var entityState = entList[0].entityState;
        if (entityState.state === 'on') {
            var _b = entityState.attributes, color_mode = _b.color_mode, brightness = _b.brightness, min_mireds = _b.min_mireds, max_mireds = _b.max_mireds, color_temp = _b.color_temp, hs_color = _b.hs_color;
            params = {
                switch: checkUnavailableState(entityState.state)
            };
            if (color_mode === const_1.HA_COLOR_MODE_XY) {
                lodash_1.default.set(params, 'colorMode', const_1.CK_COLOR_MODE_RGB);
                lodash_1.default.set(params, 'rgbBrightness', (0, utils_1.getCkBrightness)(brightness));
                lodash_1.default.set(params, 'hue', Math.round(hs_color[0]));
                lodash_1.default.set(params, 'saturation', Math.round(hs_color[1]));
            }
            else if (color_mode === const_1.HA_COLOR_MODE_COLOR_TEMP) {
                lodash_1.default.set(params, 'colorMode', const_1.CK_COLOR_MODE_CCT);
                lodash_1.default.set(params, 'cctBrightness', (0, utils_1.getCkBrightness)(brightness));
                lodash_1.default.set(params, 'colorTemp', (0, utils_1.getCkColorTemp)(min_mireds, max_mireds, color_temp));
            }
        }
        else {
            params = {
                switch: entityState.state
            };
        }
    }
    logger_1.logger.verbose("initDeviceParams: ".concat(JSON.stringify(params)));
    return params;
}
exports.initDeviceParams = initDeviceParams;
function getDeviceUpdateParams(deviceData, oldState, newState, haOldState) {
    var uiid = deviceData.deviceUiid;
    var entityId = newState.entity_id;
    var params = null;
    if (uiid === const_1.CK_UIID_20001) {
        params = {
            switch: newState.state
        };
    }
    else if (uiid === const_1.CK_UIID_20002 || uiid === const_1.CK_UIID_20003 || uiid === const_1.CK_UIID_20004) {
        var entList = getEntityListByType(deviceData.haDeviceData.entities, 'switch');
        var index = lodash_1.default.findIndex(entList, { entityId: entityId });
        if (index > 3) {
            return;
        }
        params = {
            switches: oldState.switches
        };
        params.switches[index].switch = newState.state;
    }
    else if (uiid === const_1.CK_UIID_20005) {
        var entList = getEntityListByType(deviceData.haDeviceData.entities, 'light');
        if (entList[0].entityId !== entityId) {
            return;
        }
        params = {
            switch: newState.state
        };
    }
    else if (uiid === const_1.CK_UIID_20006) {
        var entList = getEntityListByType(deviceData.haDeviceData.entities, 'light');
        if (entList[0].entityId !== entityId) {
            return;
        }
        params = {
            switch: newState.state,
            brightness: (0, utils_1.getCkBrightness)(newState.attributes.brightness)
        };
    }
    else if (uiid === const_1.CK_UIID_20007) {
        var entList = getEntityListByType(deviceData.haDeviceData.entities, 'light');
        if (entList[0].entityId !== entityId) {
            return;
        }
        var _a = newState.attributes, brightness = _a.brightness, min_mireds = _a.min_mireds, max_mireds = _a.max_mireds, color_temp = _a.color_temp;
        if (newState.state === 'on') {
            params = {
                switch: newState.state
            };
            if (newState.attributes.brightness === haOldState.attributes.brightness) {
                params.colorTemp = (0, utils_1.getCkColorTemp)(min_mireds, max_mireds, color_temp);
            }
            else {
                params.brightness = (0, utils_1.getCkBrightness)(brightness);
            }
        }
        else {
            params = {
                switch: newState.state
            };
        }
    }
    else if (uiid === const_1.CK_UIID_20008) {
        var entList = getEntityListByType(deviceData.haDeviceData.entities, 'light');
        if (entList[0].entityId !== entityId) {
            return;
        }
        if (newState.state === 'on') {
            var _b = newState.attributes, color_mode = _b.color_mode, brightness = _b.brightness, min_mireds = _b.min_mireds, max_mireds = _b.max_mireds, color_temp = _b.color_temp, hs_color = _b.hs_color;
            params = {
                switch: newState.state
            };
            if (color_mode === const_1.HA_COLOR_MODE_XY) {
                lodash_1.default.set(params, 'colorMode', const_1.CK_COLOR_MODE_RGB);
                lodash_1.default.set(params, 'rgbBrightness', (0, utils_1.getCkBrightness)(brightness));
                lodash_1.default.set(params, 'hue', Math.round(hs_color[0]));
                lodash_1.default.set(params, 'saturation', Math.round(hs_color[1]));
            }
            else if (color_mode === const_1.HA_COLOR_MODE_COLOR_TEMP) {
                lodash_1.default.set(params, 'colorMode', const_1.CK_COLOR_MODE_CCT);
                lodash_1.default.set(params, 'cctBrightness', (0, utils_1.getCkBrightness)(brightness));
                lodash_1.default.set(params, 'colorTemp', (0, utils_1.getCkColorTemp)(min_mireds, max_mireds, color_temp));
            }
        }
        else {
            params = {
                switch: newState.state
            };
        }
    }
    return params;
}
exports.getDeviceUpdateParams = getDeviceUpdateParams;
function getToggleParams(deviceData, updateParams) {
    var i = updateParams.switches[0].outlet;
    var entList = getEntityListByType(deviceData.haDeviceData.entities, 'switch');
    var params = {
        type: const_1.HA_WSMSG_TYPE_EXECUTE_SCRIPT,
        sequence: [
            {
                service: updateParams.switches[0].switch === 'on' ? const_1.HA_SERVICE_SWITCH_TURN_ON : const_1.HA_SERVICE_SWITCH_TURN_OFF,
                target: {
                    entity_id: entList[i].entityId
                }
            }
        ]
    };
    return params;
}
function getToggleAllParams(deviceData, updateParams, uiid) {
    var entList = getEntityListByType(deviceData.haDeviceData.entities, 'switch');
    var n = 0;
    if (uiid === const_1.CK_UIID_20002) {
        n = 2;
    }
    else if (uiid === const_1.CK_UIID_20003) {
        n = 3;
    }
    else {
        n = 4;
    }
    var params = {
        type: const_1.HA_WSMSG_TYPE_EXECUTE_SCRIPT,
        sequence: []
    };
    for (var i = 0; i < n; i++) {
        var x = updateParams.switches[i].outlet;
        params.sequence.push({
            service: updateParams.switches[i].switch === 'on' ? const_1.HA_SERVICE_SWITCH_TURN_ON : const_1.HA_SERVICE_SWITCH_TURN_OFF,
            target: {
                entity_id: entList[x].entityId
            }
        });
    }
    return params;
}
function handleHaSwitch(deviceData, updateParams) {
    var uiid = deviceData.deviceUiid;
    var params;
    if (uiid === const_1.CK_UIID_20001) {
        var entList = getEntityListByType(deviceData.haDeviceData.entities, 'switch');
        params = {
            type: const_1.HA_WSMSG_TYPE_EXECUTE_SCRIPT,
            sequence: [
                {
                    service: updateParams.switch === 'on' ? const_1.HA_SERVICE_SWITCH_TURN_ON : const_1.HA_SERVICE_SWITCH_TURN_OFF,
                    target: {
                        entity_id: entList[0].entityId
                    }
                }
            ]
        };
    }
    else if (updateParams.switches.length === 1) {
        params = getToggleParams(deviceData, updateParams);
    }
    else {
        params = getToggleAllParams(deviceData, updateParams, uiid);
    }
    init_1.ws2ha.sendMessage(params);
}
exports.handleHaSwitch = handleHaSwitch;
function handleHaLight(deviceData, updateParams) {
    var uiid = deviceData.deviceUiid;
    var entList = getEntityListByType(deviceData.haDeviceData.entities, 'light');
    if (updateParams.switch === 'off') {
        var params_1 = {
            type: const_1.HA_WSMSG_TYPE_EXECUTE_SCRIPT,
            sequence: [
                {
                    service: const_1.HA_SERVICE_LIGHT_TURN_OFF,
                    target: {
                        entity_id: entList[0].entityId
                    },
                    data: {}
                }
            ]
        };
        init_1.ws2ha.sendMessage(params_1);
        return;
    }
    var params = {
        type: const_1.HA_WSMSG_TYPE_EXECUTE_SCRIPT,
        sequence: [
            {
                service: const_1.HA_SERVICE_LIGHT_TURN_ON,
                target: {
                    entity_id: entList[0].entityId
                },
                data: {}
            }
        ]
    };
    if (uiid === const_1.CK_UIID_20005) {
        init_1.ws2ha.sendMessage(params);
    }
    else if (uiid === const_1.CK_UIID_20006) {
        if (typeof updateParams.brightness === 'number') {
            params.sequence[0].data.brightness = (0, utils_1.getHaBrightness)(updateParams.brightness);
        }
        init_1.ws2ha.sendMessage(params);
    }
    else if (uiid === const_1.CK_UIID_20007) {
        if (typeof updateParams.brightness === 'number') {
            params.sequence[0].data.brightness = (0, utils_1.getHaBrightness)(updateParams.brightness);
        }
        if (typeof updateParams.colorTemp === 'number') {
            var min = entList[0].entityState.attributes.min_mireds;
            var max = entList[0].entityState.attributes.max_mireds;
            params.sequence[0].data.color_temp = (0, utils_1.getHaColorTemp)(min, max, updateParams.colorTemp);
        }
        init_1.ws2ha.sendMessage(params);
    }
    else if (uiid === const_1.CK_UIID_20008) {
        var cctBrightness = updateParams.cctBrightness, rgbBrightness = updateParams.rgbBrightness, hue = updateParams.hue, saturation = updateParams.saturation, colorTemp = updateParams.colorTemp;
        if ((typeof cctBrightness === 'number') || (typeof rgbBrightness === 'number')) {
            var br = cctBrightness || rgbBrightness;
            params.sequence[0].data.brightness = (0, utils_1.getHaBrightness)(br);
        }
        if (typeof colorTemp === 'number') {
            var min = entList[0].entityState.attributes.min_mireds;
            var max = entList[0].entityState.attributes.max_mireds;
            params.sequence[0].data.color_temp = (0, utils_1.getHaColorTemp)(min, max, colorTemp);
        }
        if ((typeof hue === 'number') && (typeof saturation === 'number')) {
            params.sequence[0].data.hs_color = [hue, saturation];
        }
        init_1.ws2ha.sendMessage(params);
    }
}
exports.handleHaLight = handleHaLight;
function sendWsUpdateMsg2Ha(deviceData, updateParams) {
    var uiid = deviceData.deviceUiid;
    if (!init_1.ws2ha.connected) {
        return;
    }
    if (uiid === const_1.CK_UIID_20001
        || uiid === const_1.CK_UIID_20002
        || uiid === const_1.CK_UIID_20003
        || uiid === const_1.CK_UIID_20004) {
        handleHaSwitch(deviceData, updateParams);
    }
    else if (uiid === const_1.CK_UIID_20005
        || uiid === const_1.CK_UIID_20006
        || uiid === const_1.CK_UIID_20007
        || uiid === const_1.CK_UIID_20008) {
        handleHaLight(deviceData, updateParams);
    }
}
exports.sendWsUpdateMsg2Ha = sendWsUpdateMsg2Ha;
function handleCkWsUpdateMessage(msg) {
    logger_1.logger.verbose("Get CK-WS update message: ".concat(JSON.stringify(msg)));
    if (msg.apikey !== init_1.curUserGwData.userApiKey) {
        return -1;
    }
    var syncDeviceData = init_1.curUserGwData.syncDeviceData;
    var deviceid = msg.deviceid;
    var deviceData = null;
    for (var i = 0; i < syncDeviceData.length; i++) {
        if (syncDeviceData[i].syncState
            && syncDeviceData[i].ckDeviceData
            && syncDeviceData[i].ckDeviceData.deviceid === deviceid) {
            deviceData = syncDeviceData[i];
            break;
        }
    }
    if (!deviceData) {
        return -1;
    }
    if (lodash_1.default.get(init_1.ws2ckRes, 'error') !== 0) {
        return -1;
    }
    coolkit_ws_device_1.default.sendMessage(JSON.stringify({
        error: 0,
        sequence: msg.sequence,
        apikey: msg.apikey,
        deviceid: deviceid
    }));
    sendWsUpdateMsg2Ha(deviceData, msg.params);
}
exports.handleCkWsUpdateMessage = handleCkWsUpdateMessage;
