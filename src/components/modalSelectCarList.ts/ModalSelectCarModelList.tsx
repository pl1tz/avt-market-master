import React from 'react';
import styles from './ModalSelectList.module.scss';
import { modalSelector } from '../../redux/selectors';
import { setFilterModel } from '../../redux/slice/modalSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { SelectCarSection } from '../../interfaces/slice.interface';
import type { CarsCountGenerations, CarsCountModel } from '../../interfaces/cars.interface';

export const ModalSelectCarModelList = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const setModelFilter = (configValue: SelectCarSection<CarsCountModel[], CarsCountGenerations[]>) => {
        dispatch(setFilterModel(configValue));
    };

    const filterList = useSelector(modalSelector).selectCar.filter.model.thisValue!;

    return (
        <ul className={styles.modal_select__list}>
            {filterList.map((item) => {
                const filter = item as CarsCountModel;
                return (
                    <li
                        className={styles.modal_select__item}
                        key={filter.name}
                        onClick={() =>
                            setModelFilter({
                                nextValue: filter.generations,
                                thisValue: filterList,
                                status: true,
                                selected: filter.name,
                            })
                        }
                    >
                        {filter.name} <span>{filter.total}</span>
                    </li>
                );
            })}
        </ul>
    );
};
