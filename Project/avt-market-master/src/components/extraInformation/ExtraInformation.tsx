import React from 'react';
import styles from './ExtraInformation.module.scss';
import type { ExtraInformationProps } from '../../interfaces/interface';

export const ExtraInformation = (props: ExtraInformationProps): React.JSX.Element => {
    const { title, information } = props;

    return (
        <section className={styles.extra_information}>
            <h2 className={styles.extra_information__title}>{title}</h2>

            <ul className={styles.extra_information__list}>
                {information.map((info) => {
                    return (
                        <li key={info.title} className={styles.extra_information__item}>
                            <h5>{info.title}</h5>
                            <span className={styles.extra_information__dashed}></span>
                            <span>{info.description}</span>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};
