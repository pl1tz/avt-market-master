import React from 'react';
import styles from './About.module.scss';
import { useSelector } from 'react-redux';
import { aboutSelector } from '../../redux/selectors';
import { Loader } from '../../components/loader/Loader';

export const About = (): React.JSX.Element => {
    const about = useSelector(aboutSelector).about;
    const isLoading: boolean = useSelector(aboutSelector).stateLoad.isLoading;
    const error: boolean = useSelector(aboutSelector).stateLoad.error;

    if (error) {
        return <>Ошибка загрузки данных</>;
    }

    return (
        <div className="container">
            <div className={`${styles.about} page`}>
                <h1 className={`${styles.about__title} page__title`}>Об автоцентре</h1>
                <div className={styles.about__text}>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        about.map((item) => (
                            <p key={item.id} className={styles.about__description}>
                                {item.description}
                            </p>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
