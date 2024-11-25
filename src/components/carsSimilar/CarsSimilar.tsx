import React from 'react';
import { CardAuto } from '../cardAuto/CardAuto';
import { Loader } from '../loader/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCarsSimilar } from '../../hook/useCarsSimilar';
import type { AutoCard } from '../../interfaces/cars.interface';

export const CarsSimilar = ({ car }: { car: AutoCard }): React.JSX.Element => {
    const { isLoading, isError, carsSimilar, slidesPerView } = useCarsSimilar(car);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <>Ошибка загрузки похожих автомобилей</>;
    }

    return (
        <Swiper className="swiper-latest-arrivals" slidesPerView={slidesPerView} spaceBetween={24}>
            {carsSimilar.map((carSimilar) => (
                <SwiperSlide key={carSimilar.id}>
                    <CardAuto {...carSimilar} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
