import React from 'react';
import { loadAbout } from '../redux/slice/aboutSlice';
import { banksListLoader, setTargetBankId } from '../redux/slice/banksListSlice';
import { banksListSelector, inStockListSelector, lastArrivalsSelector, filtersSelector } from '../redux/selectors';
import { loadContacts } from '../redux/slice/contactsSlice';
import { inStockListLoader } from '../redux/slice/inStockSlice';
import { lastArrivalsLoader } from '../redux/slice/lastArrivalSlice';
import { loadFilters } from '../redux/slice/filterSlice';
import { resetFilters } from '../redux/slice/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import type { AppDispatch } from '../redux/store';

const pageWithBanksList = ['/credit', '/installment', '/exchange', '/banks', '/car'];
const pageWithInStockList = ['/', '/cars'];
const pageWithLastArrivals = ['/'];
const pageWithFilters = ['/cars', '/credit', '/installment', '/exchange'];

const includesPath = (arrayPath: string[], path: string): boolean => {
    const mainPath = '/' + path.split('/')[1];
    const result = arrayPath.includes(mainPath);
    return result;
};

export const useLoad = (): void => {
    const dispatch = useDispatch<AppDispatch>();
    const banksList = useSelector(banksListSelector).banksList;
    const inStockList = useSelector(inStockListSelector).inStockList;
    const lastArrivalsList = useSelector(lastArrivalsSelector).lastArrivalsList;
    const filtersList = useSelector(filtersSelector).state.filtersList;

    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();

    const prevPathRef = React.useRef(pathname);
    const prevSearchParamsRef = React.useRef(searchParams);

    const shouldResetFilters = () => {
        const prevPath = prevPathRef.current;
        const wasCarsPage = includesPath(pageWithFilters, prevPath);
        const isCarsPage = includesPath(pageWithFilters, pathname);

        if (wasCarsPage && !isCarsPage) {
            return true;
        }

        return false;
    };

    React.useEffect(() => {
        const mainPath = '/' + pathname.split('/')[1];

        if (!banksList.length && pageWithBanksList.includes(mainPath)) {
            dispatch(banksListLoader());
        }

        if (!inStockList.length && includesPath(pageWithInStockList, pathname)) {
            dispatch(inStockListLoader());
        }

        if (!lastArrivalsList.length && includesPath(pageWithLastArrivals, pathname)) {
            dispatch(lastArrivalsLoader());
        }

        if (includesPath(pageWithFilters, pathname)) {
            const params = {
                brand_name: searchParams.get('brand_name') || undefined,
                model_name: searchParams.get('model_name') || undefined,
                generation: searchParams.get('generation_name') || undefined,
            };

            if (!filtersList.length) {
                dispatch(loadFilters(params));
            }
        }

        return () => {
            if (shouldResetFilters()) {
                dispatch(resetFilters());
            }

            if (mainPath === '/credit') {
                dispatch(setTargetBankId(null));
            }

            prevPathRef.current = pathname;
            prevSearchParamsRef.current = searchParams;
        };
    }, [
        pathname,
        searchParams,
        dispatch,
        banksList.length,
        inStockList.length,
        lastArrivalsList.length,
        filtersList.length,
    ]);

    React.useEffect(() => {
        dispatch(loadContacts());
        dispatch(loadAbout());
    }, [dispatch]);
};
