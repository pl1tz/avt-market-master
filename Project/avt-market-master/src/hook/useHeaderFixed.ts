import React from 'react';

export const useHeaderFixed = (): number => {
    const [scrollPosition, setScrollPosition] = React.useState<number>(0);

    const scrollHandler = (): void => {
        setScrollPosition(window.scrollY);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    return scrollPosition;
};
