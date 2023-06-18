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
const http_status_1 = require("http-status");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === 'buyer') {
        if (user.budget < 0 || !user.budget) {
            throw new Error('⚠️ Buyer is required budget and more than zoro!');
        }
        else {
            user.income = 0;
        }
    }
    if (user.role === 'seller') {
        if (user.budget > 0 || user.income > 0) {
            throw new Error('⚠️ Sellter might not need any budget or income!');
        }
        else {
            user.income = 0;
            user.budget = 0;
        }
    }
    const createdUser = yield user_model_1.User.create(user);
    if (!createdUser) {
        throw new ApiError_1.default(http_status_1.BAD_REQUEST, '🚫 User creation failed!');
    }
    return createdUser;
});
exports.AuthService = {
    createUser,
};
