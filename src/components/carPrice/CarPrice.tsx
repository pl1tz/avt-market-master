import React from 'react';
import styles from './CarPrice.module.scss';
import { formatPrice } from '../../helpers/formatPrice';
import { getPayment } from '../../helpers/car/getPayment';

export const CarPrice = ({ price }: { price: number }): React.JSX.Element => {
    return (
        <>
            <span className={styles.car_price__full}>{formatPrice(price)} &#8381;</span> <br />
            <span className={styles.car_price__month}>
                {formatPrice(getPayment(price, 0, 96, 0))}&#8381;/мес. без взноса
            </span>
        </>
    );
};
