import React from 'react';
import styles from './Benefits.module.scss';
import { useDispatch } from 'react-redux';
import { openModal, setPromotionData } from '../../redux/slice/modalSlice';
import type { ModalPromotionData } from '../../interfaces/interface';
import type { BenefitsProps } from '../../interfaces/interface';

export const Benefits = ({ benefits }: { benefits: BenefitsProps[] }) => {
    const dispatch = useDispatch();
    const benefitsElementHandler = (payload: Omit<ModalPromotionData, 'img' | 'modalPromotionState'>) => {
        dispatch(openModal('promotion'));
        dispatch(setPromotionData(payload));
    };

    return (
        <ul className={styles.benefits}>
            {benefits.map((benefit) => {
                return (
                    <li
                        className={styles.benefits__item}
                        onClick={() =>
                            benefitsElementHandler({ title: benefit.title, description: benefit.description })
                        }
                        key={benefit.title}
                    >
                        {benefit.title}
                    </li>
                );
            })}
        </ul>
    );
};
