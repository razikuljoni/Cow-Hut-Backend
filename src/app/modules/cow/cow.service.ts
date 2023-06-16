import { ICow } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (cow: ICow): Promise<ICow | null> => {
    const createdCow = (await Cow.create(cow)).populate('seller');

    return createdCow;
};

export const CowService = {
    createCow,
};
