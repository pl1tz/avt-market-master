import React from 'react';
import styles from './Pagination.module.scss';
import { usePagination } from '../../hook/usePagination';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps): React.JSX.Element => {
    const {
        pageNumbers,
        handlers: { handlePageChange, handlePrevPage, handleNextPage },
        state: { isFirstPage, isLastPage },
    } = usePagination({ currentPage, totalPages });

    return (
        <div className={styles.pagination}>
            <button className={`${styles.page} ${styles.nav}`} onClick={handlePrevPage} disabled={isFirstPage}>
                ←
            </button>

            {pageNumbers.map((page, index) => (
                <button
                    key={index}
                    className={`${styles.page} ${
                        page === currentPage ? styles.active : ''
                    } ${page === '...' ? styles.dots : ''}`}
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    disabled={page === '...'}
                >
                    {page}
                </button>
            ))}

            <button className={`${styles.page} ${styles.nav}`} onClick={handleNextPage} disabled={isLastPage}>
                →
            </button>
        </div>
    );
};
