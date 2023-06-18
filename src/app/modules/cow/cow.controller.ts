import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { CowService } from './cow.service';

const createCow = catchAsync(async (req: Request, res: Response) => {
    const cow = req.body;
    const result = await CowService.createCow(cow);

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: '🆗 Cow created successfully',
        data: result,
    });
});

const getAllCows = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, ['searchTerm']);
    const paginationOptions = pick(req.query, [
        'page',
        'limit',
        'sortBy',
        'sortOrder',
        'minPrice',
        'maxPrice',
        'location',
    ]);
    const result = await CowService.getAllCows(filters, paginationOptions);

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: '🆗 Cows data retrived successfully!',
        meta: result.meta || null,
        data: result.data,
    });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CowService.getSingleCow(id);

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: '🆗Single Cow data retrived successfully!',
        data: result,
    });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateCow = req.body;
    const result = await CowService.updateCow(id, updateCow);

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: '🆗 Cow data updated successfully!',
        data: result,
    });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CowService.deleteCow(id);

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: '🆗 Cow deleted successfully!',
        data: result,
    });
});

export const CowController = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
