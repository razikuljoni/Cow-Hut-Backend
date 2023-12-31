import { BAD_REQUEST, NOT_ACCEPTABLE } from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
    ICowFilters,
    IGenericResponse,
    IPaginationOptions,
} from '../../../interfaces/common';
import { User } from '../user/user.model';
import { ICow } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (cow: ICow): Promise<ICow | null | undefined> => {
    const result = await User.findById(cow.seller);
    if (result?.role === 'seller') {
        const createdCow = await Cow.create(cow);

        if (!createdCow) {
            throw new ApiError(BAD_REQUEST, '🚫 Cow creation failed!');
        }

        return createdCow;
    } else {
        throw new ApiError(
            NOT_ACCEPTABLE,
            '🚫 Given seller id is not a valid seller!'
        );
    }
};

const getAllCows = async (
    filters: ICowFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
    const {
        page = 1,
        limit = 10,
        minPrice,
        maxPrice,
        location,
    } = paginationOptions;
    const skip = (page - 1) * limit;
    const sortBy = paginationOptions.sortBy || 'createdAt';
    const sortOrder = paginationOptions.sortOrder || 'desc';
    const { searchTerm } = filters;

    const sortConditions: { [key: string]: SortOrder } = {};

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
    if (searchTerm?.match('^[A-Za-z]+$')) {
        searchCondition = { $and: stringSearchTermConditions };
    } else if (searchTerm?.match('^[0-9]*$')) {
        searchCondition = { $and: numbersearchConditions };
    } else if (minPrice && maxPrice) {
        searchCondition = { price: { $gte: minPrice, $lte: maxPrice } };
    } else if (location) {
        searchCondition = {
            location: {
                $regex: location,
                $options: 'i',
            },
        };
    } else {
        searchCondition = {};
    }

    const allCows = await Cow.find(searchCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await Cow.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: allCows,
    };
};

const getSingleCow = async (id: string) => {
    const cow = await Cow.findById(id);

    return cow;
};

const updateCow = async (id: string, payload: Partial<ICow>) => {
    const updatedCow = await Cow.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });

    return updatedCow;
};

const deleteCow = async (id: string) => {
    const cow = await Cow.findByIdAndDelete(id);

    return cow;
};
export const CowService = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
