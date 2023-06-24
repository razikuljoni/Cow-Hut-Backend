import { Request, Response } from 'express';
import { OK } from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { OrderService } from './order.service';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import configs from '../../../configs';
import { Secret } from 'jsonwebtoken';

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
    const token = req.headers.authorization;
    const user = jwtHelpers.verifyToken(
        token as string,
        configs.jwt.secret as Secret
    );

    const result = await OrderService.getAllOrders(user?.id, user?.role);

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 Orders data retrieved successfully',
        data: result,
    });
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const user = jwtHelpers.verifyToken(
        token as string,
        configs.jwt.secret as Secret
    );
    const orderId = req.params.id;
    const result = await OrderService.getOrderById(
        user?.id,
        user?.role,
        orderId
    );

    res.status(OK).json({
        success: true,
        statusCode: OK,
        message: '🆗 Order data retrieved successfully',
        data: result,
    });
});

export const OrderController = {
    createOrder,
    getAllOrders,
    getOrderById,
};
