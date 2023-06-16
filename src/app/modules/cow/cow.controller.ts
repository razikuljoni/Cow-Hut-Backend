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

const getAllCows = async (req: Request, res: Response) => {
    const result = await CowService.getAllCows();

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: '🆗 Cows data retrived successfully!',
        data: result,
    });
};

const getSingleCow = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CowService.getSingleCow(id);

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: '🆗Single Cow data retrived successfully!',
        data: result,
    });
};

const updateCow = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateCow = req.body;
    const result = await CowService.updateCow(id, updateCow);

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: '🆗 Cow data updated successfully!',
        data: result,
    });
};

const deleteCow = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CowService.deleteCow(id);

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: '🆗 Cow deleted successfully!',
        data: result,
    });
};

export const CowController = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
