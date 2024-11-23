import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filtersSelector } from '../redux/selectors';
import { setViewMode } from '../redux/slice/sortCarsSlice';
import { resetFilters, filterMapping } from '../redux/slice/filterSlice';
import type { ViewMode } from '../redux/slice/sortCarsSlice';
import type { Filter, FilterKeys } from '../interfaces/filter.interface';
import type { AppDispatch } from '../redux/store';

interface UseCarSelectionReturn {
    filters: Record<string, string | null>;
    carCount: number | null;
    filterList: Filter[];
    openFilter: FilterKeys | null;
    isSortOpen: boolean;
    handlers: {
        handleToggleFilter: (title: FilterKeys) => void;
        handleToggleSort: () => void;
        handleFindCars: () => void;
        handleResetFilters: () => void;
        handleViewModeChange: (mode: ViewMode) => void;
    };
}

export const useCarSelection = (): UseCarSelectionReturn => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const {
        values: filters,
        state: { carCount, filtersList },
    } = useSelector(filtersSelector);

    const [openFilter, setOpenFilter] = React.useState<FilterKeys | null>(null);
    const [isSortOpen, setIsSortOpen] = React.useState(false);

    const handlers = React.useMemo(
        () => ({
            handleToggleFilter: (title: FilterKeys): void => {
                setOpenFilter((prev) => (prev === title ? null : title));
                setIsSortOpen(false);
            },

            handleToggleSort: (): void => {
                setIsSortOpen((prev) => !prev);
                setOpenFilter(null);
            },

            handleFindCars: () => {
                const params: Record<string, string> = {};

                Object.entries(filters).forEach(([key, value]) => {
                    if (value && key in filterMapping) {
                        params[filterMapping[key as keyof typeof filterMapping]] = value.toString();
                    }
                });

                const queryString = new URLSearchParams(params).toString();

                navigate(`/cars${queryString ? `?${queryString}` : ''}`);
            },

            handleResetFilters: () => {
                dispatch(resetFilters());
                navigate('/cars');
            },

            handleViewModeChange: (mode: ViewMode) => {
                dispatch(setViewMode(mode));
            },
        }),
        [dispatch, navigate, filters],
    );

    return {
        filters,
        carCount,
        filterList: filtersList,
        openFilter,
        isSortOpen,
        handlers,
    };
};
