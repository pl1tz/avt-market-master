import type { AutoCard } from '../interfaces/cars.interface';
import type { ModalSlice } from '../interfaces/slice.interface';

export const initialStateModal: ModalSlice = {
    modals: {
        burgerMenu: {
            modalState: false,
            menuNavigation: [
                {
                    name: 'В наличии',
                    link: '/cars',
                },
                {
                    name: 'Автокредит',
                    link: '/credit',
                },
                {
                    name: 'Рассрочка',
                    link: '/installment',
                },
                {
                    name: 'Выкуп',
                    link: '/buyout',
                },
                {
                    name: 'Trade-In',
                    link: '/exchange',
                },
                {
                    name: 'Банки',
                    link: '/banks',
                },
                {
                    name: 'Контакты',
                    link: '/contacts',
                },
                {
                    name: 'О компании',
                    link: '/about',
                },
            ],
        },
        promotion: {
            description: '',
            link: '',
            modalState: false,
            title: '',
        },
        callback: {
            modalState: false,
        },
        credit: {
            modalState: false,
        },
        exchange: {
            modalState: false,
        },
        report: {
            modalState: false,
        },
        equipment: {
            modalState: false,
        },
        selectCar: {
            modalState: false,
            stateLoad: {
                isLoad: false,
                error: false,
            },
            filter: {
                brand: {
                    nextValue: null,
                    thisValue: null,
                    status: true,
                    selected: '',
                },
                model: {
                    nextValue: null,
                    thisValue: null,
                    status: false,
                    selected: '',
                },
                generation: {
                    nextValue: null,
                    thisValue: null,
                    status: false,
                    selected: '',
                },
                car: {
                    carSelect: {} as AutoCard,
                    carList: [],
                    status: false,
                },
                stage: 1,
            },
        },
    },
};
