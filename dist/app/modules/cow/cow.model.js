"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        enum: [
            'Dhaka',
            'Chattogram',
            'Barishal',
            'Rajshahi',
            'Sylhet',
            'Comilla',
            'Rangpur',
            'Mymensingh',
        ],
    },
    breed: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: true,
        enum: ['for sale', 'sold out'],
    },
    category: {
        type: String,
        required: true,
        enum: ['Beef', 'Dairy', 'DualPurpose'],
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cow = (0, mongoose_1.model)('Cow', cowSchema);
