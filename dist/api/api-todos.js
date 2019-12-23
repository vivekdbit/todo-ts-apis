"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var expressRouter = express_1.Router();
var database_1 = require("../models/database");
var mongodb_1 = require("mongodb");
// Validations Middleware
var middleware_1 = require("../middleware");
var ApiTodos = /** @class */ (function () {
    function ApiTodos() {
        var _this = this;
        this.dataRouter = expressRouter;
        this.dataRouter.post("/create", middleware_1.ValidationTodos.createTodos(), middleware_1.ValidationErrorHandlder.handleErrors, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var dat, writeParams, docs, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dat = req.body;
                        dat.user_id = new mongodb_1.ObjectID(req.body.user_id);
                        dat.created_at = new Date();
                        writeParams = {
                            collection: "todos",
                            criteria: dat,
                            projection: {}
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, new database_1.Database().write(writeParams)];
                    case 2:
                        docs = _a.sent();
                        res.send(docs);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        res.status(500).send(e_1.message + "-" + e_1.stack);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        this.dataRouter.put("/update/:id", middleware_1.ValidationTodos.updateTodos(), middleware_1.ValidationErrorHandlder.handleErrors, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var dat, updateParams, docs, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dat = { $set: {
                                'title': req.body.title,
                                'description': req.body.description,
                                'updated_at': new Date()
                            }
                        };
                        updateParams = {
                            collection: "todos",
                            criteria: { "_id": new mongodb_1.ObjectID(req.params.id) },
                            data: dat
                        };
                        return [4 /*yield*/, new database_1.Database().update(updateParams)];
                    case 1:
                        docs = _a.sent();
                        res.send(docs);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        res.status(500).send(e_2.message + "-" + e_2.stack);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.dataRouter.get("/get/:id", middleware_1.ValidationTodos.getTodo(), middleware_1.ValidationErrorHandlder.handleErrors, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var readParams, docs, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        readParams = {
                            collection: "todos",
                            criteria: { "_id": new mongodb_1.ObjectID(req.params.id) },
                            projection: {}
                        };
                        return [4 /*yield*/, new database_1.Database().readOne(readParams)];
                    case 1:
                        docs = _a.sent();
                        if (docs !== null) {
                            res.send(docs);
                        }
                        else {
                            throw new Error('Todo does not exist.');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        res.status(500).send(e_3.message + "-" + e_3.stack);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.dataRouter.get("/get", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var readParams, docs, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        readParams = {
                            collection: "todos",
                            criteria: {},
                            projection: {}
                        };
                        return [4 /*yield*/, new database_1.Database().read(readParams)];
                    case 1:
                        docs = _a.sent();
                        if (docs !== null) {
                            res.send(docs);
                        }
                        else {
                            throw new Error('Todo does not exist.');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        res.status(500).send(e_4.message + "-" + e_4.stack);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.dataRouter.delete("/delete/:id", middleware_1.ValidationTodos.getTodo(), middleware_1.ValidationErrorHandlder.handleErrors, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var readParams, docs, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        readParams = {
                            collection: "todos",
                            criteria: { "_id": new mongodb_1.ObjectID(req.params.id) },
                            projection: {}
                        };
                        return [4 /*yield*/, new database_1.Database().delete(readParams)];
                    case 1:
                        docs = _a.sent();
                        if (docs !== null) {
                            res.send(docs);
                        }
                        else {
                            throw new Error('Todo does not exist.');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        res.status(500).send(e_5.message + "-" + e_5.stack);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    }
    return ApiTodos;
}());
exports.ApiTodos = ApiTodos;
//# sourceMappingURL=api-todos.js.map