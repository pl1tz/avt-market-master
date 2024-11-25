import React from 'react';
import styles from './ButtonCardOpenModal.module.scss';
import type { ButtonCardOpenModalProps } from '../../interfaces/interface';

export const ButtonCardOpenModal = (props: ButtonCardOpenModalProps): React.JSX.Element => {
    const { handler, className, extraClassName, textContent } = props;

    return (
        <button
            className={`${className || styles.button_card_open_modal} ${extraClassName}`}
            type="button"
            onClick={handler}
        >
            {textContent}
        </button>
    );
};
