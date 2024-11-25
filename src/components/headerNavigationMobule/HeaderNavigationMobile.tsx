import React from 'react';
import styles from './HeaderNavigationMobile.module.scss';
import { Link } from 'react-router-dom';
import { Heart, Phone } from '../svg/Svg';
import { closeModal, openModal } from '../../redux/slice/modalSlice';
import { favoritesSelector, modalSelector } from '../../redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';

export const HeaderNavigationMobile = (): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const menuState: boolean = useSelector(modalSelector).burgerMenu.modalState;
    const favoritesCount: number = useSelector(favoritesSelector).favoritesCount;

    const burgerHandle = () => {
        if (menuState) {
            dispatch(closeModal('burgerMenu'));
        } else {
            dispatch(openModal('burgerMenu'));
        }
    };

    return (
        <article className={styles.header_navigation_mobile}>
            <div className={styles.header_navigation_mobile__heart}>
                <Link className={styles.header_navigation_mobile__heart_link} to={'/favorites'}>
                    <Heart customClass={styles.heart} />
                    <div className={styles.header_navigation_mobile__count}>
                        <span>{favoritesCount}</span>
                    </div>
                </Link>
            </div>
            <div className={styles.header_navigation_mobile__phone}>
                <Phone />
            </div>
            <button
                className={`${styles.hamburger} ${menuState ? styles.hamburger_active : ''}`}
                type="button"
                onClick={burgerHandle}
            >
                <span className={styles.hamburger__element}></span>
                <span className={styles.hamburger__element}></span>
                <span className={styles.hamburger__element}></span>
            </button>
        </article>
    );
};
