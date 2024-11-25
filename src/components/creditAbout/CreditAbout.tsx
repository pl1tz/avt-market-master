import React from 'react';
import styles from './CreditAbout.module.scss';

export const CreditAbout = (): React.JSX.Element => {
    return (
        <section className={styles.credit_about}>
            <h2 className={styles.credit_about__title}>Об услуге</h2>
            <div className={styles.credit_about__description}>
                <p className={styles.credit_about__text}>
                    Автосалон «YouAuto» предлагает оформление автокредита без первоначального взноса и с низкой
                    процентной ставкой. Мы сотрудничаем с ведущими банками страны, что позволяет выбрать наиболее
                    выгодные условия кредитной программы.
                </p>
                <p className={styles.credit_about__text}>
                    В автопарке нашего автосалона мы собрали множество автомобилей с пробегом, которые прошли
                    техническую и юридическую экспертизу. Проверка каждого автомобиля начинается с этапа закупки и
                    продолжается во время предпродажной подготовки.
                </p>
                <p className={styles.credit_about__text}>
                    Оформить автокредит можно в любое удобное время, просто посетив автосалон «YouAuto», выбрав желаемый
                    автомобиль и подав заявку на кредит. Оформление кредита на покупку автомобиля можно выполнить
                    непосредственно в автосалоне без необходимости посещать банковский офис.
                </p>
            </div>
        </section>
    );
};
