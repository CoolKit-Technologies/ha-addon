"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HaToken = void 0;
var config_1 = require("./config");
var auth;
exports.HaToken = auth;
if (config_1.debugMode) {
    exports.HaToken = auth =
        // Pi
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJlYzAwYTRkYjNmZDQ0YzAxYjEwODJkNWFmZDNkYTA3NyIsImlhdCI6MTYxMjU0Mzk2OSwiZXhwIjoxOTI3OTAzOTY5fQ.r-rGzb0jp8eaOHaldAPNfH9ioFxmpHgjQuYlRw5L674';
    // Docker
    // 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1ZmQ2MTcwZTQ5YmU0OWVlYjQ0YzMzMTQ0MzY2ODQ1MSIsImlhdCI6MTYyMDQ1ODE1NCwiZXhwIjoxOTM1ODE4MTU0fQ.U_L861eypPB4wlQM5tlavfjjTI_Dl9WF_jOydeqZwiw';
}
