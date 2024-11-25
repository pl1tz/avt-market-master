import React from 'react';
import { mediaQuerySelector } from '../redux/selectors';
import { setMediaState } from '../redux/slice/mediaQuerySlice';
import { useDispatch, useSelector } from 'react-redux';

const useMedia = (): void => {
    const small = useSelector(mediaQuerySelector).SMALL;
    const medium = useSelector(mediaQuerySelector).MEDIUM;
    const dispatch = useDispatch();

    React.useEffect(() => {
        const handleResize = () => {
            const isSmall: boolean = window.innerWidth <= small;
            const isMedium: boolean = window.innerWidth <= medium;

            dispatch(setMediaState({ isSmall, isMedium }));
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
};

export { useMedia };
