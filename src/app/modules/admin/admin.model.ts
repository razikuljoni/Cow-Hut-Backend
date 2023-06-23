import { model, Schema } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';
import bcrypt from 'bcrypt';
import configs from '../../../configs';

const AdminSchema = new Schema<IAdmin>({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['admin'],
        required: true,
        default: 'admin',
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
});

AdminSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(configs.bcrypt_salt_round)
    );
    next();
});

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
