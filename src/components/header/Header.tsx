import React from 'react';
import styles from './Header.module.scss';
import { HeaderContacts } from '../headerContacts/HeaderContacts';
import { HeaderNavigation } from '../headerNavigation/HeaderNavigation';
import { Logo } from '../svg/Svg';
import { modalSelector } from '../../redux/selectors';
import { useHeaderFixed } from '../../hook/useHeaderFixed';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Header = (): React.JSX.Element => {
    const location = useLocation();
    const burgerMenuState: boolean = useSelector(modalSelector).burgerMenu.modalState;
    const windowScrollPosition: number = useHeaderFixed();

    const headerIsActive = (): boolean => {
        if (windowScrollPosition === 0 && location.pathname === '/') return false;
        if (location.pathname !== '/') return true;

        return windowScrollPosition !== 0 || burgerMenuState;
    };

    const logoIsActive = (): boolean => {
        if (burgerMenuState) {
            return true;
        }

        return false;
    };

    return (
        <header className={`${styles.header} ${headerIsActive() ? styles.header_active : ''}`} id="header">
            <div className={`${styles.header__inner} container`}>
                <div className={styles.logo}>
                    <Logo className={`${logoIsActive() ? styles.logo_active : ''} ${styles.logo__img}`} />
                </div>
                <div className={styles.header__info}>
                    <HeaderContacts />
                    <HeaderNavigation />
                </div>
            </div>
        </header>
    );
};
