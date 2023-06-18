import { BAD_REQUEST, NOT_ACCEPTABLE } from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Cow } from '../cow/cow.model';
import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (order: IOrder): Promise<IOrder | null> => {
    const cow = await Cow.findById(order?.cow);
    const buyer = await User.findById(order?.buyer);

    if (cow?.label === 'for sale') {
        if (buyer?.role === 'buyer') {
            if (buyer?.budget >= cow?.price) {
                const updateSeller = {
                    income: cow?.price,
                };

                const updateBuyer = {
                    budget: buyer?.budget - cow?.price,
                };

                const updateCow = {
                    label: 'sold out',
                };

                await User.findByIdAndUpdate(
                    { _id: order?.buyer },
                    updateBuyer
                );
                await User.findByIdAndUpdate(
                    { _id: cow?.seller.toString() },
                    updateSeller
                );
                await Cow.findByIdAndUpdate({ _id: order?.cow }, updateCow);

                const result = await Order.create(order);

                if (!result) {
                    throw new ApiError(
                        BAD_REQUEST,
                        '🚫 Order creation failed!'
                    );
                }

                return result;
            } else {
                throw new ApiError(
                    NOT_ACCEPTABLE,
                    '🚫 You dont have enough money to buy this cow!'
                );
            }
        } else {
            throw new ApiError(
                NOT_ACCEPTABLE,
                '🚫 Given buyer id is not a valid buyer!'
            );
        }
    } else {
        throw new ApiError(NOT_ACCEPTABLE, '🚫 The cow is already sold out!');
    }
};

const getAllOrders = async (): Promise<IOrder[] | null> => {
    const result = await Order.find();

    return result;
};

export const OrderService = {
    createOrder,
    getAllOrders,
};
