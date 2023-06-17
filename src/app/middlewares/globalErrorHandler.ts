import { NextFunction, Request, Response } from 'express';
import configs from '../../configs';

export type IGenericErrorMessage = {
    path: string | number;
    message: string;
};

const globalErrorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = 500;
    const message = 'Something went wrong !';
    const errorMessages: IGenericErrorMessage[] = [];

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: configs.env !== 'production' ? error?.stack : undefined,
    });
    next();
};

export default globalErrorHandler;
