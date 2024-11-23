import React from 'react';
import { useLocation } from 'react-router-dom';

const TITLE_MAP: Record<string, string> = {
    '': 'Главная',
    cars: 'Поиск автомобиля',
    credit: 'Заявка на автокредит',
    installment: 'Заявка на авто в рассрочку',
    buyout: 'Заявка на выкуп',
    exchange: 'Обмен автомобиля',
    banks: 'Банки',
    contacts: 'Контакты',
    about: 'О нас',
    favorites: 'Избранное',
    privacy: 'Политика конфиденциальности',
    admin: 'Панель управления',
};

export const usePageTitle = () => {
    const location = useLocation();

    React.useEffect(() => {
        const basePath = location.pathname.split('/').slice(0, 4);

        if (basePath[1] === 'car') {
            const carName = basePath[2];
            document.title = carName;
            return;
        }

        const pageTitle = TITLE_MAP[basePath[1]] || 'YouAuto';

        document.title = pageTitle;
    }, [location.pathname]);
};
