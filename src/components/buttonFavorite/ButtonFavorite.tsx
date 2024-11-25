import React from 'react';
import styles from './ButtonFavorite.module.scss';
import { Heart } from '../svg/Svg';
import { useFavorite } from '../../hook/useFavorite';
import type { AutoCard } from '../../interfaces/cars.interface';

export const ButtonFavorite = ({ car }: { car: AutoCard }): React.JSX.Element => {
    const { isFavorite, removeFavorites, addFavorites } = useFavorite(car);

    const handler = (): void => {
        if (isFavorite) {
            removeFavorites();
        } else {
            addFavorites();
        }
    };

    return (
        <button className={styles.button_favorite} type="button" onClick={handler}>
            <Heart customClass={`${isFavorite ? styles.heart_active : ''}`} />
        </button>
    );
};
