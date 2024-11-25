import React from 'react';
import styles from './Banks.module.scss';
import { BanksList } from '../../components/banksList/BanksList';

export const Banks = (): React.JSX.Element => {
    return (
        <div className="container">
            <div className={styles.banks}>
                <h1 className={styles.banks__title}>Банки-партнеры</h1>
                <BanksList />
            </div>
        </div>
    );
};
