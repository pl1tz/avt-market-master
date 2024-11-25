import React from 'react';
import styles from './FooterContacts.module.scss';
import { Logo } from '../svg/Svg';
import { transformPhoneNumber } from '../../helpers/transformPhoneNumber';
import { contactsSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import type { ContactsType } from '../../interfaces/interface';

export const FooterContacts = (): React.JSX.Element => {
    const contacts: ContactsType = useSelector(contactsSelector).contacts;
    const isLoading = useSelector(contactsSelector).stateLoad.isLoading;
    const error = useSelector(contactsSelector).stateLoad.error;

    if (error) {
        return <div>Ошибка загрузки данных</div>;
    }
    return (
        <article className={styles.footer_contacts}>
            <ul className={styles.footer_contacts__list}>
                <li className={styles.footer_contacts__item}>
                    <Logo className={styles.footer_contacts__logo} />
                </li>
                <li className={styles.footer_contacts__item}>
                    <a href={`tel:+${contacts.phone}`}>{isLoading ? '...' : transformPhoneNumber(contacts.phone)}</a>
                </li>
                <li className={styles.footer_contacts__item}>{isLoading ? '...' : contacts.auto_address}</li>
                <li className={styles.footer_contacts__item}>{isLoading ? '...' : contacts.mode_operation}</li>
            </ul>
        </article>
    );
};
