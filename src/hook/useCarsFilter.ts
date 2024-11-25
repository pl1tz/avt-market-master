import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { carsSelector } from '../redux/selectors';
import { selectViewMode, selectSortOption, SORT_OPTIONS } from '../redux/slice/sortCarsSlice';
import { loadCars } from '../redux/slice/carsSlice';
import type { AppDispatch } from '../redux/store';
import type { AutoCard } from '../interfaces/cars.interface';

interface UseCarsFilterReturn {
    viewMode: 'vertical' | 'horizontal';
    isLoading: boolean;
    error: string | null;
    sortedCars: AutoCard[];
    pagination: {
        currentPage: number;
        totalPages: number;
    };
    handlers: {
        handleScrollTop: () => void;
    };
}

export const useCarsFilter = (): UseCarsFilterReturn => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { carsList, isLoading, error, pagination } = useSelector(carsSelector);
    const viewMode = useSelector(selectViewMode);
    const sortOption = useSelector(selectSortOption);

    const currentPage = Number(searchParams.get('page')) || 1;

    const handlers = React.useMemo(
        () => ({
            handleScrollTop: () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            },
        }),
        [],
    );

    React.useEffect(() => {
        const params = new URLSearchParams(searchParams);

        Object.values(SORT_OPTIONS).forEach((option) => {
            params.delete(option.param);
        });

        if (sortOption) {
            params.set(SORT_OPTIONS[sortOption].param, 'true');
        }

        navigate(`?${params.toString()}`, { replace: true });

        const requestParams: Record<string, string | number> = {};
        params.forEach((value, key) => {
            if (value) requestParams[key] = value;
        });

        dispatch(
            loadCars({
                ...requestParams,
                page: currentPage,
            }),
        );

        if (currentPage > 1) {
            handlers.handleScrollTop();
        }
    }, [dispatch, searchParams, currentPage, sortOption, handlers, navigate]);

    return {
        viewMode,
        isLoading,
        error,
        sortedCars: carsList,
        pagination,
        handlers,
    };
};
