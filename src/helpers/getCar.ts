import { customFetch } from './customFetch';
import type { AutoCard } from '../interfaces/cars.interface';
import { URL } from '../interfaces/interface';

export const getCar = async (id: number): Promise<AutoCard> => {
    const response = await customFetch<AutoCard>({ url: `cars/${id}` as URL, method: 'GET' });
    return response;
};
