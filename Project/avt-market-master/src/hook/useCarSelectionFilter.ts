import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadFilters, setFilterValue } from '../redux/slice/filterSlice';
import { filtersSelector } from '../redux/selectors';
import type { AppDispatch } from '../redux/store';
import type { FilterKeys } from '../interfaces/filter.interface';
import { useSearchParams } from 'react-router-dom';

interface UseCarSelectionFilterProps {
    filterKey: FilterKeys;
    title: string;
    isOpen: boolean;
    onToggle: (key: FilterKeys) => void;
}

export const useCarSelectionFilter = ({ filterKey, title, isOpen, onToggle }: UseCarSelectionFilterProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const filterRef = React.useRef<HTMLDivElement>(null);
    const [isInitialized, setIsInitialized] = React.useState(false);
    const [searchParams] = useSearchParams();

    const {
        brand_name,
        model_name,
        year_from,
        max_price,
        owners_count,
        engine_name_type_name,
        generation_name,
        gearbox_type_name: gearbox_type_id,
        body_type_name: body_type_id,
        drive_type_name: drive_type_id,
    } = useSelector(filtersSelector).values;

    React.useEffect(() => {
        if (!isInitialized) {
            const urlValue = searchParams.get(filterKey);
            if (urlValue) {
                dispatch(setFilterValue({ key: filterKey, value: urlValue }));
            }
            setIsInitialized(true);
        }
    }, [dispatch, filterKey, isInitialized, searchParams]);

    const getCurrentValue = React.useCallback(() => {
        switch (filterKey) {
            case 'brand_name':
                return brand_name || title;
            case 'model_name':
                return model_name || title;
            case 'generation_name':
                return generation_name || title;
            case 'year_from':
                return year_from || title;
            case 'max_price':
                return max_price || title;
            case 'engine_name_type_name':
                return engine_name_type_name || title;
            case 'gearbox_type_name':
                return gearbox_type_id || title;
            case 'body_type_name':
                return body_type_id || title;
            case 'drive_type_name':
                return drive_type_id || title;
            case 'owners_count':
                return owners_count || title;
            default:
                return title;
        }
    }, [
        filterKey,
        title,
        brand_name,
        model_name,
        generation_name,
        year_from,
        max_price,
        engine_name_type_name,
        gearbox_type_id,
        body_type_id,
        drive_type_id,
        owners_count,
    ]);

    const handleClick = React.useCallback((): void => {
        onToggle(filterKey);
    }, [onToggle, filterKey]);

    const handleSelectItem = React.useCallback(
        (item: string): void => {
            dispatch(setFilterValue({ key: filterKey, value: item }));
            const filterParams: Record<string, string> = {};

            if (brand_name) filterParams.brand_name = brand_name;
            if (model_name) filterParams.model_name = model_name;
            if (generation_name) filterParams.generation_name = generation_name;
            if (year_from) filterParams.year_from = year_from;
            if (max_price) filterParams.max_price = max_price;
            if (engine_name_type_name) filterParams.engine_name_type_name = engine_name_type_name;
            if (gearbox_type_id) filterParams.gearbox_type_name = gearbox_type_id;
            if (body_type_id) filterParams.body_type_name = body_type_id;
            if (drive_type_id) filterParams.drive_type_name = drive_type_id;
            if (owners_count) filterParams.owners_count = owners_count;

            filterParams[filterKey] = item;
            dispatch(loadFilters(filterParams));
            onToggle(filterKey);
        },
        [
            dispatch,
            filterKey,
            onToggle,
            brand_name,
            model_name,
            generation_name,
            year_from,
            max_price,
            engine_name_type_name,
            gearbox_type_id,
            body_type_id,
            drive_type_id,
            owners_count,
        ],
    );

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node) && isOpen) {
                onToggle(filterKey);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onToggle, filterKey]);

    return {
        filterRef,
        getCurrentValue,
        handleClick,
        handleSelectItem,
    };
};
