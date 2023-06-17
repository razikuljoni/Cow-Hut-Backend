import { IUser } from './user.interface';
import { User } from './user.model';

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
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
