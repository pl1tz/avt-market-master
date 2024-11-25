import React from 'react';
import { useSelector } from 'react-redux';
import { mediaQuerySelector } from '../redux/selectors';
import { createUrl } from '../helpers/car/createUrl';
import type { AutoCard } from '../interfaces/cars.interface';

interface UseCarsSimilarReturn {
    isLoading: boolean;
    isError: boolean;
    carsSimilar: AutoCard[];
    slidesPerView: number;
}

export const useCarsSimilar = (car: AutoCard): UseCarsSimilarReturn => {
    const { isMedium, isSmall } = useSelector(mediaQuerySelector);

    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);
    const [carsSimilar, setCarsSimilar] = React.useState<AutoCard[]>([]);

    const slidesPerView = React.useMemo(() => {
        if (isSmall) return 1;
        return isMedium ? 2 : 3;
    }, [isSmall, isMedium]);

    React.useEffect(() => {
        const fetchSimilarCars = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL!}/car_details?${createUrl(
                        car.brand.name,
                        car.model.name,
                        car.generation.name,
                    )}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch similar cars');
                }

                const cars = await response.json();
                setCarsSimilar(cars);
                setIsError(false);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSimilarCars();
    }, [car.brand.name, car.model.name, car.generation.name]);

    return {
        isLoading,
        isError,
        carsSimilar,
        slidesPerView,
    };
};
