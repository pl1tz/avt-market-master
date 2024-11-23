import React from 'react';
import styles from './SortFilter.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { SORT_OPTIONS, SortOptionKey, setSortOption, selectSortOption } from '../../redux/slice/sortCarsSlice';
import type { AppDispatch } from '../../redux/store';
import { useSearchParams } from 'react-router-dom';

interface SortFilterProps {
    isOpen: boolean;
    onToggle: () => void;
}

export const SortFilter = ({ isOpen, onToggle }: SortFilterProps): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedOption = useSelector(selectSortOption);
    const sortFilterRef = React.useRef<HTMLDivElement>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const initialRenderRef = React.useRef(true);

    React.useEffect(() => {
        if (initialRenderRef.current) {
            const sortOption = Object.entries(SORT_OPTIONS).find(
                ([, value]) => searchParams.get(value.param) === 'true',
            )?.[0] as SortOptionKey | undefined;

            if (sortOption) {
                dispatch(setSortOption(sortOption));
            } else {
                dispatch(setSortOption('price_asc'));
                const newParams = new URLSearchParams();
                newParams.set(SORT_OPTIONS.price_asc.param, 'true');
                setSearchParams(newParams);
            }
            initialRenderRef.current = false;
        }
    }, [searchParams, dispatch, setSearchParams]);

    const handleOptionClick = (key: SortOptionKey): void => {
        dispatch(setSortOption(key));

        const newParams = new URLSearchParams();
        newParams.set(SORT_OPTIONS[key].param, 'true');
        setSearchParams(newParams);

        onToggle();
    };

    return (
        <div className={`${styles.sort_filter}`} ref={sortFilterRef}>
            <div className={styles.sort_filter__header} onClick={onToggle}>
                <span>{SORT_OPTIONS[selectedOption || 'price_desc'].label}</span>
            </div>

            {isOpen && (
                <ul className={styles.sort_filter__list}>
                    {Object.entries(SORT_OPTIONS).map(([key, value]) => (
                        <li
                            key={key}
                            className={`${styles.sort_filter__item} ${key === selectedOption ? styles.active : ''}`}
                            onClick={() => handleOptionClick(key as SortOptionKey)}
                        >
                            {value.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
