import React from 'react';
import styles from './CardAutoHorizontal.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatPrice } from '../../helpers/formatPrice';
import { InStockSign } from '../inStockSign/InStockSign';
import { getPayment } from '../../helpers/car/getPayment';
import { getCountOwner } from '../../helpers/getCountOwner';
import { contactsSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import type { ContactsType } from '../../interfaces/interface';
import type { SwiperRef } from 'swiper/react';
import type { AutoCard } from '../../interfaces/cars.interface';

export const CardAutoHorizontal = (props: AutoCard): React.JSX.Element => {
    const { year, brand, price, engine_name_type, engine_power_type, engine_capacity_type, history_cars } = props;
    const { gearbox_type, drive_type, body_type, images, model } = props;
    const contacts: ContactsType = useSelector(contactsSelector).contacts;

    const swiperRef = React.useRef<null | SwiperRef>(null);
    const handleNext = (): void => {
        swiperRef.current?.swiper.slideNext();
    };

    const handlePrev = (): void => {
        swiperRef.current?.swiper.slidePrev();
    };
    return (
        <article className={styles.card_auto_horizontal}>
            <section className={styles.card_auto_horizontal__slider}>
                <InStockSign
                    extraClassName={styles.card_auto_horizontal__in_stock}
                    state={props.online_view_available}
                />
                <Swiper
                    ref={swiperRef}
                    slidesPerView={4}
                    spaceBetween={16}
                    className={styles.card_auto_horizontal__swiper}
                >
                    {images.map((image) => (
                        <SwiperSlide className={styles.card_auto_horizontal__slider_item} key={image.id}>
                            <img className={styles.card_auto_horizontal__img} src={image.url} alt="car" />
                        </SwiperSlide>
                    ))}

                    <SwiperSlide
                        className={`${styles.card_auto_horizontal__slider_item} ${styles.card_auto_horizontal__callback_slide}`}
                    >
                        <a className={styles.card_auto_horizontal__callback} href={`tel:+${contacts.phone}`}>
                            Позвонить в центр
                        </a>
                    </SwiperSlide>

                    <div className={styles.card_auto_horizontal__box_vector}>
                        <button className={styles.card_auto_horizontal__vector} onClick={handlePrev}>
                            &lt;
                        </button>
                        <button className={styles.card_auto_horizontal__vector} onClick={handleNext}>
                            &gt;
                        </button>
                    </div>
                </Swiper>
            </section>

            <section className={styles.card_auto_horizontal__info}>
                <div className={styles.card_auto_horizontal__info_main}>
                    <h3 className={styles.card_auto_horizontal__name}>
                        {brand.name} {model.name} <span>{year}</span>
                    </h3>
                    <div className={styles.card_auto_horizontal__price}>
                        <span className={styles.card_auto_horizontal__price_car}>{formatPrice(price)} &#8381;</span>
                        <span className={styles.card_auto_horizontal__price_month}>
                            {formatPrice(getPayment(price, 0, 96, 0))}&#8381;/мес. без взноса
                        </span>
                    </div>
                </div>
                <p className={styles.card_auto_horizontal__tags}>
                    <span>{engine_capacity_type.capacity}л.</span>
                    <span>{history_cars[0]?.last_mileage}км.</span>
                    <span>{engine_power_type.power}л.с.</span>
                    <span>{gearbox_type.abbreviation}</span>
                    <span>{engine_name_type.name}</span>
                    <span>{getCountOwner(history_cars[0]?.previous_owners)}</span>
                    <span>{drive_type.name}</span>
                    <span>{body_type.name}</span>
                </p>
            </section>
        </article>
    );
};
