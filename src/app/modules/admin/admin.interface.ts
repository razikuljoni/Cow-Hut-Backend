import { Model } from 'mongoose';

export type IAdmin = {
    phoneNumber: string;
    role: string;
    password: string;
    name: {
        firstName: string;
        lastName: string;
    };
    address: string;
};

export type ILoggedInUser = {
    phoneNumber: string;
    password: string;
};

export type ILoggedInUserResponse = {
    accessToken: string;
    refreshToken?: string;
};

export type IRefreshTokenResponse = {
    accessToken: string;
};

export type AdminModel = Model<IAdmin, object>;
