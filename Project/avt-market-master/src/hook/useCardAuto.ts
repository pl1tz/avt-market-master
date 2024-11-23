import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal, closeModal, setSelectCar } from '../redux/slice/modalSlice';
import { modalSelector } from '../redux/selectors';
import type { AutoCard } from '../interfaces/cars.interface';

interface UseCardAutoProps {
    car: AutoCard;
    inModalSelect?: boolean;
}

interface UseCardAutoReturn {
    currentImageIndex: number;
    isSelected: boolean;
    handlers: {
        handleMouseMove: (index: number) => void;
        handleCardClick: () => void;
        handleImageClick: () => void;
        handleCreditButtonClick: () => void;
    };
}

export const useCardAuto = ({ car, inModalSelect }: UseCardAutoProps): UseCardAutoReturn => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const selectedCarId = Number(useSelector(modalSelector).selectCar.filter.car.carSelect.id);
    const isSelected = selectedCarId === car.id;

    const handlers = React.useMemo(
        () => ({
            handleMouseMove: (index: number) => {
                setCurrentImageIndex(index);
            },

            handleCardClick: () => {
                if (!inModalSelect) return;

                dispatch(setSelectCar(car));
                dispatch(closeModal('selectCar'));
            },

            handleImageClick: () => {
                if (!inModalSelect) {
                    navigate(`/car/${car.brand.name}/${car.id}`, {
                        state: { car },
                    });
                }
            },

            handleCreditButtonClick: () => {
                dispatch(setSelectCar(car));
                dispatch(openModal('credit'));
            },
        }),
        [dispatch, navigate, car, inModalSelect],
    );

    return {
        currentImageIndex,
        isSelected,
        handlers,
    };
};
