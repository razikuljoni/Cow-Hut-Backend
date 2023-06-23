import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { AdminService } from './admin.service';
import { OK } from 'http-status';
import configs from '../../../configs';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const admin = req.body;
    const result = await AdminService.createAdmin(admin);

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 Admin Created Successfully!',
        data: result,
    });
});

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AdminService.loginAdmin(loginData);
    const { refreshToken, accessToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: configs.env === 'production',
        httpOnly: true,
    });

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 Admin LoggedIn Successfully!',
        data: { accessToken },
    });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await AdminService.refreshToken(refreshToken);

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

export const AdminController = {
    createAdmin,
    loginAdmin,
    refreshToken,
};
