import { Request, Response } from 'express';
import httpStatus, { OK } from 'http-status';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const result = await UserService.createUser(user);

        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: 'Users created successfully',
            data: result,
        });
    } catch (error: any) {
        console.log(error.message);
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    const result = await UserService.getAllUsers();

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 Users data retrieved successfully',
        data: result,
    });
};

const getSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.getSingleUser(id);

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 Users data retrieved successfully',
        data: result,
    });
};

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await UserService.updateUser(id, updatedData);

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 Users data updated successfully',
        data: result,
    });
};

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await UserService.deleteUser(id);

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 Users deleted successfully!',
        data: result,
    });
};

export const UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
