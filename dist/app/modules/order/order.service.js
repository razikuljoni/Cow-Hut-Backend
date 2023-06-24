"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = require("http-status");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const order_model_1 = require("./order.model");
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_model_1.Cow.findById(order === null || order === void 0 ? void 0 : order.cow);
    const buyer = yield user_model_1.User.findById(order === null || order === void 0 ? void 0 : order.buyer);
    if ((cow === null || cow === void 0 ? void 0 : cow.label) === 'for sale') {
        if ((buyer === null || buyer === void 0 ? void 0 : buyer.role) === 'buyer') {
            if ((buyer === null || buyer === void 0 ? void 0 : buyer.budget) >= (cow === null || cow === void 0 ? void 0 : cow.price)) {
                const updateSeller = {
                    income: cow === null || cow === void 0 ? void 0 : cow.price,
                };
                const updateBuyer = {
                    budget: (buyer === null || buyer === void 0 ? void 0 : buyer.budget) - (cow === null || cow === void 0 ? void 0 : cow.price),
                };
                const updateCow = {
                    label: 'sold out',
                };
                yield user_model_1.User.findByIdAndUpdate({ _id: order === null || order === void 0 ? void 0 : order.buyer }, updateBuyer);
                yield user_model_1.User.findByIdAndUpdate({ _id: cow === null || cow === void 0 ? void 0 : cow.seller.toString() }, updateSeller);
                yield cow_model_1.Cow.findByIdAndUpdate({ _id: order === null || order === void 0 ? void 0 : order.cow }, updateCow);
                const result = yield order_model_1.Order.create(order);
                if (!result) {
                    throw new ApiError_1.default(http_status_1.BAD_REQUEST, '🚫 Order creation failed!');
                }
                return result;
            }
            else {
                throw new ApiError_1.default(http_status_1.NOT_ACCEPTABLE, '🚫 You dont have enough money to buy this cow!');
            }
        }
        else {
            throw new ApiError_1.default(http_status_1.NOT_ACCEPTABLE, '🚫 Given buyer id is not a valid buyer!');
        }
    }
    else {
        throw new ApiError_1.default(http_status_1.NOT_ACCEPTABLE, '🚫 The cow is already sold out!');
    }
});
const getAllOrders = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role === 'seller') {
        const orders = yield order_model_1.Order.find();
        const orderedCows = orders.map(order => order.cow.toString());
        const cows = yield cow_model_1.Cow.find({ _id: orderedCows });
        const seller = cows.filter(cow => {
            if (cow.seller.toString() === id) {
                return cow;
            }
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return seller;
    }
    else if (role === 'buyer') {
        const user = yield user_model_1.User.findById(id);
        const userId = user === null || user === void 0 ? void 0 : user._id.toString();
        const orders = yield order_model_1.Order.find({ buyer: userId });
        return orders;
    }
    else if (role === 'admin') {
        const result = yield order_model_1.Order.find();
        return result;
    }
});
const getOrderById = (id, role, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    if (role === 'seller') {
        const order = yield order_model_1.Order.findById(orderId);
        const cow = yield cow_model_1.Cow.findById(order === null || order === void 0 ? void 0 : order.cow.toString());
        const buyer = yield user_model_1.User.findById(order === null || order === void 0 ? void 0 : order.buyer.toString());
        const cowDetails = yield (cow === null || cow === void 0 ? void 0 : cow.populate('seller'));
        return {
            cow: cowDetails,
            buyer,
        };
    }
    else if (role === 'buyer') {
        const order = yield order_model_1.Order.findById(orderId);
        const cow = yield cow_model_1.Cow.findById(order === null || order === void 0 ? void 0 : order.cow.toString());
        const buyer = yield user_model_1.User.findById(order === null || order === void 0 ? void 0 : order.buyer.toString());
        const cowDetails = yield (cow === null || cow === void 0 ? void 0 : cow.populate('seller'));
        return {
            cow: cowDetails,
            buyer,
        };
    }
    else if (role === 'admin') {
        const result = yield order_model_1.Order.find();
        return result;
    }
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getOrderById,
};
