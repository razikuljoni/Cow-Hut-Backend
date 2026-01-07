import bcrypt from 'bcrypt';
import { BAD_REQUEST, FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from 'http-status';
import jwt, { Secret } from 'jsonwebtoken';
import configs from '../../../configs';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import {
    IAdmin,
    ILoggedInUser,
    ILoggedInUserResponse,
    IRefreshTokenResponse,
} from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (admin: IAdmin): Promise<Partial<IAdmin>> => {
    const createdAdmin = Admin.create(admin);

    if (!createdAdmin) {
        throw new ApiError(BAD_REQUEST, '🚫 Admin creation failed!');
    }
    return createdAdmin;
};

const loginAdmin = async (
    payload: ILoggedInUser
): Promise<ILoggedInUserResponse> => {
    const { phoneNumber, password } = payload;
    if (!phoneNumber) {
        throw new ApiError(BAD_REQUEST, '🚫 PhoneNumber is required!');
    }
    if (!password) {
        throw new ApiError(BAD_REQUEST, '🚫 Password is required!');
    }
    const isAdminExist = await Admin.findOne(
        { phoneNumber },
        { role: 1, password: 1 }
    );

    if (!isAdminExist) {
        throw new ApiError(NOT_FOUND, '🚫 User does not exist!');
    }

    const isPasswordMatched = await bcrypt.compare(
        password,
        isAdminExist?.password
    );

    if (!isPasswordMatched) {
        throw new ApiError(UNAUTHORIZED, '🚫 Wrong password!');
    }

    //     Implement JWT
    const accessToken = jwt.sign(
        {
            id: isAdminExist?._id,
            role: isAdminExist?.role,
        },
        configs.jwt.secret as Secret,
        {
            expiresIn: configs.jwt
                .expires_in as unknown as import('jsonwebtoken').SignOptions['expiresIn'],
        }
    );

    const refreshToken = jwt.sign(
        {
            id: isAdminExist?._id,
            role: isAdminExist?.role,
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

    const isAdminExist = await Admin.findOne({ _id: id });

    if (!isAdminExist) {
        throw new ApiError(NOT_FOUND, '🚫 User does not exist!');
    }

    // Generate new access token
    const newAccessToken = jwtHelpers.createToken(
        {
            id: isAdminExist?._id,
            role: isAdminExist?.role,
        },
        configs.jwt.secret as Secret,
        configs.jwt
            .expires_in as unknown as import('jsonwebtoken').SignOptions['expiresIn']
    );

    return {
        accessToken: newAccessToken,
    };
};
export const AdminService = {
    createAdmin,
    loginAdmin,
    refreshToken,
};
