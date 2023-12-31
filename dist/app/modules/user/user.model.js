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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const configs_1 = __importDefault(require("../../../configs"));
const userSchema = new mongoose_1.Schema({
    password: {
        type: 'String',
        required: true,
        select: 0,
    },
    role: {
        type: 'String',
        required: true,
        enum: ['buyer', 'seller'],
    },
    name: {
        firstName: {
            type: 'String',
            required: true,
        },
        lastName: {
            type: 'String',
        },
    },
    phoneNumber: {
        type: 'String',
        unique: true,
        required: true,
    },
    address: {
        type: 'String',
        required: true,
    },
    budget: {
        type: 'Number',
    },
    income: {
        type: 'Number',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(configs_1.default.bcrypt_salt_round));
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', userSchema);
