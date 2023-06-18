"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    password: {
        type: 'String',
        required: true,
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
exports.User = (0, mongoose_1.model)('User', userSchema);
