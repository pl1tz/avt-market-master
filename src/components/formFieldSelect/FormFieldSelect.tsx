import React from 'react';
import styles from './FormFieldSelect.module.scss';
import { useSelector } from 'react-redux';
import { modalSelector } from '../../redux/selectors';
import type { FieldValues, Path, PathValue } from 'react-hook-form';
import type { FormFieldSelectProps } from '../../interfaces/form.interface';

export const FormFieldSelect = <T extends FieldValues>(props: FormFieldSelectProps<T>): React.JSX.Element => {
    const { placeholder, items, setFormValue, fieldName, isError, register } = props;
    const list = React.useRef<null | HTMLUListElement>(null);
    const container = React.useRef<null | HTMLDivElement>(null);
    const [selectValue, setSelectValue] = React.useState<string>(placeholder);
    const [state, setState] = React.useState<boolean>(false);
    const callbackState = useSelector(modalSelector).callback.modalState;

    const open = () => setState(true);

    const select = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, value: PathValue<T, Path<T>>) => {
        event.stopPropagation();
        setFormValue(fieldName, value);
        setSelectValue(value);
        setState(false);
    };

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (container.current && !container.current.contains(event.target as Node)) {
                setState(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    React.useEffect(() => {
        if (!callbackState) {
            setSelectValue(placeholder);
        }
    }, [callbackState]);

    return (
        <div className={styles.form_field_select} onClick={open} ref={container}>
            <input
                {...register}
                className={`${styles.form_field_select__input} ${isError && selectValue === placeholder ? 'field_error' : ''}`}
                autoComplete="off"
                type="text"
                value={selectValue === placeholder ? '' : selectValue}
                placeholder={placeholder}
                readOnly
            />

            {state ? (
                <ul className={styles.form_field_select__list} ref={list}>
                    {items.map((item) => {
                        return (
                            <li
                                className={styles.form_field_select__item}
                                key={item}
                                onClick={(event) => select(event, item as PathValue<T, Path<T>>)}
                            >
                                {item}
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        </div>
    );
};
