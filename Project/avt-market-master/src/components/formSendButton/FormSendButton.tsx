import React from 'react';
import styles from './FormSendButton.module.scss';
import type { FormSendButtonProps } from '../../interfaces/form.interface';

export const FormSendButton = (props: FormSendButtonProps): React.JSX.Element => {
    const { textContent } = props;
    return (
        <input
            className={styles.form_send_button}
            type="submit"
            value={textContent}
            onClick={() => {
                console.log('submit form click');
            }}
        />
    );
};
