import React from 'react';
import styles from './HeaderNavigation.module.scss';
import { HeaderNavigationMobile } from '../headerNavigationMobule/HeaderNavigationMobile';
import { NavLink } from 'react-router-dom';
import { modalSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import type { MenuElement } from '../../interfaces/header.interface';

export const HeaderNavigation = (): React.JSX.Element => {
    const menu: MenuElement[] = useSelector(modalSelector).burgerMenu.menuNavigation;

    return (
        <nav className={styles.header_nav}>
            <ul className={styles.header_nav__list}>
                {menu.map(({ name, link }) => {
                    return (
                        <li className={styles.header_nav__item} key={name}>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? `${styles.header_nav__link} ${styles.header_nav__link_active}`
                                        : styles.header_nav__link
                                }
                                to={link}
                            >
                                {name}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
            <HeaderNavigationMobile />
        </nav>
    );
};
