import { Request, Response } from 'express';
import httpStatus, { OK } from 'http-status';
import { AuthService } from './auth.service';
import catchAsync from '../../../shared/catchAsync';
import configs from '../../../configs';

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = req.body;
    const result = await AuthService.createUser(user);
    // const {password , ...data} = result;
    // createLogger(password)

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'Users created successfully',
        data: result,
    });
});

const userLogin = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.userLogin(loginData);
    const { refreshToken, accessToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: configs.env === 'production',
        httpOnly: true,
    });

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 User LoggedIn Successfully!',
        data: { accessToken },
    });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);

    res.cookie('refreshToken', refreshToken, {
        secure: configs.env === 'production',
        httpOnly: true,
    });

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 Admin LoggedIn Successfully!',
        data: result,
    });
});

export const AuthController = {
    createUser,
    userLogin,
    refreshToken,
};
