import React from 'react';
import styles from './FooterLegalInformation.module.scss';
import { useSelector } from 'react-redux';
import { contactsSelector } from '../../redux/selectors';

export const FooterLegalInfo = (): React.JSX.Element => {
    const contacts = useSelector(contactsSelector).contacts;

    return (
        <article className={styles.footer_legal_info}>
            <ul className={styles.footer_legal_info__list}>
                <li className={styles.footer_legal_info__item}>
                    <h3>Юридическое лицо:</h3>
                    <p>ООО "МАГНАТ АВТО"</p>
                </li>
                <li className={styles.footer_legal_info__item}>
                    <h3>ИНН / КПП / ОГРН:</h3>
                    <p>9726053873 / 772601001 / 1237700629583</p>
                </li>
                <li className={styles.footer_legal_info__item}>
                    <h3>Юридический адрес:</h3>
                    <p>{contacts.auto_address}</p>
                </li>
                <li className={styles.footer_legal_info__item}>
                    <h3>Физический адрес:</h3>
                    <p>{contacts.auto_address}</p>
                </li>
            </ul>
        </article>
    );
};
