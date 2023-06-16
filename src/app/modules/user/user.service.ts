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

export const UserService = {
    createUser,
};
