import React from 'react';
import styles from './BurgerMenu.module.scss';
import { Link } from 'react-router-dom';
import { modalSelector } from '../../redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slice/modalSlice';
import type { MenuElement } from '../../interfaces/header.interface';
import type { AppDispatch } from '../../redux/store';

export const BurgerMenu = (): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const handleFollowLink = (): void => {
        dispatch(closeModal('burgerMenu'));
    };
    const menu: MenuElement[] = useSelector(modalSelector).burgerMenu.menuNavigation;
    const menuState: boolean = useSelector(modalSelector).burgerMenu.modalState;

    return (
        <nav className={`${styles.burger_menu} ${menuState ? styles.burger_menu_active : ''}`}>
            <ul className={styles.burger_menu__list}>
                {menu.map(({ name, link }) => {
                    return (
                        <li className={styles.burger_menu__item} key={name} onClick={handleFollowLink}>
                            <Link className={styles.burger_menu__link} to={link}>
                                {name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
