/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import configs from '../../configs';
import ApiError from '../../errors/ApiError';
import handleCastError from '../../errors/handleCastError';
import handleValidationError from '../../errors/handleValidationError';
import { IGenericErrorMessage } from '../../interfaces/error';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages: IGenericErrorMessage[] = [];

    if (error?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error?.name === 'CastError') {
        const simplifiedError = handleCastError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error instanceof ApiError) {
        statusCode = error?.statusCode;
        message = error.message;
        errorMessages = error?.message
            ? [
                  {
                      path: '',
                      message: error?.message,
                  },
              ]
            : [];
    } else if (error instanceof Error) {
        message = error?.message;
        errorMessages = error?.message
            ? [
                  {
                      path: '',
                      message: error?.message,
                  },
              ]
            : [];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: configs.env !== 'production' ? error?.stack : undefined,
    });
};

export default globalErrorHandler;
