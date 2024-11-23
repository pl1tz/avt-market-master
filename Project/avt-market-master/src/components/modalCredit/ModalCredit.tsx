import React from 'react';
import styles from './ModalCredit.module.scss';
import { CardAuto } from '../cardAuto/CardAuto';
import { FormCredit } from '../formCredit/FormCredit';
import { closeModal } from '../../redux/slice/modalSlice';
import { useSelector, useDispatch } from 'react-redux';
import { modalSelector } from '../../redux/selectors';
import { Cross } from '../svg/Svg';
import { useCreditForm } from '../../hook/useCreditForm';
import type { AutoCard } from '../../interfaces/cars.interface';

const benefits = ['Гарантия 1 год', 'Скидка до 300 000', 'Первый взнос от 0%', 'Trade-in как первый взнос'];

export const ModalCredit = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const car: AutoCard = useSelector(modalSelector).selectCar.filter.car.carSelect;
    const modalCreditState: boolean = useSelector(modalSelector).credit.modalState;
    const { register, errors, onSubmit, handleSubmit, sliderField, setValue, payment } = useCreditForm();

    const closeHandler = (): void => {
        dispatch(closeModal('credit'));
    };

    return (
        <div
            className={`${styles.modal_credit} ${modalCreditState ? styles.modal_credit_active : ''}`}
            onClick={closeHandler}
        >
            <div className={styles.modal_credit__inner} onClick={(event) => event.stopPropagation()}>
                <header className={styles.modal_credit__header}>
                    <h3 className={styles.modal_credit__title}>Заявка на кредит</h3>
                    <h4>
                        {car.brand?.name} {car.model?.name} {car.year}г.
                    </h4>
                    <Cross className={styles.modal_credit__cross} handler={closeHandler} />
                </header>

                <div className={styles.modal_credit__content}>
                    <section className={styles.modal_credit__benefits}>
                        {benefits.map((benefit) => {
                            return (
                                <article className={styles.modal_credit__benefits_item} key={benefit}>
                                    {benefit}
                                </article>
                            );
                        })}
                    </section>

                    <section className={styles.modal_credit__application}>
                        <FormCredit {...{ register, errors, onSubmit, handleSubmit, sliderField, setValue, payment }} />
                        {car.id ? (
                            <CardAuto {...car} extraClassName={styles.modal_credit__card_car} inModalCredit={true} />
                        ) : null}
                    </section>
                </div>
            </div>
        </div>
    );
};
