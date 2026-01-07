import bcrypt from 'bcrypt';
import { BAD_REQUEST, FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from 'http-status';
import jwt, { Secret } from 'jsonwebtoken';
import configs from '../../../configs';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import {
    ILoggedInUser,
    ILoggedInUserResponse,
    IRefreshTokenResponse,
} from '../admin/admin.interface';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const createUser = async (user: IUser): Promise<Partial<IUser> | null> => {
    // INFO: Extra validation for budget and income. change after geeting assignment mark
    // if (user.role === 'buyer') {
    //     if (user.budget < 0 || !user.budget) {
    //         throw new Error('⚠️ Buyer is required budget and more than zero!');
    //     } else {
    //         user.income = 0;
    //     }
    // }
    // if (user.role === 'seller') {
    //     if (user.budget > 0 || user.income > 0) {
    //         throw new Error('⚠️ Seller might not need any budget or income!');
    //     } else {
    //         user.income = 0;
    //         user.budget = 0;
    //     }
    // }

    const createdUser = await User.create(user);

    if (!createdUser) {
        throw new ApiError(BAD_REQUEST, '🚫 User creation failed!');
    }
    return createdUser;
};

const userLogin = async (
    payload: ILoggedInUser
): Promise<ILoggedInUserResponse> => {
    const { phoneNumber, password } = payload;
    if (!phoneNumber) {
        throw new ApiError(BAD_REQUEST, '🚫 PhoneNumber is required!');
    }
    if (!password) {
        throw new ApiError(BAD_REQUEST, '🚫 Password is required!');
    }
    const isUserExists = await User.findOne(
        { phoneNumber },
        { role: 1, password: 1 }
    );

    if (!isUserExists) {
        throw new ApiError(NOT_FOUND, '🚫 User does not exist!');
    }

    const isPasswordMatched = await bcrypt.compare(
        password,
        isUserExists?.password
    );

    if (!isPasswordMatched) {
        throw new ApiError(UNAUTHORIZED, '🚫 Wrong password!');
    }

    //     Implement JWT
    const accessToken = jwt.sign(
        {
            id: isUserExists?._id,
            role: isUserExists?.role,
        },
        configs.jwt.secret as Secret,
        {
            expiresIn: configs.jwt
                .expires_in as unknown as import('jsonwebtoken').SignOptions['expiresIn'],
        }
    );

    const refreshToken = jwt.sign(
        {
            id: isUserExists?._id,
            role: isUserExists?.role,
        },
        configs.jwt.refresh_secret as Secret,
        {
            expiresIn: configs.jwt
                .refresh_expires_in as unknown as import('jsonwebtoken').SignOptions['expiresIn'],
        }
    );

    return {
        accessToken,
        refreshToken,
    };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers.verifyToken(
            token,
            configs.jwt.refresh_secret as Secret
        );
    } catch (err) {
        throw new ApiError(FORBIDDEN, '🚫 Invalid refresh token');
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { id } = verifiedToken;

    const isUserExists = await User.findOne({ _id: id });

    if (!isUserExists) {
        throw new ApiError(NOT_FOUND, '🚫 User does not exist!');
    }

    // Generate new access token
    const newAccessToken = jwtHelpers.createToken(
        {
            id: isUserExists?._id,
            role: isUserExists?.role,
        },
        configs.jwt.secret as Secret,
        configs.jwt
            .expires_in as unknown as import('jsonwebtoken').SignOptions['expiresIn']
    );

    return {
        accessToken: newAccessToken,
    };
};

export const AuthService = {
    createUser,
    userLogin,
    refreshToken,
};
