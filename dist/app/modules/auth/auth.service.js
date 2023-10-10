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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = require("http-status");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = __importDefault(require("../../../configs"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = require("../user/user.model");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // INFO: Extra validation for budget and income. change after geeting assignment mark
    // if (user.role === 'buyer') {
    //     if (user.budget < 0 || !user.budget) {
    //         throw new Error('⚠️ Buyer is required budget and more than zero!');
    //     } else {
    //         user.income = 0;
    //     }
    // }
    // if (user.role === 'seller') {
    //     if (user.budget > 0 || user.income > 0) {
    //         throw new Error('⚠️ Seller might not need any budget or income!');
    //     } else {
    //         user.income = 0;
    //         user.budget = 0;
    //     }
    // }
    const createdUser = yield user_model_1.User.create(user);
    if (!createdUser) {
        throw new ApiError_1.default(http_status_1.BAD_REQUEST, '🚫 User creation failed!');
    }
    return createdUser;
});
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    if (!phoneNumber) {
        throw new ApiError_1.default(http_status_1.BAD_REQUEST, '🚫 PhoneNumber is required!');
    }
    if (!password) {
        throw new ApiError_1.default(http_status_1.BAD_REQUEST, '🚫 Password is required!');
    }
    const isUserExists = yield user_model_1.User.findOne({ phoneNumber }, { role: 1, password: 1 });
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.NOT_FOUND, '🚫 User does not exist!');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.UNAUTHORIZED, '🚫 Wrong password!');
    }
    //     Implement JWT
    const accessToken = jsonwebtoken_1.default.sign({
        id: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
    }, configs_1.default.jwt.secret, { expiresIn: configs_1.default.jwt.expires_in });
    const refreshToken = jsonwebtoken_1.default.sign({
        id: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
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
    const isUserExists = yield user_model_1.User.findOne({ _id: id });
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.NOT_FOUND, '🚫 User does not exist!');
    }
    // Generate new access token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
    }, configs_1.default.jwt.secret, configs_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    createUser,
    userLogin,
    refreshToken,
};
