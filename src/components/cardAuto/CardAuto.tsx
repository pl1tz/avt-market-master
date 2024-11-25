import React, { useEffect, useState } from 'react';
import styles from './CardAuto.module.scss';
import { ButtonFavorite } from '../buttonFavorite/ButtonFavorite';
import { formatPrice } from '../../helpers/formatPrice';
import { InStockSign } from '../inStockSign/InStockSign';
import { getPayment } from '../../helpers/car/getPayment';
import { ButtonCardOpenModal } from '../buttonCardOpenModal/ButtonCard';
import { useCardAuto } from '../../hook/useCardAuto';
import { getCountOwner } from '../../helpers/getCountOwner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import type { AutoCard, ExtraCardAuto } from '../../interfaces/cars.interface';

export const CardAuto = (props: AutoCard & ExtraCardAuto): React.JSX.Element => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Установите порог для мобильных устройств
        };

        handleResize(); // Установите начальное значение
        window.addEventListener('resize', handleResize); // Добавьте обработчик события

        return () => {
            window.removeEventListener('resize', handleResize); // Удалите обработчик при размонтировании
        };
    }, []);

    const {
        year,
        model,
        brand,
        price,
        engine_name_type,
        engine_power_type,
        engine_capacity_type,
        inModalSelect,
        history_cars,
        gearbox_type,
        drive_type,
        body_type,
        images,
        extraClassName,
        inModalCredit,
        online_view_available,
    } = props;

    const {
        currentImageIndex,
        isSelected,
        handlers: { handleCardClick, handleCreditButtonClick, handleImageClick, handleMouseMove },
    } = useCardAuto({ car: props, inModalSelect });

    return (
        <article className={`${styles.card_auto} ${extraClassName || ''}`} onClick={handleCardClick}>
            <section className={styles.card_auto__body}>
                <header className={styles.card_auto__header}>
                    <InStockSign state={online_view_available} />
                    {!inModalCredit && <ButtonFavorite car={props} />}
                </header>

                <div className={styles.card_auto__picture_container} onClick={handleImageClick}>
                    {isMobile ? (
                        // Десктопная версия
                        <Swiper
                            effect={'cards'}
                            grabCursor={true}
                            loop={true}
                            modules={[EffectCards]}
                            className={styles.slider_card}
                        >
                            {images.slice(0, 8).map((image, index) => (
                                <SwiperSlide key={index} className={styles.card_auto__slider_item}>
                                    <img
                                        className={`${styles.card_auto__slider_item} ${
                                            currentImageIndex === index ? styles.card_auto__slider_item_active : ''
                                        }`}
                                        src={image.url}
                                        alt={`${brand.name} ${year}`}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className={styles.card_auto__picture_container}>
                            <img
                                className={styles.card_auto__picture}
                                src={images[currentImageIndex]?.url ? images[currentImageIndex].url : ''}
                                alt={`${brand.name} ${year}`}
                            />
                            <div className={styles.card_auto__slider}>
                                {Array.from({ length: images.length > 8 ? 8 : images.length }, (_, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.card_auto__slider_item} ${
                                            currentImageIndex === index ? styles.card_auto__slider_item_active : ''
                                        }`}
                                        onMouseMove={() => handleMouseMove(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <h3 className={styles.card_auto__name}>
                    {brand.name} {model.name} <span>{year}</span>
                </h3>
                <p className={styles.card_auto__tags}>
                    <span>{engine_capacity_type.capacity}л.</span>&nbsp;
                    <span>{history_cars[0]?.last_mileage}км.</span>&nbsp;
                    <span>{engine_power_type.power}л.с.</span>&nbsp;
                    <span>{gearbox_type.abbreviation}</span>&nbsp;
                    <span>{engine_name_type.name}</span>&nbsp;
                    <span>{getCountOwner(history_cars[0]?.previous_owners)}</span>&nbsp;
                    <span>{drive_type.name}</span>&nbsp;
                    <span>{body_type.name}л.</span>&nbsp;
                </p>
            </section>
            <section className={styles.card_auto__footer}>
                <div className={styles.card_auto__price_box}>
                    <span className={styles.card_auto__price}>{formatPrice(price)} &#8381;</span>
                    <span className={styles.card_auto__price_no_fee}>
                        {formatPrice(getPayment(price, 0, 96, 0))}&#8381;/мес. без взноса
                    </span>
                </div>

                {!inModalCredit && !inModalSelect && (
                    <ButtonCardOpenModal textContent="Купить в кредит" handler={handleCreditButtonClick} />
                )}

                {inModalSelect && (
                    <button className={styles.card_auto__buy} type="button" onClick={handleCardClick}>
                        {isSelected ? 'Выбрана' : 'Выбрать'}
                    </button>
                )}
            </section>
        </article>
    );
};
