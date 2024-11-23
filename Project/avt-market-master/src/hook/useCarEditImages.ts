import React from 'react';
import { useSelector } from 'react-redux';
import { editCarSelector } from '../redux/selectors';
import { useLocation } from 'react-router-dom';
import { customFetch } from '../helpers/customFetch';
import type { URL } from '../interfaces/interface';
import type { AutoCardAutoImage, AutoCard } from '../interfaces/cars.interface';

export const useCarEditImages = () => {
    const carId = useSelector(editCarSelector).car?.id || useLocation().state?.car?.id;

    const [images, setImages] = React.useState<AutoCardAutoImage[]>([]);

    React.useEffect(() => {
        if (carId) {
            (async () => {
                const response = await customFetch<AutoCard>({
                    url: `/cars/${carId}` as URL,
                    method: 'GET',
                });

                setImages(response.images);
            })();
        }
    }, [carId]);

    return { images, setImages, carId };
};
