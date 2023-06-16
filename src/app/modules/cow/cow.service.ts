import { ICow } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (cow: ICow): Promise<ICow | null> => {
    const createdCow = (await Cow.create(cow)).populate('seller');

    return createdCow;
};

const getAllCows = async () => {
    const allCows = await Cow.find();

    return allCows;
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
