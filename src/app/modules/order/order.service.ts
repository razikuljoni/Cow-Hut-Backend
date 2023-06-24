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

const getAllOrders = async (
    id: string,
    role: string
): Promise<IOrder[] | null | undefined> => {
    if (role === 'seller') {
        const orders = await Order.find();
        const orderedCows = orders.map(order => order.cow.toString());
        const cows = await Cow.find({ _id: orderedCows });
        const seller = cows.filter(cow => {
            if (cow.seller.toString() === id) {
                return cow;
            }
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return seller;
    } else if (role === 'buyer') {
        const user = await User.findById(id);
        const userId = user?._id.toString();
        const orders = await Order.find({ buyer: userId });
        return orders;
    } else if (role === 'admin') {
        const result = await Order.find();
        return result;
    }
};

const getOrderById = async (
    id: string,
    role: string,
    orderId: string
): Promise<IOrder[] | object | null | undefined> => {
    console.log(id, await Order.find());

    if (role === 'seller') {
        const order = await Order.findById(orderId);
        const cow = await Cow.findById(order?.cow.toString());
        const buyer = await User.findById(order?.buyer.toString());
        const cowDetails = await cow?.populate('seller');
        return {
            cow: cowDetails,
            buyer,
        };
    } else if (role === 'buyer') {
        const order = await Order.findById(orderId);
        const cow = await Cow.findById(order?.cow.toString());
        const buyer = await User.findById(order?.buyer.toString());
        const cowDetails = await cow?.populate('seller');
        return {
            cow: cowDetails,
            buyer,
        };
    } else if (role === 'admin') {
        const result = await Order.find();
        return result;
    }
};

export const OrderService = {
    createOrder,
    getAllOrders,
    getOrderById,
};
