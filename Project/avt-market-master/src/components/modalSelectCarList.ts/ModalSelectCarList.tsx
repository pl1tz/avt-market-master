import React from 'react';
import styles from './ModalSelectList.module.scss';
import { modalSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import { CardAuto } from '../cardAuto/CardAuto';
import { Loader } from '../loader/Loader';
import type { AutoCard } from '../../interfaces/cars.interface';

export const ModalSelectCarList = (): React.JSX.Element => {
    const isLoad: boolean = useSelector(modalSelector).selectCar.stateLoad.isLoad;
    const error: boolean = useSelector(modalSelector).selectCar.stateLoad.error;
    const carList: AutoCard[] = useSelector(modalSelector).selectCar.filter.car.carList;

    if (isLoad) {
        return (
            <>
                <Loader />
            </>
        );
    }

    if (error) {
        return <>Ошибка загрузки машин</>;
    }

    return (
        <div className={styles.modal_select__list}>
            {carList.map((car) => {
                return <CardAuto key={car.id} {...car} inModalSelect={true} />;
            })}
        </div>
    );
};
