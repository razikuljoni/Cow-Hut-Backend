import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CowService } from './cow.service';

const createCow = async (req: Request, res: Response) => {
    try {
        const cow = req.body;
        const result = await CowService.createCow(cow);

        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: '🆗 Cow created successfully',
            data: result,
        });
    } catch (error: any) {
        console.log(error.message);
    }
};

export const CowController = {
    createCow,
};
