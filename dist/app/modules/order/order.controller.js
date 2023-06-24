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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const http_status_1 = require("http-status");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const order_service_1 = require("./order.service");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const configs_1 = __importDefault(require("../../../configs"));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = req.body;
    const result = yield order_service_1.OrderService.createOrder(order);
    res.status(http_status_1.OK).json({
        success: true,
        statusCode: http_status_1.OK,
        message: '🆗 Order created successfully',
        data: result,
    });
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, configs_1.default.jwt.secret);
    const result = yield order_service_1.OrderService.getAllOrders(user === null || user === void 0 ? void 0 : user.id, user === null || user === void 0 ? void 0 : user.role);
    res.status(http_status_1.OK).json({
        success: true,
        statusCode: http_status_1.OK,
        message: '🆗 Orders data retrieved successfully',
        data: result,
    });
}));
const getOrderById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, configs_1.default.jwt.secret);
    const orderId = req.params.id;
    const result = yield order_service_1.OrderService.getOrderById(user === null || user === void 0 ? void 0 : user.id, user === null || user === void 0 ? void 0 : user.role, orderId);
    res.status(http_status_1.OK).json({
        success: true,
        statusCode: http_status_1.OK,
        message: '🆗 Order data retrieved successfully',
        data: result,
    });
}));
exports.OrderController = {
    createOrder,
    getAllOrders,
    getOrderById,
};
