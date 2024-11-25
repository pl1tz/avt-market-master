import React, { useEffect } from 'react';
import styles from './ModalSelectList.module.scss';
import { inStockListSelector } from '../../redux/selectors';
import { setFilterBrand } from '../../redux/slice/modalSlice';
import { inStockListLoader } from '../../redux/slice/inStockSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { SelectCarSection } from '../../interfaces/slice.interface';
import type { CarsCount, CarsCountModel } from '../../interfaces/cars.interface';
import type { AppDispatch } from '../../redux/store';

export const ModalSelectCarBrandList = (): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const { inStockList: filterList } = useSelector(inStockListSelector);
    const loading = useSelector(inStockListSelector).stateLoad.isLoad;

    useEffect(() => {
        if (!filterList.length) {
            dispatch(inStockListLoader());
        }
    }, [dispatch, filterList.length]);

    const setBrandFilter = (configValue: SelectCarSection<CarsCount[], CarsCountModel[]>) => {
        dispatch(setFilterBrand(configValue));
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <ul className={styles.modal_select__list}>
            {filterList.map((item) => {
                const filter = item as CarsCount;

                return (
                    <li
                        className={styles.modal_select__item}
                        key={item.brand}
                        onClick={() =>
                            setBrandFilter({
                                nextValue: item.models,
                                status: true,
                                selected: item.brand,
                                thisValue: filterList,
                            })
                        }
                    >
                        {filter.brand} <span>{filter.total}</span>
                    </li>
                );
            })}
        </ul>
    );
};
