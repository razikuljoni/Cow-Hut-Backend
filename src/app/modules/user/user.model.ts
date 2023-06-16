import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser>(
    {
        password: {
            type: 'String',
            required: true,
        },
        role: {
            type: 'String',
            required: true,
            enum: ['Buyer', 'Seller'],
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
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

export const User = model<IUser, UserModel>('User', userSchema);
