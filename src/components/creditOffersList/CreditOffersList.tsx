import React from 'react';
import styles from './CreditOffersList.module.scss';
import { CreditOffer } from '../creditOffer/CreditOffer';
import { useSelector } from 'react-redux';
import { banksListSelector } from '../../redux/selectors';
import type { Bank } from '../../interfaces/banks.interface';
import { Loader } from '../loader/Loader';

export const CreditOffersList = (props: { payment: string }): React.JSX.Element => {
    const { payment } = props;
    const error: boolean = useSelector(banksListSelector).stateLoad.error;
    const isLoad: boolean = useSelector(banksListSelector).stateLoad.isLoad;
    const bestOffers: Bank[] = useSelector(banksListSelector).bestOffersBanks;

    if (isLoad) {
        return <Loader />;
    }

    if (error) {
        return <>Ошибка загрузки данных</>;
    }

    return (
        <section className={styles.credit_offers}>
            <h2 className={styles.credit_offers__title}>Лучшие кредитные предложения</h2>

            <div className={styles.credit_offers__list}>
                {bestOffers.map((bank) => {
                    return <CreditOffer key={bank.id} bank={bank} payment={payment} />;
                })}
            </div>
        </section>
    );
};
