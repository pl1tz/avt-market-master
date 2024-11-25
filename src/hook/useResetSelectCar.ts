import React from 'react';
import { useDispatch } from 'react-redux';
import { resetSelectCar } from '../redux/slice/modalSlice';
import { useLocation } from 'react-router-dom';

export const useResetSelectCar = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    React.useEffect(() => {
        dispatch(resetSelectCar());
    }, [pathname]);
};
