import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactsSelector } from '../../redux/selectors';
import { openModal } from '../../redux/slice/modalSlice';
import { transformPhoneNumber } from '../../helpers/transformPhoneNumber';
import styles from './ButtonBoxCallCar.module.scss';

export const ButtonBoxCallCar = ({ extraStyles }: { extraStyles?: Record<string, string> }): React.JSX.Element => {
    const dispatch = useDispatch();
    const contacts = useSelector(contactsSelector).contacts;
    const openModalCallback = () => dispatch(openModal('callback'));

    return (
        <div className={styles.call_box} style={extraStyles}>
            <a className={styles.call_box__link} href={`tel: +${contacts.phone}`}>
                {transformPhoneNumber(contacts.phone)}
            </a>
            <button className={styles.call_box__button} type="button" onClick={openModalCallback}>
                Перезвонить
            </button>
        </div>
    );
};
