import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';

const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const result = await AuthService.createUser(user);

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

export const AuthController = {
    createUser,
};
