"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var channelMap_1 = require("../config/channelMap");
var CloudDeviceController_1 = __importDefault(require("./CloudDeviceController"));
var CloudNSPanelController = (function (_super) {
    __extends(CloudNSPanelController, _super);
    function CloudNSPanelController(props) {
        var _this = this;
        var _a;
        _this = _super.call(this, props) || this;
        _this.entityId = "switch.".concat(props.deviceId);
        _this.uiid = props.extra.uiid;
        _this.channelName = (_a = props.tags) === null || _a === void 0 ? void 0 : _a.ck_channel_name;
        _this.maxChannel = (0, channelMap_1.getMaxChannelByUiid)(props.extra.uiid);
        _this.params = props.params;
        return _this;
    }
    return CloudNSPanelController;
}(CloudDeviceController_1.default));
exports.default = CloudNSPanelController;
