import React from 'react';
import styles from './InStockSign.module.scss';

export const InStockSign = ({
    extraClassName,
    state,
}: {
    state: boolean;
    extraClassName?: string;
}): React.JSX.Element => {
    return (
        <div className={`${styles.in_stock_sign} ${extraClassName || ''}`}>{state ? 'В наличии' : 'Нет в наличии'}</div>
    );
};
