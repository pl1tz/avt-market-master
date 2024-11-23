import React from 'react';
import styles from './CheckboxAgree.module.scss';
import { Link } from 'react-router-dom';
import { CheckMarker } from '../checkMarker/CheckMarker';
import type { CheckboxProps } from '../../interfaces/form.interface';

export const CheckboxAgree = (props: Omit<CheckboxProps, 'textContent'>): React.JSX.Element => {
    const { id, register, isError } = props;

    return (
        <label className={styles.checkbox_label} htmlFor={id}>
            <input className={styles.checkbox_label__checkbox} {...register} type="checkbox" id={id} />
            <div className={`${styles.checkbox_label__checkbox_custom} ${isError ? 'field_error' : ''}`}>
                <CheckMarker />
            </div>
            <p className={styles.checkbox_label__text}>
                Согласен на{' '}
                <Link className={styles.checkbox_label__link} to={'/'}>
                    обработку персональных данных
                </Link>
            </p>
        </label>
    );
};
