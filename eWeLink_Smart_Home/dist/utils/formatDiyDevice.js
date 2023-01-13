"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (device) {
    var txt = device.txt, a = device.a, srv = device.srv;
    return {
        id: txt.id,
        type: txt.type,
        data: txt.data1,
        ip: a,
        port: (srv === null || srv === void 0 ? void 0 : srv.port) || 8081,
    };
});
