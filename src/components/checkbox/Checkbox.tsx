import React from 'react';
import styles from './Checkbox.module.scss';
import { CheckMarker } from '../checkMarker/CheckMarker';
import type { CheckboxProps } from '../../interfaces/form.interface';

export const Checkbox = (props: CheckboxProps): React.JSX.Element => {
    const { id, textContent, register, isError } = props;

    return (
        <label className={styles.checkbox_label} htmlFor={id}>
            <input {...register} className={styles.checkbox_label__checkbox} type="checkbox" id={id} />
            <div
                className={`${styles.checkbox_label__checkbox_custom} ${isError && isError !== 'no error' ? 'field_error' : ''}`}
            >
                <CheckMarker />
            </div>
            <p className={styles.checkbox_label__text}>{textContent}</p>
        </label>
    );
};
