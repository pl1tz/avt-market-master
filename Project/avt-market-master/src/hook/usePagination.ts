import React from 'react';
import { useSearchParams } from 'react-router-dom';

interface UsePaginationProps {
    currentPage: number;
    totalPages: number;
}

interface UsePaginationReturn {
    pageNumbers: (number | string)[];
    handlers: {
        handlePageChange: (page: number) => void;
        handlePrevPage: () => void;
        handleNextPage: () => void;
    };
    state: {
        isFirstPage: boolean;
        isLastPage: boolean;
    };
}

export const usePagination = ({ currentPage, totalPages }: UsePaginationProps): UsePaginationReturn => {
    const [, setSearchParams] = useSearchParams();

    // Мемоизируем состояние страниц
    const state = React.useMemo(
        () => ({
            isFirstPage: currentPage === 1,
            isLastPage: currentPage === totalPages,
        }),
        [currentPage, totalPages],
    );

    // Мемоизируем обработчики
    const handlers = React.useMemo(
        () => ({
            handlePageChange: (page: number) => {
                setSearchParams((prev) => {
                    const newParams = new URLSearchParams(prev);
                    newParams.set('page', page.toString());
                    return newParams;
                });
            },

            handlePrevPage: () => {
                if (!state.isFirstPage) {
                    handlers.handlePageChange(currentPage - 1);
                }
            },

            handleNextPage: () => {
                if (!state.isLastPage) {
                    handlers.handlePageChange(currentPage + 1);
                }
            },
        }),
        [setSearchParams, currentPage, state.isFirstPage, state.isLastPage],
    );

    // Мемоизируем массив номеров страниц
    const pageNumbers = React.useMemo(() => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage <= 4) {
                for (let i = 2; i <= 5; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    }, [currentPage, totalPages]);

    return {
        pageNumbers,
        handlers,
        state,
    };
};
