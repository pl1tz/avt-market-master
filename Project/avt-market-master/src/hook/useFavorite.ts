import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites, addToFavorites } from '../redux/slice/favoritesSlice';
import { favoritesSelector } from '../redux/selectors';
import type { UseFavorite } from '../interfaces/hook.interface';
import type { AutoCard } from '../interfaces/cars.interface';

export const useFavorite = (auto: AutoCard): UseFavorite => {
    const dispatch = useDispatch();
    const carFavoriteList: AutoCard[] = useSelector(favoritesSelector).favoritesList;
    const [isFavorite, setIsFavorite] = React.useState(Boolean(carFavoriteList.find((car) => car.id === auto.id)));

    React.useEffect(() => {
        setIsFavorite(Boolean(carFavoriteList.find((car) => car.id === auto.id)));
    }, [carFavoriteList.length]);

    const removeFavorites = (): void => {
        dispatch(removeFromFavorites(auto.id));
    };

    const addFavorites = (): void => {
        console.log('useAddtoFavrotie');
        dispatch(addToFavorites(auto));
    };

    return { isFavorite, removeFavorites, addFavorites };
};
