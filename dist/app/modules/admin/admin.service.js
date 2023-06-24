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
exports.AdminService = void 0;
const admin_model_1 = require("./admin.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = require("http-status");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = __importDefault(require("../../../configs"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const createAdmin = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    const createdAdmin = admin_model_1.Admin.create(admin);
    if (!createdAdmin) {
        throw new ApiError_1.default(http_status_1.BAD_REQUEST, '🚫 Admin creation failed!');
    }
    return createdAdmin;
});
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    if (!phoneNumber) {
        throw new ApiError_1.default(http_status_1.BAD_REQUEST, '🚫 PhoneNumber is required!');
    }
    if (!password) {
        throw new ApiError_1.default(http_status_1.BAD_REQUEST, '🚫 Password is required!');
    }
    const isAdminExist = yield admin_model_1.Admin.findOne({ phoneNumber }, { role: 1, password: 1 });
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.NOT_FOUND, '🚫 User does not exist!');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.UNAUTHORIZED, '🚫 Wrong password!');
    }
    //     Implement JWT
    const accessToken = jsonwebtoken_1.default.sign({
        id: isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist._id,
        role: isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist.role,
    }, configs_1.default.jwt.secret, { expiresIn: configs_1.default.jwt.expires_in });
    const refreshToken = jsonwebtoken_1.default.sign({
        id: isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist._id,
        role: isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist.role,
    }, configs_1.default.jwt.refresh_secret, { expiresIn: configs_1.default.jwt.refresh_expires_in });
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, configs_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.FORBIDDEN, '🚫 Invalid refresh token');
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { id } = verifiedToken;
    const isAdminExist = yield admin_model_1.Admin.findOne({ _id: id });
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.NOT_FOUND, '🚫 User does not exist!');
    }
    // Generate new access token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist._id,
        role: isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist.role,
    }, configs_1.default.jwt.secret, configs_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AdminService = {
    createAdmin,
    loginAdmin,
    refreshToken,
};
