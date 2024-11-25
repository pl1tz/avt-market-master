import React from 'react';
import benefits from './benefits.json';
import styles from './Exchange.module.scss';
import { BanksList } from '../../components/banksList/BanksList';
import { Benefits } from '../../components/benefits/Benefits';
import { FormExchange } from '../../components/formExchange/FormExchange';

export const Exchange = (): React.JSX.Element => {
    return (
        <>
            <div className="container">
                <div className="exchange page">
                    <h1 className="exchange__title page__title">Авто в Trade-In в Москве</h1>
                    <Benefits benefits={benefits} />

                    <div className={styles.exchange__content}>
                        <FormExchange />
                        <p className={styles.exchange__description}>
                            Автосалон «YouAuto» предлагает услугу Trade-In, которая пользуется популярностью на
                            автомобильном рынке. Trade-In предполагает обмен вашего текущего автомобиля на более новый.
                            Этот способ позволяет сэкономить время, которое обычно тратится на продажу старого
                            автомобиля, и обновить ваш транспорт за несколько часов. Вы можете изменить свой текущий
                            автомобиль с выгодой до 300 000 ₽, на автомобиль с пробегом из представленных на нашем
                            сайте.
                        </p>
                    </div>
                </div>
                <div className={styles.exchange__banks}>
                    <h2 className={styles.exchange__banks_title}>Банки-партнеры</h2>
                    <BanksList />
                </div>
            </div>
        </>
    );
};
