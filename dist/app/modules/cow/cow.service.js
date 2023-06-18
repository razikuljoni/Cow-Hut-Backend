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
exports.CowService = void 0;
const http_status_1 = require("http-status");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const cow_model_1 = require("./cow.model");
const createCow = (cow) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(cow.seller);
    if ((result === null || result === void 0 ? void 0 : result.role) === 'seller') {
        const createdCow = yield cow_model_1.Cow.create(cow);
        if (!createdCow) {
            throw new ApiError_1.default(http_status_1.BAD_REQUEST, '🚫 Cow creation failed!');
        }
        return createdCow;
    }
    else {
        throw new ApiError_1.default(http_status_1.NOT_ACCEPTABLE, '🚫 Given seller id is not a valid seller!');
    }
});
const getAllCows = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, minPrice, maxPrice, location, } = paginationOptions;
    const skip = (page - 1) * limit;
    const sortBy = paginationOptions.sortBy || 'createdAt';
    const sortOrder = paginationOptions.sortOrder || 'desc';
    const { searchTerm } = filters;
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const cowSearchableFields = [
        'name',
        'location',
        'breed',
        'label',
        'category',
    ];
    const stringSearchTermConditions = [];
    if (searchTerm) {
        stringSearchTermConditions.push({
            $or: cowSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    const cowNumberSearchableFields = ['price', 'age', 'weight'];
    const numbersearchConditions = [];
    if (searchTerm) {
        numbersearchConditions.push({
            $or: cowNumberSearchableFields.map(field => ({
                [field]: searchTerm.match('^[0-9]*$'),
            })),
        });
    }
    let searchCondition;
    if (searchTerm === null || searchTerm === void 0 ? void 0 : searchTerm.match('^[A-Za-z]+$')) {
        searchCondition = { $and: stringSearchTermConditions };
    }
    else if (searchTerm === null || searchTerm === void 0 ? void 0 : searchTerm.match('^[0-9]*$')) {
        searchCondition = { $and: numbersearchConditions };
    }
    else if (minPrice && maxPrice) {
        searchCondition = { price: { $gte: minPrice, $lte: maxPrice } };
    }
    else if (location) {
        searchCondition = {
            location: {
                $regex: location,
                $options: 'i',
            },
        };
    }
    else {
        searchCondition = {};
    }
    const allCows = yield cow_model_1.Cow.find(searchCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.Cow.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: allCows,
    };
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_model_1.Cow.findById(id);
    return cow;
});
const updateCow = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCow = yield cow_model_1.Cow.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return updatedCow;
});
const deleteCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_model_1.Cow.findByIdAndDelete(id);
    return cow;
});
exports.CowService = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
