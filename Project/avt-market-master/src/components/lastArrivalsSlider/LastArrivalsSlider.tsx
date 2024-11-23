import React from 'react';
import { CardAuto } from '../cardAuto/CardAuto';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Loader } from '../loader/Loader';
import { useLastArrivals } from '../../hook/useLastArrivalsSlider';

export const LastArrivalsSlider = (): React.JSX.Element => {
    const { lastArrivalsList, isLoading, error, slidesPerView } = useLastArrivals();

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <>Ошибка загрузки данных</>;
    }

    return (
        <Swiper className="swiper-latest-arrivals" slidesPerView={slidesPerView} spaceBetween={24}>
            {lastArrivalsList.map((car) => (
                <SwiperSlide key={car.id}>
                    <CardAuto {...car} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
