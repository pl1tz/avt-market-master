import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { editCarSelector } from '../redux/selectors';
import type { CarEditHistoryType } from '../interfaces/editCar.interface';

export const useCarEditHistory = (): [CarEditHistoryType | null, number | undefined, number | undefined] => {
    const carId = useSelector(editCarSelector).car?.id || useLocation().state?.car?.id;
    const historyId = useSelector(editCarSelector).car?.history_cars[0].id;
    const [carHistory, setCarHistory] = React.useState<CarEditHistoryType | null>(null);

    React.useEffect(() => {
        (async () => {
            if (historyId) {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/history_cars/${historyId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setCarHistory(data);
            }
        })();
    }, [carId]);

    return [carHistory, historyId, carId];
};
