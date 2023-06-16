import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
    if (user.role === 'buyer') {
        if (user.budget < 0 || !user.budget) {
            throw new Error('⚠️ Buyer is required budget and more than zoro!');
        } else {
            user.income = 0;
        }
    }
    if (user.role === 'seller') {
        if (user.budget > 0 || user.income > 0) {
            throw new Error('⚠️ Sellter might not need any budget or income!');
        } else {
            user.income = 0;
            user.budget = 0;
        }
    }

    const createdUser = await User.create(user);

    return createdUser;
};

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
): Promise<IUser | null> => {
    const result = await User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });

    return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
    const result = await User.findByIdAndDelete(id);

    return result;
};

export const UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
