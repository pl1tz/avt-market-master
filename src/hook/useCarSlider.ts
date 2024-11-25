import { useCallback, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { mediaQuerySelector } from '../redux/selectors';
import type { SwiperRef } from 'swiper/react';
import styles from '../components/carCardSlider/CarCardSlider.module.scss';

interface UseCarSliderReturn {
    swiperCardRef: React.RefObject<SwiperRef>;
    swiperHorizontalRef: React.RefObject<SwiperRef>;
    activeIndex: number;
    slidesPerView: number;
    handleNext: () => void;
    handlePrev: () => void;
    handleSlideChange: () => void;
    handleThumbnailClick: (index: number, event: React.MouseEvent) => void;
}

export const useCarSlider = (): UseCarSliderReturn => {
    const swiperCardRef = useRef<null | SwiperRef>(null);
    const swiperHorizontalRef = useRef<null | SwiperRef>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const isSmall = useSelector(mediaQuerySelector).isSmall;
    const slidesPerView = isSmall ? 3 : 6;

    const handleNext = useCallback((): void => {
        swiperCardRef.current?.swiper.slideNext();
    }, []);

    const handlePrev = useCallback((): void => {
        swiperCardRef.current?.swiper.slidePrev();
    }, []);

    const handleSlideChange = useCallback(() => {
        const mainSwiper = swiperCardRef.current?.swiper;
        const horizontalSwiper = swiperHorizontalRef.current?.swiper;

        if (mainSwiper && horizontalSwiper) {
            const newIndex = mainSwiper.activeIndex;
            setActiveIndex(newIndex);
            horizontalSwiper.slideToLoop(newIndex);
        }
    }, []);

    const handleThumbnailClick = useCallback(
        (index: number, event: React.MouseEvent): void => {
            if (
                event.target instanceof Element &&
                (event.target.closest(`.${styles.box_vector__vector}`) || event.target.closest('button'))
            ) {
                return;
            }

            const mainSwiper = swiperCardRef.current?.swiper;
            const horizontalSwiper = swiperHorizontalRef.current?.swiper;

            if (mainSwiper && horizontalSwiper) {
                mainSwiper.slideToLoop(index);

                if (activeIndex - index >= 4) {
                    horizontalSwiper.slideToLoop(activeIndex - 6);
                } else if (activeIndex > index) {
                    horizontalSwiper.slideToLoop(activeIndex - 4);
                } else {
                    horizontalSwiper.slideToLoop(index - 1);
                }

                setActiveIndex(index);
            }
        },
        [activeIndex],
    );

    return {
        swiperCardRef,
        swiperHorizontalRef,
        activeIndex,
        slidesPerView,
        handleNext,
        handlePrev,
        handleSlideChange,
        handleThumbnailClick,
    };
};
