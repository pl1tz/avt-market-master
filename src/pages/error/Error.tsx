import React from 'react';
import styles from './Error.module.scss';
import { Link, useLocation } from 'react-router-dom';
import type { ErrorProps } from '../../interfaces/interface';

export const Error: React.FC<ErrorProps> = ({ error, resetErrorBoundary }) => {
    const location = useLocation();
    const errorMessage = error?.message || (location.state as { message?: string })?.message || 'Произошла ошибка';

    return (
        <div className="container">
            <div className={styles.error}>
                <h1 className={styles.error__title}>{errorMessage}</h1>
                <Link className={styles.error__link} to={'/'} onClick={resetErrorBoundary}>
                    На главную &rarr;
                </Link>
            </div>
        </div>
    );
};
