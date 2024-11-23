import React from 'react';
import styles from './CarsFilter.module.scss';
import { Loader } from '../loader/Loader';
import { Pagination } from '../pagination/Pagination';
import { CardAuto } from '../cardAuto/CardAuto';
import { CardAutoHorizontal } from '../cardAutoHorizontal/CardAutoHorizontal';
import { useCarsFilter } from '../../hook/useCarsFilter';

export const CarsFilter = (): React.JSX.Element => {
    const {
        viewMode,
        isLoading,
        error,
        sortedCars,
        pagination,
        handlers: { handleScrollTop },
    } = useCarsFilter();

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div className={styles.error}>Ошибка загрузки данных</div>;
    }

    return (
        <>
            <div className={`${styles.filter_cars} ${styles[viewMode]}`}>
                {sortedCars.map((car) =>
                    viewMode === 'horizontal' ? (
                        <CardAutoHorizontal key={car.id} {...car} />
                    ) : (
                        <CardAuto key={car.id} {...car} />
                    ),
                )}
            </div>

            {pagination.totalPages > 1 && (
                <div onClick={handleScrollTop}>
                    <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
                </div>
            )}
        </>
    );
};
