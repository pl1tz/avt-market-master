import React from 'react';
import styles from './SelectAutoButton.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/slice/modalSlice';
import { modalSelector } from '../../redux/selectors';
import type { SelectAutoButtonProps } from '../../interfaces/form.interface';
import type { AutoCard } from '../../interfaces/cars.interface';

export const SelectAutoButton = ({ register, isError }: SelectAutoButtonProps): React.JSX.Element => {
    const dispatch = useDispatch();
    const selectCar: AutoCard = useSelector(modalSelector).selectCar.filter.car.carSelect;

    const selectButtonHandler = (): void => {
        dispatch(openModal('selectCar'));
    };

    const getButtonValue = () => {
        if (selectCar?.brand?.name) {
            return `${selectCar.brand.name} ${selectCar.model.name} ${selectCar.year}`;
        }
        return 'Выбрать автомобиль';
    };

    return (
        <input
            {...register}
            className={`${styles.select_auto_button} ${!selectCar?.brand?.name && isError ? 'field_error' : ''}`}
            type="button"
            value={getButtonValue()}
            onClick={selectButtonHandler}
        />
    );
};
