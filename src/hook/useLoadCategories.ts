import React from 'react';
import { customFetch } from '../helpers/customFetch';
import type { EngineCapacityElement, EnginePowerElement, BaseEditElement } from '../interfaces/editCar.interface';

export const useLoadCategories = () => {
    const [brands, setBrands] = React.useState<Array<Omit<SelectElement, 'model_id'>>>([]);
    const [models, setModels] = React.useState<SelectElementWithBrandId[]>([]);
    const [generations, setGenerations] = React.useState<Array<SelectElement>>([]);
    const [colors, setColors] = React.useState<Array<SelectElement>>([]);
    const [bodyTypes, setBodyTypes] = React.useState<Array<SelectElement>>([]);
    const [enginePowerTypes, setEnginePowerTypes] = React.useState<Array<EnginePowerElement>>([]);
    const [engineNameTypes, setEngineNameTypes] = React.useState<Array<BaseEditElement>>([]);
    const [engineCapacityTypes, setEngineCapacityTypes] = React.useState<Array<EngineCapacityElement>>([]);
    const [gearboxTypes, setGearboxTypes] = React.useState<Array<SelectElement>>([]);
    const [driveTypes, setDriveTypes] = React.useState<Array<SelectElement>>([]);
    const [extras, setExtras] = React.useState<Array<SelectElement>>([]);
    const [categories, setCategories] = React.useState<Array<SelectElement>>([]);

    React.useEffect(() => {
        (async () => {
            const [
                brandsResponse,
                modelsResponse,
                generationsResponse,
                colorsResponse,
                bodyTypesResponse,
                enginePowerTypesResponse,
                engineNameTypesResponse,
                engineCapacityTypesResponse,
                gearboxTypesResponse,
                driveTypesResponse,
                extrasResponse,
            ] = await Promise.all([
                await customFetch<Array<SelectElement>>({ url: 'brands', method: 'GET' }),
                await customFetch<Array<SelectElementWithBrandId>>({ url: 'models', method: 'GET' }),
                await customFetch<Array<SelectElement>>({ url: 'generations', method: 'GET' }),
                await customFetch<Array<SelectElement>>({ url: 'colors', method: 'GET' }),
                await customFetch<Array<SelectElement>>({ url: 'body_types', method: 'GET' }),
                await customFetch<Array<EnginePowerElement>>({ url: 'engine_power_types', method: 'GET' }),
                await customFetch<Array<BaseEditElement>>({ url: 'engine_name_types', method: 'GET' }),
                await customFetch<Array<EngineCapacityElement>>({ url: 'engine_capacity_types', method: 'GET' }),
                await customFetch<Array<SelectElement>>({ url: 'gearbox_types', method: 'GET' }),
                await customFetch<Array<SelectElement>>({ url: 'drive_types', method: 'GET' }),
                await customFetch<{ all_extra_names: SelectElement[]; all_categories: SelectElement[] }>({
                    url: 'extras/all_extras',
                    method: 'GET',
                }),
            ]);

            setBrands(brandsResponse);
            setModels(modelsResponse);
            setGenerations(generationsResponse);
            setColors(colorsResponse);
            setBodyTypes(bodyTypesResponse);
            setEnginePowerTypes(enginePowerTypesResponse);
            setEngineNameTypes(engineNameTypesResponse);
            setEngineCapacityTypes(engineCapacityTypesResponse);
            setGearboxTypes(gearboxTypesResponse);
            setDriveTypes(driveTypesResponse);
            setExtras(extrasResponse.all_extra_names);
            setCategories(extrasResponse.all_categories);
        })();
    }, []);

    const refreshData = React.useCallback(async () => {
        const [
            brandsResponse,
            modelsResponse,
            generationsResponse,
            colorsResponse,
            bodyTypesResponse,
            enginePowerTypesResponse,
            engineNameTypesResponse,
            engineCapacityTypesResponse,
            gearboxTypesResponse,
            driveTypesResponse,
            extrasResponse,
        ] = await Promise.all([
            customFetch<Array<SelectElement>>({ url: 'brands', method: 'GET' }),
            customFetch<Array<SelectElementWithBrandId>>({ url: 'models', method: 'GET' }),
            customFetch<Array<SelectElement>>({ url: 'generations', method: 'GET' }),
            customFetch<Array<SelectElement>>({ url: 'colors', method: 'GET' }),
            customFetch<Array<SelectElement>>({ url: 'body_types', method: 'GET' }),
            customFetch<Array<EnginePowerElement>>({ url: 'engine_power_types', method: 'GET' }),
            customFetch<Array<BaseEditElement>>({ url: 'engine_name_types', method: 'GET' }),
            customFetch<Array<EngineCapacityElement>>({ url: 'engine_capacity_types', method: 'GET' }),
            customFetch<Array<SelectElement & { abbreviation: string }>>({ url: 'gearbox_types', method: 'GET' }),
            customFetch<Array<SelectElement>>({ url: 'drive_types', method: 'GET' }),
            customFetch<{ all_extra_names: SelectElement[]; all_categories: SelectElement[] }>({
                url: 'extras/all_extras',
                method: 'GET',
            }),
        ]);

        setBrands(brandsResponse);
        setModels(modelsResponse);
        setGenerations(generationsResponse);
        setColors(colorsResponse);
        setBodyTypes(bodyTypesResponse);
        setEnginePowerTypes(enginePowerTypesResponse);
        setEngineNameTypes(engineNameTypesResponse);
        setEngineCapacityTypes(engineCapacityTypesResponse);
        setGearboxTypes(gearboxTypesResponse);
        setDriveTypes(driveTypesResponse);
        setExtras(extrasResponse.all_extra_names);
        setCategories(extrasResponse.all_categories);
    }, []);

    return {
        brands,
        models,
        generations,
        colors,
        bodyTypes,
        enginePowerTypes,
        engineNameTypes,
        engineCapacityTypes,
        gearboxTypes,
        driveTypes,
        extras,
        categories,
        refreshData,
    };
};

export type SelectElement = {
    id: number;
    name: string;
    model_id: number;
    created_at: string;
    updated_at: string;
};

export type SelectElementWithBrandId = Omit<SelectElement, 'model_id'> & { brand_id: number };
