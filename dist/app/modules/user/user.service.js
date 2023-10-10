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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const admin_model_1 = require("../admin/admin.model");
const user_model_1 = require("./user.model");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // INFO: Extra validation for budget and income. change after geeting assignment mark
    // const user = await getSingleUser(id);
    // const budget = Object.keys(payload).find(key => key === 'budget');
    // const income = Object.keys(payload).find(key => key === 'income');
    // if (user?.role === 'seller') {
    //     if (budget || income) {
    //         throw new ApiError(
    //             NOT_ACCEPTABLE,
    //             '🚫 You can not update seller income or budget!'
    //         );
    //     } else {
    //         const result = await User.findOneAndUpdate({ _id: id }, payload, {
    //             new: true,
    //         });
    //         return result;
    //     }
    // } else if (user?.role === 'buyer') {
    //     if (income) {
    //         throw new ApiError(
    //             NOT_ACCEPTABLE,
    //             '🚫 You can not update buyer income!'
    //         );
    //     } else {
    //         const result = await User.findOneAndUpdate({ _id: id }, payload, {
    //             new: true,
    //         });
    //         return result;
    //     }
    // }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
const getUserProfile = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role === 'admin') {
        const result = yield admin_model_1.Admin.findById(id);
        return result;
    }
    else {
        const result = yield user_model_1.User.findById(id);
        return result;
    }
});
const updateUserProfile = (id, role, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // INFO: Extra validation for budget and income. change after geeting assignment mark
    // const budget = Object.keys(payload).find(key => key === 'budget');
    // const income = Object.keys(payload).find(key => key === 'income');
    // const userRole = Object.keys(payload).find(key => key === 'role');
    // if (role === 'admin') {
    //     const result = await Admin.findOneAndUpdate({ _id: id }, payload, {
    //         new: true,
    //     });
    //     return result;
    // } else if (role === 'seller') {
    //     if (budget || income) {
    //         throw new ApiError(
    //             NOT_ACCEPTABLE,
    //             '🚫 You can not update seller income or budget!'
    //         );
    //     } else if (userRole) {
    //         throw new ApiError(
    //             NOT_ACCEPTABLE,
    //             '🚫 Seller can not update role!'
    //         );
    //     } else {
    //         const result = await User.findOneAndUpdate({ _id: id }, payload, {
    //             new: true,
    //         });
    //         return result;
    //     }
    // } else if (role === 'buyer') {
    //     if (income) {
    //         throw new ApiError(
    //             NOT_ACCEPTABLE,
    //             '🚫 You can not update buyer income!'
    //         );
    //     } else if (userRole) {
    //         throw new ApiError(NOT_ACCEPTABLE, '🚫 Buyer can not update role!');
    //     } else {
    //         const result = await User.findOneAndUpdate({ _id: id }, payload, {
    //             new: true,
    //         });
    //         return result;
    //     }
    // }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
exports.UserService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getUserProfile,
    updateUserProfile,
};
