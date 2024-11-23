import React from 'react';
import { useSelector } from 'react-redux';
import { editCarSelector } from '../redux/selectors';
import { useLocation } from 'react-router-dom';
import type { CarEditComplectationType } from '../interfaces/editCar.interface';

export const useCarEditComplectation = () => {
    const carId = useSelector(editCarSelector).car?.id || useLocation().state?.car?.id;
    const [complectation, setComplectation] = React.useState<CarEditComplectationType | null>(null);

    React.useEffect(() => {
        if (carId) {
            (async () => {
                const response: Response = await fetch(
                    `${process.env.REACT_APP_BASE_URL}/extras/car_show?car_id=${carId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                );

                const data = await response.json();
                setComplectation(data);
            })();
        }
    }, [carId]);

    return { complectation, carId };
};
