import React from 'react';
import styles from './FooterInformation.module.scss';
import { Link } from 'react-router-dom';

export const FooterInformation = (): React.JSX.Element => {
    return (
        <article className={styles.footer_information}>
            <ul className={styles.footer_information__list}>
                <li className={styles.footer_information__item}>&copy; YouAuto, 2024</li>
                <li className={styles.footer_information__item}>
                    <Link to={'/privacy'}>Пользовательское соглашение</Link>
                </li>
                <li className={styles.footer_information__item}>
                    <Link
                        to={
                            'https://acdn.tinkoffinsurance.ru/static/documents/417d017c-904c-4477-a106-e8bf32008054.pdf'
                        }
                        target="_blank"
                    >
                        Правовая информация
                    </Link>
                </li>
            </ul>
        </article>
    );
};
