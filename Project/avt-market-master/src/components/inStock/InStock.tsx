import React from 'react';
import styles from './InStock.module.scss';
import { InStockList } from '../inStockList/InStockList';

export const InStock = (): React.JSX.Element => {
    return (
        <section className={styles.in_stock}>
            <div className="container">
                <div className={styles.in_stock__inner}>
                    <h2 className={styles.in_stock__title}>Автомобили в наличии</h2>
                    <InStockList />
                </div>
            </div>
        </section>
    );
};
