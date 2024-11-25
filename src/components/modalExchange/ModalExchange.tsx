import React from 'react';
import styles from './ModalExchange.module.scss';
import { CardAuto } from '../cardAuto/CardAuto';
import { closeModal } from '../../redux/slice/modalSlice';
import { useSelector, useDispatch } from 'react-redux';
import { modalSelector } from '../../redux/selectors';
import { Cross } from '../svg/Svg';
import { FormExchange } from '../formExchange/FormExchange';
import type { AutoCard } from '../../interfaces/cars.interface';

const benefits = ['Гарантия 1 год', 'Скидка до 300 000', 'Первый взнос от 0%', 'Trade-in как первый взнос'];

export const ModalExchange = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const [car, setCar] = React.useState<AutoCard | null>(null);
    const { selectCar, exchange } = useSelector(modalSelector);
    const modalExchangeState = exchange.modalState;

    const closeHandler = (): void => {
        dispatch(closeModal('exchange'));
    };

    React.useEffect(() => {
        const carData = selectCar.filter.car.carSelect;
        if (carData && (!car || car.id !== carData.id)) {
            setCar(carData);
        }
    }, [selectCar, car]);

    if (!car?.brand) return <></>;

    return (
        <div
            className={`${styles.modal_exchange} ${modalExchangeState ? styles.modal_exchange_active : ''}`}
            onClick={closeHandler}
        >
            <div className={styles.modal_exchange__inner} onClick={(event) => event.stopPropagation()}>
                <header className={styles.modal_exchange__header}>
                    <h3 className={styles.modal_exchange__title}>Заявка на Trade in</h3>
                    <h4>
                        {car.brand?.name} {car.model?.name} {car?.year}г.
                    </h4>
                    <Cross className={styles.modal_exchange__cross} handler={closeHandler} />
                </header>

                <div className={styles.modal_exchange__content}>
                    <section className={styles.modal_exchange__benefits}>
                        {benefits.map((benefit) => {
                            return (
                                <article className={styles.modal_exchange__benefits_item} key={benefit}>
                                    {benefit}
                                </article>
                            );
                        })}
                    </section>

                    <section className={styles.modal_exchange__application}>
                        <FormExchange />
                        {car.id ? (
                            <CardAuto {...car} extraClassName={styles.modal_exchange__card_car} inModalCredit={true} />
                        ) : null}
                    </section>
                </div>
            </div>
        </div>
    );
};
