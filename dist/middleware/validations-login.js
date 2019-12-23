"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var users_1 = require("../models/users");
var ValidationLogin = /** @class */ (function () {
    function ValidationLogin() {
    }
    ValidationLogin.signupValidator = function () {
        return [express_validator_1.check('first_name')
                .isAlpha().withMessage('Name should not contain numbers.')
                .matches(/^[A-Z]/).withMessage('First letter should be capital letter.'),
            express_validator_1.check('mobile')
                .not().isEmpty().withMessage('Mobile should not be empty')
                .isNumeric().withMessage('Mobile should be numeric'),
            express_validator_1.check('password')
                .isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
            express_validator_1.check('email')
                .isEmail().withMessage('Invalid E-mail ID'),
            express_validator_1.check('email').custom(function (value) {
                return new users_1.Users().findByEmail(value).then(function (user) {
                    if (user) {
                        return Promise.reject('E-mail already in use');
                    }
                });
            })
        ];
    };
    ValidationLogin.loginValidator = function () {
        return [
            express_validator_1.check('email')
                .isEmail().withMessage('Invalid E-mail ID'),
            express_validator_1.check('password')
                .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
        ];
    };
    return ValidationLogin;
}());
exports.ValidationLogin = ValidationLogin;
//# sourceMappingURL=validations-login.js.map