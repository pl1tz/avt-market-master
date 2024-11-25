import React from 'react';
import mainSlide1 from '../../assets/images/main.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HeaderSliderElement } from '../headerSliderElement/HeaderSliderElement';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

export const HeaderSlider = (): React.JSX.Element => {
    return (
        <section>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    type: 'progressbar',
                }}
                rewind={true}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                loop={true}
            >
                <SwiperSlide>
                    <HeaderSliderElement
                        title="Автокредит от 4.9&nbsp;%"
                        descriptionStroke={['со скидкой до 300.000р.', 'В подарок второй комплект резины и КАСКО']}
                        linkPath="/"
                        imgPath={mainSlide1}
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <HeaderSliderElement
                        title="TRADE-IN"
                        descriptionStroke={['с выгодой до 150.000р.']}
                        linkPath="/"
                        imgPath={mainSlide1}
                    />
                </SwiperSlide>

                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </Swiper>
        </section>
    );
};
