import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interface';

const cowSchema = new Schema<ICow>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
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
            default: 'for sale',
            enum: ['for sale', 'sold out'],
        },
        category: {
            type: String,
            required: true,
            enum: ['Beef', 'Dairy', 'DualPurpose'],
        },
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

export const Cow = model<ICow, CowModel>('Cow', cowSchema);
