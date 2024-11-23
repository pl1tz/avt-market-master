import React from 'react';
import styles from './ModalBenefit.module.scss';
import { closeModal } from '../../redux/slice/modalSlice';
import { Cross } from '../svg/Svg';
import { Link } from 'react-router-dom';
import { modalSelector } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../redux/store';

export const ModalBenefit = (): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const modalBenefitState = useSelector(modalSelector).promotion.modalState;
    const title: string = useSelector(modalSelector).promotion.title;
    const description: string = useSelector(modalSelector).promotion.description;
    const link: string = useSelector(modalSelector).promotion.link || '';

    const stopPropagationHandler = (event: React.MouseEvent) => event.stopPropagation();
    const closeModalHandler = () => {
        dispatch(closeModal('promotion'));
    };

    return (
        <div
            className={`${styles.modal_benefit} ${modalBenefitState ? styles.modal_benefit_active : ''}`}
            onClick={closeModalHandler}
        >
            <div className={styles.modal_benefit__inner} onClick={stopPropagationHandler}>
                <Cross handler={closeModalHandler} className="" />

                <h3 className={styles.modal_benefit__title}>{title}</h3>
                <p className={styles.modal_benefit__description}>{description}</p>
                {link ? (
                    <Link className={styles.modal_benefit__btn} to={link} onClick={closeModalHandler}>
                        Подробнее
                    </Link>
                ) : null}
            </div>
        </div>
    );
};
