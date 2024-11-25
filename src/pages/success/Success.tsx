import React from 'react';
import benefits from './benefits.json';
import styles from './Success.module.scss';
import { Benefits } from '../../components/benefits/Benefits';
import { useLocation } from 'react-router-dom';
import { SuccessInformation } from '../../interfaces/form.interface';

export const Success = (): React.JSX.Element => {
    const { state } = useLocation() as { state: SuccessInformation };

    return (
        <div className="container">
            <div className={`${styles.success} page`}>
                <div>
                    <h1 className="page__title">Спасибо за заявку!</h1>
                    <h2 className={styles.success__subtitle}>{state.from}</h2>
                </div>

                <div className={styles.success__description}>
                    <p>{state.user_name}, благодарим за обращение. Ваша заявка принята!</p>
                    <p>Менеджер свяжется с вами в ближайшее время. Спасибо, что выбрали нас!</p>
                </div>

                <Benefits benefits={benefits} />
            </div>
        </div>
    );
};
