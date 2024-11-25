import React from 'react';
import styles from './CarCardSlider.module.scss';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCarSlider } from '../../hook/useCarSlider';
import type { AutoCardAutoImage } from '../../interfaces/cars.interface';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

export const CarCardSlider = ({ images }: { images: AutoCardAutoImage[] }): React.JSX.Element => {
    const {
        swiperCardRef,
        swiperHorizontalRef,
        activeIndex,
        slidesPerView,
        handleNext,
        handlePrev,
        handleSlideChange,
        handleThumbnailClick,
    } = useCarSlider();

    React.useEffect(() => {
        Fancybox.bind('[data-fancybox]');

        return () => {
            Fancybox.destroy();
        };
    }, []);

    return (
        <div className={styles.slider_wrapper}>
            <div className={styles.slider_main_container}>
                <div data-fancybox="gallery">
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        loop={true}
                        modules={[EffectCards]}
                        className={styles.slider_card}
                        ref={swiperCardRef}
                        onSlideChange={handleSlideChange}
                    >
                        {images.map((image) => (
                            <SwiperSlide
                                className={styles.slider_card__item}
                                key={image.id}
                                data-fancybox="gallery"
                                data-src={image.url}
                            >
                                <img src={image.url} alt="car" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className={styles.box_vector}>
                    <button className={styles.box_vector__vector} onClick={handlePrev}>
                        &lt;
                    </button>
                    <button className={styles.box_vector__vector} onClick={handleNext}>
                        &gt;
                    </button>
                </div>
            </div>

            <Swiper
                className={styles.slider_horizontal}
                spaceBetween={16}
                slidesPerView={slidesPerView}
                ref={swiperHorizontalRef}
            >
                {images.map((image, index) => (
                    <SwiperSlide
                        className={styles.slider_horizontal__item}
                        key={index}
                        onClick={(e) => handleThumbnailClick(index, e)}
                    >
                        <img
                            className={styles.slider_horizontal__item_img}
                            src={image.url}
                            alt="car"
                            style={{ opacity: activeIndex === index ? 1 : 0.5 }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
