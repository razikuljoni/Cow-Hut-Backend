import { ErrorRequestHandler } from 'express';
import configs from '../../configs';
import handleValidationError from '../errors/handleValidationError';
import { IGenericErrorMessage } from '../interfaces/error';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages: IGenericErrorMessage[] = [];

    if (error?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
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

    next();
};

export default globalErrorHandler;
