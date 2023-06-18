import { Request, Response } from 'express';
import { OK } from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const order = req.body;
    const result = await OrderService.createOrder(order);

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 Order created successfully',
        data: result,
    });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderService.getAllOrders();

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 Orders data retrived successfully',
        data: result,
    });
});

export const OrderController = {
    createOrder,
    getAllOrders,
};
