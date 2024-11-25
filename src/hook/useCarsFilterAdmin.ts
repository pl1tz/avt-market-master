import React from 'react';
import { customFetch } from '../helpers/customFetch';
import { AutoCard } from '../interfaces/cars.interface';
import type { Filter } from '../interfaces/filter.interface';
import type { UseCarsAdminType } from '../interfaces/hook.interface';
import type { URL } from '../interfaces/interface';

export type FilterElement = {
    key: 'brand_name' | 'model_name' | 'generation_name';
    selectItems: string[];
    value: string;
};

type FilterKey = FilterElement['key'];

const INIT_FILTER_VALUE = {
    brand_name: 'Все бренды',
    model_name: 'Все модели',
    generation_name: 'Все поколения',
} as const;

const createFilterUrl = (params: Record<FilterKey, string>, changedKey: FilterKey): string => {
    const searchParams = new URLSearchParams();
    const filterOrder: FilterKey[] = ['brand_name', 'model_name', 'generation_name'];
    const currentKeyIndex = filterOrder.indexOf(changedKey);

    Object.entries(params).forEach(([key, value]) => {
        const keyIndex = filterOrder.indexOf(key as FilterKey);

        if (value && value !== INIT_FILTER_VALUE[key as FilterKey] && keyIndex <= currentKeyIndex) {
            searchParams.append(key, value);
        }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
};

export const useCarsFilterAdmin = (): UseCarsAdminType => {
    const [cars, setCars] = React.useState<AutoCard[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [filters, setFilters] = React.useState<Record<FilterKey, FilterElement>>({
        brand_name: {
            key: 'brand_name',
            selectItems: [],
            value: INIT_FILTER_VALUE.brand_name,
        },
        model_name: {
            key: 'model_name',
            selectItems: [],
            value: INIT_FILTER_VALUE.model_name,
        },
        generation_name: {
            key: 'generation_name',
            selectItems: [],
            value: INIT_FILTER_VALUE.generation_name,
        },
    });

    const fetchData = async (urlSuffix: string) => {
        setLoading(true);

        try {
            const [filterData, carsData] = await Promise.all([
                customFetch<Filter[]>({ url: `filters${urlSuffix}` as URL, method: 'GET' }),
                customFetch<AutoCard[]>({
                    url: `cars${urlSuffix ? `${urlSuffix}&coll=all` : ''}` as URL,
                    method: 'GET',
                }),
            ]);
            return { filterData, carsData };
        } finally {
            setLoading(false);
        }
    };

    const updateFilters = (
        key: FilterKey,
        value: string,
        selectItemsUpdate?: { key: FilterKey; values: string[] }[],
    ) => {
        setFilters((prev) => {
            const newFilters = { ...prev };

            newFilters[key] = {
                ...newFilters[key],
                value,
            };

            const resetOrder: FilterKey[] = ['brand_name', 'model_name', 'generation_name'];
            const currentIndex = resetOrder.indexOf(key);

            resetOrder.slice(currentIndex + 1).forEach((filterKey) => {
                newFilters[filterKey] = {
                    ...newFilters[filterKey],
                    value: INIT_FILTER_VALUE[filterKey],
                };
            });

            selectItemsUpdate?.forEach((update) => {
                newFilters[update.key] = {
                    ...newFilters[update.key],
                    selectItems: update.values,
                };
            });

            return newFilters;
        });
    };

    const handleFilterChange = async (key: FilterKey, value: string) => {
        const currentFilters = {
            brand_name: filters.brand_name.value,
            model_name: filters.model_name.value,
            generation_name: filters.generation_name.value,
            [key]: value,
        };

        const urlSuffix = createFilterUrl(currentFilters, key);
        const { filterData, carsData } = await fetchData(urlSuffix);

        setCars(carsData);

        const updates: { key: FilterKey; values: string[] }[] = [];
        if (key === 'brand_name') {
            updates.push({ key: 'model_name', values: filterData[2].values });
        } else if (key === 'model_name') {
            updates.push({ key: 'generation_name', values: filterData[3].values });
        }

        updateFilters(key, value, updates);
    };

    React.useEffect(() => {
        const initializeFilters = async () => {
            const { filterData } = await fetchData('');
            updateFilters('brand_name', INIT_FILTER_VALUE.brand_name, [
                { key: 'brand_name', values: filterData[1].values },
            ]);
        };

        initializeFilters();
    }, []);

    return {
        cars,
        loading,
        filters,
        onFilterChange: handleFilterChange,
        setCars,
    };
};
