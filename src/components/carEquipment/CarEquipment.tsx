import React from 'react';
import styles from './CarEquipment.module.scss';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slice/modalSlice';
import type { AutoCard } from '../../interfaces/cars.interface';

export const CarEquipment = ({ car }: { car: AutoCard }): React.JSX.Element => {
    const dispath = useDispatch();

    const openModalEquipment = () => {
        dispath(openModal('equipment'));
    };

    return (
        <div className={styles.equipment}>
            <ul className={styles.equipment__list}>
                <li className={styles.equipment__item}>
                    <span className={styles.equipment__title_equipment}>Комплектация</span>
                    <span>{car.complectation_name}</span>
                </li>
                <li className={styles.equipment__item}>
                    <span className={styles.equipment__title_review}>Обзор</span>
                    {car.extras.slice(0, 1).map((category) => {
                        return category.names.slice(0, 3).map((name) => {
                            return <span key={name}>{name}</span>;
                        });
                    })}
                </li>
            </ul>
            <button className={styles.equipment__button} type="button" onClick={openModalEquipment}>
                Показать больше
            </button>
        </div>
    );
};
