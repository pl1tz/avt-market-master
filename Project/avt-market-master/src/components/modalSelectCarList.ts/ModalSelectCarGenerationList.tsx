import React from 'react';
import styles from './ModalSelectList.module.scss';
import { modalSelector } from '../../redux/selectors';
import { setFilterGeneration, selectCarsLoader } from '../../redux/slice/modalSlice';
import { useSelector, useDispatch } from 'react-redux';
import { createUrl } from '../../helpers/car/createUrl';
import type { SelectCarSection } from '../../interfaces/slice.interface';
import type { AutoCard, CarsCountGenerations } from '../../interfaces/cars.interface';
import type { AppDispatch } from '../../redux/store';

export const ModalSelectCarGenerationList = (): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();

    const brand: string = useSelector(modalSelector).selectCar.filter.brand.selected;
    const model: string = useSelector(modalSelector).selectCar.filter.model.selected;

    const setGenerationFilter = (configValue: SelectCarSection<CarsCountGenerations[], AutoCard[]>) => {
        dispatch(setFilterGeneration(configValue));
    };

    const filterList = useSelector(modalSelector).selectCar.filter.generation.thisValue!;

    return (
        <ul className={styles.modal_select__list}>
            {filterList.map((item) => {
                const filter = item as CarsCountGenerations;
                return (
                    <li
                        className={styles.modal_select__item}
                        key={filter.name}
                        onClick={() => {
                            setGenerationFilter({
                                thisValue: filterList,
                                nextValue: [],
                                status: true,
                                selected: filter.name,
                            });
                            dispatch(selectCarsLoader(createUrl(brand, model, filter.name)));
                        }}
                    >
                        {filter.name} <span>{filter.count}</span>
                    </li>
                );
            })}
        </ul>
    );
};
