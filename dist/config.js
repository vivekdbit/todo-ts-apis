"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var convict = require("convict");
var config = convict({
    bcryptSaltRounds: {
        format: '*',
        default: 10
    },
    jwtSecretKey: {
        format: '*',
        default: 'nodeRestApi'
    }
});
exports.config = config;
//# sourceMappingURL=config.js.map