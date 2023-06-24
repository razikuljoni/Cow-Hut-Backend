import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync =
    (fn: RequestHandler) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };

export default catchAsync;
