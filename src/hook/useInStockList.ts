import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { inStockListSelector, mediaQuerySelector, carsSelector } from '../redux/selectors';
import { loadFilters, setFilterValue } from '../redux/slice/filterSlice';
import type { CarsCount } from '../interfaces/cars.interface';
import type { AppDispatch } from '../redux/store';

interface UseInStockListReturn {
    isLoading: boolean;
    error: boolean;
    visibleMore: boolean;
    listData: {
        inStockList: CarsCount[];
        currentModels?: CarsCount['models'];
        currentGenerations?: CarsCount['models'][0]['generations'];
        visibleItems: CarsCount[];
    };
    params: {
        brandParam: string | null;
        modelParam: string | null;
        generationParam: string | null;
    };
    handlers: {
        handleMoreButton: () => void;
        handleBrandClick: (brandName: string) => void;
        handleModelClick: (brandName: string, modelName: string) => void;
        handleGenerationClick: (brandName: string, modelName: string, generationName: string) => void;
    };
}

export const useInStockList = (): UseInStockListReturn => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [visibleMore, setVisibleMore] = React.useState(false);

    const {
        inStockList,
        stateLoad: { error, isLoad },
    } = useSelector(inStockListSelector);
    const isLoadCars = useSelector(carsSelector).isLoading;
    const isSmall = useSelector(mediaQuerySelector).isSmall;

    const params = {
        brandParam: searchParams.get('brand_name'),
        modelParam: searchParams.get('model_name'),
        generationParam: searchParams.get('generation_name'),
    };

    const handlers = React.useMemo(
        () => ({
            handleMoreButton: () => setVisibleMore((prev) => !prev),

            handleBrandClick: (brandName: string) => {
                dispatch(setFilterValue({ key: 'brand_name', value: brandName }));
                dispatch(loadFilters({ brand_name: brandName }));
                navigate(`/cars?brand_name=${brandName}`);
            },

            handleModelClick: (brandName: string, modelName: string) => {
                dispatch(setFilterValue({ key: 'model_name', value: modelName }));
                dispatch(
                    loadFilters({
                        brand_name: brandName,
                        model_name: modelName,
                    }),
                );
                navigate(`/cars?brand_name=${brandName}&model_name=${modelName}`);
            },

            handleGenerationClick: (brandName: string, modelName: string, generationName: string) => {
                dispatch(setFilterValue({ key: 'generation_name', value: generationName }));
                dispatch(
                    loadFilters({
                        brand_name: brandName,
                        model_name: modelName,
                        generation_name: generationName,
                    }),
                );
                navigate(`/cars?brand_name=${brandName}&model_name=${modelName}&generation=${generationName}`);
            },
        }),
        [dispatch, navigate],
    );

    const listData = React.useMemo(() => {
        const { brandParam, modelParam } = params;

        const currentBrand = brandParam ? inStockList.find((item) => item.brand === brandParam) : null;
        const currentModels = currentBrand?.models;
        const currentGenerations = currentBrand?.models.find((model) => model.name === modelParam)?.generations;

        const visibleItems = visibleMore ? inStockList : inStockList.slice(0, isSmall ? 5 : 24);

        return {
            inStockList,
            currentModels,
            currentGenerations,
            visibleItems,
        };
    }, [inStockList, params, visibleMore, isSmall]);

    React.useEffect(() => {
        const { brandParam, modelParam, generationParam } = params;

        if (brandParam) {
            dispatch(setFilterValue({ key: 'brand_name', value: brandParam }));
        }
        if (modelParam) {
            dispatch(setFilterValue({ key: 'model_name', value: modelParam }));
        }
        if (generationParam) {
            dispatch(setFilterValue({ key: 'generation_name', value: generationParam }));
        }
    }, [dispatch, params]);

    return {
        isLoading: isLoad || isLoadCars,
        error,
        visibleMore,
        listData,
        params,
        handlers,
    };
};
