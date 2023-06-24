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
exports.UserController = void 0;
const http_status_1 = require("http-status");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const user_service_1 = require("./user.service");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const configs_1 = __importDefault(require("../../../configs"));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.getAllUsers();
    res.status(http_status_1.OK).json({
        success: true,
        statusCode: http_status_1.OK,
        message: '🆗 Users data retrieved successfully',
        data: result,
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.UserService.getSingleUser(id);
    res.status(http_status_1.OK).json({
        success: true,
        statusCode: http_status_1.OK,
        message: '🆗 Users data retrieved successfully',
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield user_service_1.UserService.updateUser(id, updatedData);
    res.status(http_status_1.OK).json({
        success: true,
        statusCode: http_status_1.OK,
        message: '🆗 Users data updated successfully',
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.UserService.deleteUser(id);
    res.status(http_status_1.OK).json({
        success: true,
        statusCode: http_status_1.OK,
        message: '🆗 Users deleted successfully!',
        data: result,
    });
}));
const getUserProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const id = jwtHelpers_1.jwtHelpers.verifyToken(token, configs_1.default.jwt.secret);
    const result = yield user_service_1.UserService.getUserProfile(id.id, id.role);
    res.status(http_status_1.OK).json({
        success: true,
        statusCode: http_status_1.OK,
        message: '🆗 Users data retrieved successfully',
        data: result,
    });
}));
const updateUserProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, configs_1.default.jwt.secret);
    const updatedData = req.body;
    const result = yield user_service_1.UserService.updateUserProfile(user.id, user.role, updatedData);
    res.status(http_status_1.OK).json({
        success: true,
        statusCode: http_status_1.OK,
        message: '🆗 Users data updated successfully',
        data: result,
    });
}));
exports.UserController = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getUserProfile,
    updateUserProfile,
};
