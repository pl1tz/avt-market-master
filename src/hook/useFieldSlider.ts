import React from 'react';
import { useSelector } from 'react-redux';
import { modalSelector } from '../redux/selectors';
import { formatPrice } from '../helpers/formatPrice';
import type { FieldValues, Path, PathValue } from 'react-hook-form';

interface UseFieldSliderProps<T extends FieldValues> {
    initValue: number;
    steps: number[];
    fieldName: Path<T>;
    setValue: (name: Path<T>, value: PathValue<T, Path<T>>) => void;
    unitOfMeasurement: string;
}

interface UseFieldSliderReturn {
    inputValue: number;
    formattedValue: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    max: number;
}

export const useFieldSlider = <T extends FieldValues>({
    initValue,
    steps,
    fieldName,
    setValue,
    unitOfMeasurement,
}: UseFieldSliderProps<T>): UseFieldSliderReturn => {
    const { modalState } = useSelector(modalSelector).credit;
    const carPrice = useSelector(modalSelector).selectCar.filter.car.carSelect.price;

    // Используем useRef для отслеживания предыдущего состояния модального окна
    const prevModalState = React.useRef(modalState);

    const [inputValue, setInputValue] = React.useState(() => steps.indexOf(initValue));
    const max = steps.length - 1;

    // Сброс значения только при изменении состояния модального окна
    React.useEffect(() => {
        if (prevModalState.current !== modalState) {
            const initialIndex = steps.indexOf(initValue);
            setInputValue(initialIndex);
            setValue(fieldName, initialIndex as PathValue<T, Path<T>>);
            prevModalState.current = modalState;
        }
    }, [modalState, initValue, steps, fieldName, setValue]);

    const handleChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const index = Number(e.target.value);
            setInputValue(index);
            setValue(fieldName, index as PathValue<T, Path<T>>);
        },
        [fieldName, setValue],
    );

    const formattedValue = React.useMemo(() => {
        if (fieldName === 'initial_contribution' && carPrice) {
            return `${formatPrice((steps[inputValue] / 100) * carPrice)}${unitOfMeasurement}`;
        }
        return `${steps[inputValue] || 0}${unitOfMeasurement}`;
    }, [fieldName, steps, inputValue, carPrice, unitOfMeasurement]);

    return {
        inputValue,
        formattedValue,
        handleChange,
        max,
    };
};
