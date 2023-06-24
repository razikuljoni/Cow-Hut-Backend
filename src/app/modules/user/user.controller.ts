import { Request, Response } from 'express';
import { OK } from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import configs from '../../../configs';
import { Secret } from 'jsonwebtoken';

// Extend the Request interface to include the 'user' property
declare module 'express' {
    // eslint-disable-next-line
    interface Request {
        user?: any;
    }
}
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.user)
    const result = await UserService.getAllUsers();

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 Users data retrieved successfully',
        data: result,
    });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.getSingleUser(id);

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 Users data retrieved successfully',
        data: result,
    });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await UserService.updateUser(id, updatedData);

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 Users data updated successfully',
        data: result,
    });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await UserService.deleteUser(id);

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 Users deleted successfully!',
        data: result,
    });
});

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const id = jwtHelpers.verifyToken(
        token as string,
        configs.jwt.secret as Secret
    );

    const result = await UserService.getUserProfile(id.id, id.role);

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 Users data retrieved successfully',
        data: result,
    });
});

const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const user = jwtHelpers.verifyToken(
        token as string,
        configs.jwt.secret as Secret
    );
    const updatedData = req.body;

    const result = await UserService.updateUserProfile(
        user.id,
        user.role,
        updatedData
    );

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 Users data updated successfully',
        data: result,
    });
});

export const UserController = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getUserProfile,
    updateUserProfile,
};
