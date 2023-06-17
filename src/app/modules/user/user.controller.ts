import { Request, Response } from 'express';
import { OK } from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { UserService } from './user.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
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

export const UserController = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
