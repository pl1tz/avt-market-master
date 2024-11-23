import React from 'react';
import { customFetch } from '../helpers/customFetch';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEditCar } from '../redux/slice/editCarSlice';
import type { AutoCard } from '../interfaces/cars.interface';
import type { URL } from '../interfaces/interface';

export const useCarEditLoad = (): void => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { id } = useParams();

    React.useEffect(() => {
        const transferredCar = location.state as AutoCard;

        if (transferredCar) {
            dispatch(setEditCar(transferredCar));
        } else {
            (async () => {
                const loadCar = await customFetch<AutoCard>({
                    url: `/cars/${id}` as URL,
                    method: 'GET',
                });
                dispatch(setEditCar(loadCar));
            })();
        }
    }, []);
};
