import React from 'react';
import styles from './FieldSlider.module.scss';
import { useSelector } from 'react-redux';
import { modalSelector } from '../../redux/selectors';
import { formatPrice } from '../../helpers/formatPrice';
import type { FieldSliderProps } from '../../interfaces/form.interface';
import type { FieldValues } from 'react-hook-form';
import type { Path, PathValue } from 'react-hook-form';

export const FieldSlider = <T extends FieldValues>(props: FieldSliderProps<T>): React.JSX.Element => {
    const { titleText, unitOfMeasurement, initValue, steps, endpoints, ticksLeft, setValue, fieldName } = props;
    const { ticksContentWidth, register, unitTicks } = props;
    const [inputValue, setInputValue] = React.useState(steps.indexOf(initValue));
    const carPrice: number = useSelector(modalSelector).selectCar.filter.car.carSelect.price;
    const max: number = steps.length - 1;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const index = Number(e.target.value);
        setInputValue(index);
        setValue(fieldName, index as PathValue<T, Path<T>>);
    };

    return (
        <label className={styles.field_slider}>
            <h3 className={styles.field_slider__title}>
                <span>{titleText}</span>
                <span>
                    {fieldName === 'initial_contribution'
                        ? carPrice
                            ? `${formatPrice((steps[inputValue] / 100) * carPrice)}${unitOfMeasurement}`
                            : `0${unitOfMeasurement}`
                        : `${steps[inputValue] || 0}${unitOfMeasurement}`}
                </span>
            </h3>

            <div className={styles.field_slider__box}>
                <input
                    {...register}
                    className={styles.field_slider__input}
                    max={max}
                    min="0"
                    step="1"
                    type="range"
                    value={inputValue}
                    onChange={handleChange}
                />
                <div
                    className={styles.field_slider__input_background}
                    style={{ width: `${(inputValue / max) * 100}%` }}
                ></div>
            </div>

            <div className={styles.field_slider__ticks} style={{ width: ticksContentWidth, left: ticksLeft }}>
                {endpoints.map((endpoint) => {
                    return (
                        <span key={endpoint}>
                            {endpoint}
                            {unitTicks}
                        </span>
                    );
                })}
            </div>
        </label>
    );
};
