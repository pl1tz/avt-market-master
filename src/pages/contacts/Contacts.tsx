import React from 'react';
import styles from './Contacts.module.scss';
import { useSelector } from 'react-redux';
import { contactsSelector } from '../../redux/selectors';
import { transformPhoneNumber } from '../../helpers/transformPhoneNumber';
import { YMaps as MapProvider, Map, Placemark } from '@pbe/react-yandex-maps';

export const Contacts = (): React.JSX.Element => {
    const contacts = useSelector(contactsSelector).contacts;
    const SHOP_LOCATION = {
        center: [55.613102, 37.755221],
        zoom: 16,
    };

    return (
        <div className="container">
            <div className={`${styles.contacts} page`}>
                <h1 className={`${styles.contacts__title} page__title`}>Контакты</h1>
                <div className={styles.contacts__content}>
                    <ul className={styles.contacts__list}>
                        <li className={styles.contacts__item}>
                            <h3 className={styles.contacts__item_title}>Телефон автоцентра:</h3>
                            <a className={styles.contacts__item_text} href={`tel:+${contacts.phone}`}>
                                {transformPhoneNumber(contacts.phone)}
                            </a>
                        </li>
                        <li className={styles.contacts__item_title}>
                            <h3 className={styles.contacts__item}>Режим работы:</h3>
                            <p className={styles.contacts__item_text}>{contacts.mode_operation}</p>
                        </li>
                        <li className={styles.contacts__item_title}>
                            <h3 className={styles.contacts__item}>Адрес автоцентра:</h3>
                            <p className={styles.contacts__item_text}>{contacts.auto_address}</p>
                        </li>
                    </ul>

                    <MapProvider>
                        <Map style={{ height: '360px', width: '100%' }} defaultState={SHOP_LOCATION}>
                            <Placemark
                                defaultGeometry={SHOP_LOCATION.center}
                                properties={{
                                    hintContent: 'Декор Маркет',
                                    balloonContent: 'г.Могилёв, Быховская улица, 6Э, 150 ролет',
                                }}
                            />
                        </Map>
                    </MapProvider>
                </div>
            </div>
        </div>
    );
};
