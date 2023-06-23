import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import configs from '../../../configs';

const userSchema = new Schema<IUser>(
    {
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
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(configs.bcrypt_salt_round)
    );
    next();
});

export const User = model<IUser, UserModel>('User', userSchema);
