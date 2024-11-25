import React from 'react';
import styles from './Car.module.scss';
import creditInformation from '../credit/extraInformation.json';
import { BanksList } from '../../components/banksList/BanksList';
import { ButtonBoxCallCar } from '../../components/buttonBoxCallCar/ButtonBoxCallCar';
import { ButtonCardOpenModal } from '../../components/buttonCardOpenModal/ButtonCard';
import { ButtonFavorite } from '../../components/buttonFavorite/ButtonFavorite';
import { CarCardSlider } from '../../components/carCardSlider/CarCardSlider';
import { CarEquipment } from '../../components/carEquipment/CarEquipment';
import { CarPrice } from '../../components/carPrice/CarPrice';
import { CarsSimilar } from '../../components/carsSimilar/CarsSimilar';
import { CheckHistory } from '../../components/checkHistory/CheckHistory';
import { ExtraInformation } from '../../components/extraInformation/ExtraInformation';
import { formatPrice } from '../../helpers/formatPrice';
import { InStockSign } from '../../components/inStockSign/InStockSign';
import { openModal, setSelectCar } from '../../redux/slice/modalSlice';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { customFetch } from '../../helpers/customFetch';
import { Loader } from '../../components/loader/Loader';
import { validateUrl } from '../../helpers/validateUrl';
import type { URL } from '../../interfaces/interface';
import type { AutoCard } from '../../interfaces/cars.interface';

export const Car = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [car, setCar] = React.useState<AutoCard | null>(null);

    React.useEffect(() => {
        validateUrl(location.pathname);
        const loadCarData = async () => {
            if (!car?.brand) {
                const id = location.pathname.split('/')[3];
                const brand = location.pathname.split('/')[2];
                try {
                    const loadCar = await customFetch<AutoCard>({ url: `cars/${id}` as URL, method: 'GET' });
                    if (loadCar?.brand.name !== brand) {
                        navigate('/error');
                    }
                    setCar(loadCar);
                    dispatch(setSelectCar(loadCar));
                } catch (error) {
                    console.error('Ошибка загрузки данных автомобиля:', error);
                }
            } else {
                dispatch(setSelectCar(car));
            }
        };

        loadCarData();
    }, []);

    if (!car) {
        return (
            <div className="container">
                <div className="page">
                    <div style={{ marginTop: '50px' }}>
                        <Loader />
                    </div>
                </div>
            </div>
        );
    }

    const {
        brand,
        model,
        description,
        year,
        price,
        gearbox_type,
        drive_type,
        history_cars,
        engine_name_type,
        engine_power_type,
        engine_capacity_type,
    } = car;
    const { body_type, color } = car;

    const openModalCredit = (): void => {
        dispatch(openModal('credit'));
        dispatch(setSelectCar(car));
    };

    const openModalExchange = (): void => {
        dispatch(openModal('exchange'));
        dispatch(setSelectCar(car));
    };

    const characterInformation = [
        {
            title: 'Год выпуска',
            description: `${year}`,
        },
        {
            title: 'КПП',
            description: `${gearbox_type.abbreviation}`,
        },
        {
            title: 'Пробег',
            description: `${formatPrice(history_cars[0].last_mileage)} км.`,
        },
        {
            title: 'Объем двигателя',
            description: `${engine_capacity_type.capacity} л.`,
        },
        {
            title: 'Мощность двигателя',
            description: `${engine_power_type.power}л.с.`,
        },
        {
            title: 'Тип двигателя',
            description: `${engine_name_type.name}`,
        },
        {
            title: 'Тип кузова',
            description: `${body_type.name}`,
        },
        {
            title: 'Привод',
            description: `${drive_type.name}`,
        },
        {
            title: 'Цвет кузова',
            description: `${color.name}`,
        },
        {
            title: 'Владельцев',
            description: `${history_cars[0].previous_owners}`,
        },
    ];

    return (
        <div className="container">
            <div className="page">
                <h1 className="page__title">
                    {brand.name} {model.name} {description} {year} года
                </h1>
                <div className={styles.car__main}>
                    <aside className={styles.car__aside}>
                        <div className={styles.car__aside_buy}>
                            <div className={styles.price}>
                                <div>
                                    <CarPrice price={price} />
                                </div>
                                <ButtonFavorite car={car} />
                            </div>
                            <div className={styles.car__modal_buttons}>
                                <ButtonCardOpenModal
                                    textContent="Купить в кредит"
                                    handler={openModalCredit}
                                    extraClassName={styles.car__modal_button_credit}
                                />
                                <ButtonCardOpenModal
                                    textContent="Trade in"
                                    handler={openModalExchange}
                                    className={styles.car__modal_button_trade}
                                />
                            </div>
                            <ButtonBoxCallCar />
                        </div>
                        <CheckHistory {...car} />
                        <ExtraInformation {...creditInformation} />
                        <ExtraInformation title="Характеристики" information={characterInformation} />
                        <CarEquipment car={car} />
                    </aside>
                    <div className={styles.car__content}>
                        <div className={styles.car__content_inner}>
                            <InStockSign state={car.online_view_available} extraClassName={styles.in_stock_sign} />
                            <CarCardSlider images={car.images} />
                            <div className={styles.car__callback}>
                                <div className={styles.car__callback_price}>
                                    <div>
                                        <CarPrice price={price} />
                                    </div>
                                    <ButtonCardOpenModal
                                        textContent="Купить в кредит"
                                        handler={openModalCredit}
                                        extraClassName={styles.car__modal_button_credit}
                                    />
                                </div>

                                <ButtonBoxCallCar extraStyles={{ gap: '8px', padding: '0px' }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className={styles.car__subtitle}>Банки-партнеры</h2>
                    <BanksList />
                </div>

                <div>
                    <h2 className={styles.car__subtitle}>Похожие автомобили</h2>
                    <CarsSimilar car={car} />
                </div>
            </div>
        </div>
    );
};
