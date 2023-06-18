import { Model, Types } from 'mongoose';
import { ICow } from '../cow/cow.interface';
import { IUser } from '../user/user.interface';

export type IOrder = {
    cow: Types.ObjectId | ICow | string;
    buyer: Types.ObjectId | IUser | string;
};

export type OrderModel = Model<IOrder, object>;
