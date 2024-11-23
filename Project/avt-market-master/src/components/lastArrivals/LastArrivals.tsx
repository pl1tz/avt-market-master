import React from 'react';
import styles from './LastArrivals.module.scss';
import { LastArrivalsSlider } from '../lastArrivalsSlider/LastArrivalsSlider';
import { Link } from 'react-router-dom';

export const LastArrivals = (): React.JSX.Element => {
    return (
        <section className={styles.latest_arrivals}>
            <div className="container">
                <div className={styles.latest_arrivals__inner}>
                    <div>
                        <h2 className={styles.latest_arrivals__title}>Последние поступления</h2>
                        <LastArrivalsSlider />
                    </div>
                    <Link className={styles.latest_arrivals__link} to={'/cars'}>
                        Все автомобили &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
};
