"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var ValidationTodos = /** @class */ (function () {
    function ValidationTodos() {
    }
    ValidationTodos.createTodos = function () {
        return [
            express_validator_1.check('title')
                .not().isEmpty().withMessage('Title should not be empty'),
            express_validator_1.check('description')
                .not().isEmpty().withMessage('Description should not be empty'),
            express_validator_1.check('user_id')
                .not().isEmpty().withMessage('user_id should not be empty'),
        ];
    };
    ValidationTodos.updateTodos = function () {
        return [
            express_validator_1.check('title')
                .not().isEmpty().withMessage('Title should not be empty'),
            express_validator_1.check('description')
                .not().isEmpty().withMessage('Description should not be empty'),
        ];
    };
    ValidationTodos.getTodo = function () {
        return [
            express_validator_1.check('id')
                .not().isEmpty().withMessage('_id should not be empty'),
        ];
    };
    return ValidationTodos;
}());
exports.ValidationTodos = ValidationTodos;
//# sourceMappingURL=validation-todos.js.map