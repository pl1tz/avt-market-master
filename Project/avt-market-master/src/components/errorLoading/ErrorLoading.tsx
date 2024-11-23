import React from 'react';
import styles from './ErrorLoading.module.scss';

export const ErrorLoading = (): React.JSX.Element => {
    return <h3 className={styles.error_message}>Ошибка загрузки данных</h3>;
};
