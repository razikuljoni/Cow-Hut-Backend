import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/commonGeneric';
import { ICow } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (cow: ICow): Promise<ICow | null> => {
    const createdCow = (await Cow.create(cow)).populate('seller');

    return createdCow;
};

type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: SortOrder;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
    searchTerm?: string;
};

const getAllCows = async (
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
    const { page = 1, limit = 10 } = paginationOptions;
    const skip = (page - 1) * limit;
    const sortBy = paginationOptions.sortBy || 'createdAt';
    const sortOrder = paginationOptions.sortOrder || 'desc';

    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }

    const allCows = await Cow.find()
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
    const cow = await Cow.findById(id).populate('seller');

    return cow;
};

const updateCow = async (id: string, payload: Partial<ICow>) => {
    const updatedCow = await Cow.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });

    return updatedCow;
};

const deleteCow = async (id: string) => {
    const cow = await Cow.findByIdAndDelete(id).populate('seller');

    return cow;
};
export const CowService = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
