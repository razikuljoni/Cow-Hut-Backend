import { NOT_ACCEPTABLE } from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { Admin } from '../admin/admin.model';
import { IAdmin } from '../admin/admin.interface';

const getAllUsers = async () => {
    const result = await User.find();

    return result;
};

const getSingleUser = async (id: string) => {
    const result = await User.findById(id);

    return result;
};

const updateUser = async (
    id: string,
    payload: Partial<IUser>
): Promise<IUser | null | undefined> => {
    const user = await getSingleUser(id);

    const budget = Object.keys(payload).find(key => key === 'budget');
    const income = Object.keys(payload).find(key => key === 'income');
    if (user?.role === 'seller') {
        if (budget || income) {
            throw new ApiError(
                NOT_ACCEPTABLE,
                '🚫 You can not update seller income or budget!'
            );
        } else {
            const result = await User.findOneAndUpdate({ _id: id }, payload, {
                new: true,
            });

            return result;
        }
    } else if (user?.role === 'buyer') {
        if (income) {
            throw new ApiError(
                NOT_ACCEPTABLE,
                '🚫 You can not update buyer income!'
            );
        } else {
            const result = await User.findOneAndUpdate({ _id: id }, payload, {
                new: true,
            });

            return result;
        }
    }
};

const deleteUser = async (id: string): Promise<IUser | null> => {
    const result = await User.findByIdAndDelete(id);

    return result;
};

const getUserProfile = async (id: string, role: string) => {
    if (role === 'admin') {
        const result = await Admin.findById(id);
        return result;
    } else {
        const result = await User.findById(id);

        return result;
    }
};

const updateUserProfile = async (
    id: string,
    role: string,
    payload: Partial<IUser>
): Promise<IUser | IAdmin | null | undefined> => {
    const budget = Object.keys(payload).find(key => key === 'budget');
    const income = Object.keys(payload).find(key => key === 'income');
    const userRole = Object.keys(payload).find(key => key === 'role');
    console.log(userRole);
    if (role === 'admin') {
        const result = await Admin.findOneAndUpdate({ _id: id }, payload, {
            new: true,
        });
        return result;
    } else if (role === 'seller') {
        if (budget || income) {
            throw new ApiError(
                NOT_ACCEPTABLE,
                '🚫 You can not update seller income or budget!'
            );
        } else if (userRole) {
            throw new ApiError(
                NOT_ACCEPTABLE,
                '🚫 Seller can not update role!'
            );
        } else {
            const result = await User.findOneAndUpdate({ _id: id }, payload, {
                new: true,
            });

            return result;
        }
    } else if (role === 'buyer') {
        if (income) {
            throw new ApiError(
                NOT_ACCEPTABLE,
                '🚫 You can not update buyer income!'
            );
        } else if (userRole) {
            throw new ApiError(NOT_ACCEPTABLE, '🚫 Buyer can not update role!');
        } else {
            const result = await User.findOneAndUpdate({ _id: id }, payload, {
                new: true,
            });

            return result;
        }
    }
};

export const UserService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getUserProfile,
    updateUserProfile,
};
