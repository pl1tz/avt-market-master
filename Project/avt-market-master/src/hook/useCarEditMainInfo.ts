import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { editCarSelector } from '../redux/selectors';
import type { AllModels, EditCar, AllGenerations } from '../interfaces/editCar.interface';

export const useCarEditMainInfo = (): [EditCar | null, AllModels[], AllGenerations[]] => {
    const [car, setCar] = React.useState<EditCar | null>(null);
    const [modelValues, setModelValues] = React.useState<AllModels[]>([]);
    const [generationValues, setGenerationValues] = React.useState<AllGenerations[]>([]);
    const carId = useSelector(editCarSelector).car?.id || useLocation().state?.car?.id;

    const getModelValues = (editCar: EditCar): AllModels[] => {
        return editCar.all_brands.find((brand) => brand.name === editCar.brands.name)!.all_models;
    };

    const getGenerationValues = (editCar: EditCar): AllGenerations[] => {
        return getModelValues(editCar).find((model) => model.name === editCar?.models.name)!.all_generations;
    };

    React.useEffect(() => {
        (async () => {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/car_ids?id=${carId}`);
            const data: EditCar = await response.json();

            setCar(data);
            setModelValues(getModelValues(data));
            setGenerationValues(getGenerationValues(data));
        })();
    }, [carId]);

    return [car, modelValues, generationValues];
};
