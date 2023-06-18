import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const orderSchems = new Schema<IOrder>(
    {
        cow: {
            type: Schema.Types.ObjectId || String,
            ref: 'Cow',
            required: true,
        },
        buyer: {
            type: Schema.Types.ObjectId || String,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

export const Order = model<IOrder, OrderModel>('Order', orderSchems);
