import React from 'react';
import styles from './HeaderSliderElement.module.scss';
import { Link } from 'react-router-dom';
import type { HeaderSliderElementProps } from '../../interfaces/header.interface';

export const HeaderSliderElement = (props: HeaderSliderElementProps): React.JSX.Element => {
    const { imgPath, title, descriptionStroke, linkPath } = props;

    return (
        <div className={styles.slide}>
            <div className={styles.slide__insert}>
                <h2 className={styles.slide__title}>{title}</h2>
                <p className={styles.slide__description}>
                    {descriptionStroke.map((stroke, index, array) => {
                        return (
                            <React.Fragment key={index}>
                                {stroke} {index !== array.length - 1 ? <br /> : ''}
                            </React.Fragment>
                        );
                    })}
                </p>
                <Link className={styles.slide__link} to={linkPath} />
            </div>

            <picture className={styles.slide__picture}>
                <img className={styles.slide__img} src={imgPath} alt="car slider image" />
            </picture>
        </div>
    );
};
