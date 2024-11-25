import React from 'react';
import { useSelector } from 'react-redux';
import { lastArrivalsSelector, mediaQuerySelector } from '../redux/selectors';
import type { AutoCard } from '../interfaces/cars.interface';

interface UseLastArrivalsReturn {
    lastArrivalsList: AutoCard[];
    isLoading: boolean;
    error: boolean;
    slidesPerView: number;
}

export const useLastArrivals = (): UseLastArrivalsReturn => {
    const {
        lastArrivalsList,
        stateLoad: { error, isLoad: isLoading },
    } = useSelector(lastArrivalsSelector);

    const { isMedium, isSmall } = useSelector(mediaQuerySelector);

    // Мемоизируем количество слайдов
    const slidesPerView = React.useMemo(() => {
        if (isSmall) return 1;
        return isMedium ? 2 : 3;
    }, [isSmall, isMedium]);

    return {
        lastArrivalsList,
        isLoading,
        error,
        slidesPerView,
    };
};
