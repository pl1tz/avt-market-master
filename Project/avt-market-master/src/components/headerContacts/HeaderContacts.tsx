import React from 'react';
import styles from './HeaderContacts.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { mediaQuerySelector } from '../../redux/selectors';
import { openModal } from '../../redux/slice/modalSlice';
import { contactsSelector } from '../../redux/selectors';
import { transformPhoneNumber } from '../../helpers/transformPhoneNumber';

export const HeaderContacts = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const isMedium: boolean = useSelector(mediaQuerySelector).isMedium;
    const contacts = useSelector(contactsSelector).contacts;
    const isLoad: boolean = useSelector(contactsSelector).stateLoad.isLoading;
    const phoneHandler = (): void => {
        if (isMedium) return;
        dispatch(openModal('callback'));
    };

    return (
        <ul className={styles.header_contacts}>
            <li className={styles.header_contacts__item}>с 09:00 до 21:00 ежедневно</li>
            <li className={styles.header_contacts__item}>{contacts.auto_address}</li>
            <li
                className={`${styles.header_contacts__item} ${styles.header_contacts__item_phone}`}
                onClick={phoneHandler}
            >
                {isLoad ? (
                    '...'
                ) : !isMedium ? (
                    transformPhoneNumber(contacts.phone)
                ) : (
                    <a href={`tel: +${contacts.phone}`}>+7 (499) 288-76-10</a>
                )}
            </li>
        </ul>
    );
};
