import React from 'react';
import styles from './CarSelection.module.scss';
import { SortFilter } from '../sortFilter/SortFIlter';
import { HorizontLayoutVector, VerticalLayoutVector } from '../svg/Svg';
import { CarSelectionFilter } from '../carSelectionFilter/CarSelectionFilter';
import { useCarSelection } from '../../hook/useCarSelection';
import { mediaQuerySelector } from '../../redux/selectors';
import { DEFAULT_FILTER_VALUES } from '../../redux/slice/filterSlice';
import type { FilterKeys } from '../../interfaces/filter.interface';
import { useSelector } from 'react-redux';

const INITIAL_FILTER_VALUES: Record<FilterKeys, string> = DEFAULT_FILTER_VALUES;

export const CarSelection = (): React.JSX.Element => {
    const isSmall = useSelector(mediaQuerySelector).isSmall;
    const {
        carCount,
        filterList,
        openFilter,
        isSortOpen,
        handlers: { handleToggleFilter, handleToggleSort, handleFindCars, handleResetFilters, handleViewModeChange },
    } = useCarSelection();

    return (
        <div className={styles.select}>
            <h2 className={styles.select__title}>Подбор автомобиля</h2>
            <form className={styles.filter}>
                {filterList.map((filter) => (
                    <CarSelectionFilter
                        key={filter.key}
                        dropValue={filter.values}
                        hasVector={true}
                        title={INITIAL_FILTER_VALUES[filter.key as FilterKeys]}
                        filterKey={filter.key}
                        isOpen={openFilter === filter.key}
                        onToggle={handleToggleFilter}
                    />
                ))}

                <button className={styles.find_btn} type="button" onClick={handleFindCars}>
                    {carCount ? `Показать (${carCount})` : 'Не найдено'}
                </button>
                <button className={styles.reset_btn} type="button" onClick={handleResetFilters}>
                    Сбросить фильтр
                </button>
            </form>
            <div className={styles.catalog_filter}>
                <SortFilter isOpen={isSortOpen} onToggle={handleToggleSort} />
                {!isSmall ? (
                    <div>
                        <VerticalLayoutVector handler={() => handleViewModeChange('vertical')} />
                        <HorizontLayoutVector handler={() => handleViewModeChange('horizontal')} />
                    </div>
                ) : null}
            </div>
        </div>
    );
};
