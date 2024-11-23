import React from 'react';
import styles from './FormField.module.scss';
import type { FormFieldProps } from '../../interfaces/form.interface';

export const FormField = (props: FormFieldProps): React.JSX.Element => {
    const { id, placeholder, register, isError } = props;

    return (
        <label className={styles.form_field} htmlFor={id}>
            <input
                autoComplete="off"
                {...register}
                className={`${styles.form_field__input} ${isError ? 'field_error' : ''}`}
                id={id}
                type="text"
                placeholder={placeholder}
            />
        </label>
    );
};
