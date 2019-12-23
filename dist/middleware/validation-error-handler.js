"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var ValidationErrorHandlder = /** @class */ (function () {
    function ValidationErrorHandlder() {
    }
    ValidationErrorHandlder.handleErrors = function (req, res, next) {
        var errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.mapped() });
        }
        else {
            next();
        }
    };
    return ValidationErrorHandlder;
}());
exports.ValidationErrorHandlder = ValidationErrorHandlder;
//# sourceMappingURL=validation-error-handler.js.map