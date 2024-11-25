import React from 'react';
import styles from './CarSelectionFilter.module.scss';
import { Vector } from '../svg/Svg';
import { useCarSelectionFilter } from '../../hook/useCarSelectionFilter';
import type { CarSelectionFilterProps } from '../../interfaces/cars.interface';

export const CarSelectionFilter = (props: CarSelectionFilterProps): React.JSX.Element => {
    const { className, dropValue, hasVector = true, title, isOpen, onToggle, filterKey } = props;

    const { filterRef, getCurrentValue, handleClick, handleSelectItem } = useCarSelectionFilter({
        filterKey,
        title,
        isOpen,
        onToggle,
    });

    return (
        <div className={`${styles.select_filter} ${className || ''}`} ref={filterRef}>
            <div className={styles.select_filter__header} onClick={handleClick}>
                <span>{getCurrentValue()}</span>
                {hasVector && (
                    <Vector className={`${styles.vector} ${isOpen ? styles.vector_open : ''}`} isOpen={isOpen} />
                )}
            </div>

            {isOpen && (
                <ul className={styles.select_filter__list}>
                    {dropValue.map((selectItem, index) => (
                        <li
                            key={index}
                            className={styles.select_filter__item}
                            onClick={() => handleSelectItem(selectItem)}
                        >
                            {selectItem}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
