import React from 'react';
import vinImage from '../../assets/images/vin.svg';
import styles from './ModalReport.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { modalSelector } from '../../redux/selectors';
import { closeModal } from '../../redux/slice/modalSlice';
import { Cross } from '../svg/Svg';
import { vinTransform } from '../../helpers/vinTransform';
import { splitArrIntoPairs } from '../../helpers/spliArrIntoPairs';
import { formatPrice } from '../../helpers/formatPrice';
import { getVinDate } from '../../helpers/car/getVinDate';
import { DownloadOutlined } from '@ant-design/icons';
import { Loader } from '../loader/Loader';
import type { AutoCard } from '../../interfaces/cars.interface';

export const ModalReport = () => {
    const dispatch = useDispatch();
    const [car, setCar] = React.useState<AutoCard | null>(null);
    const { selectCar, report } = useSelector(modalSelector);
    const modalReportState = report.modalState;
    const [isLoading, setIsLoading] = React.useState(false);

    const closeHandler = (): void => {
        dispatch(closeModal('report'));
    };

    React.useEffect(() => {
        const carData = selectCar.filter.car.carSelect;
        if (carData && (!car || car.id !== carData.id)) {
            setCar(carData);
        }
    }, [selectCar, car]);

    const downloadReport = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        if (!car?.id) return;

        try {
            setIsLoading(true);

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/reports/${car.id}`, {
                method: 'GET',
            });

            if (!response.ok) throw new Error('Download failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.href = url;
            link.download = `report-${car.id}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 200);
        }
    };

    if (!car?.brand) return <></>;

    const { history_cars, body_type, engine_power_type, engine_capacity_type, year, color } = car;
    const hasHistory = history_cars && history_cars.length > 0;

    return (
        <div
            className={`${styles.modal_report} ${modalReportState ? styles.modal_report_active : ''}`}
            onClick={closeHandler}
        >
            <div className={styles.modal_report__inner} onClick={(event) => event.stopPropagation()}>
                <header className={styles.modal_report__header}>
                    <h3 className={styles.modal_report__title}>Отчёт по VIN</h3>
                    <h4>{getVinDate()}</h4>
                    <Cross className={styles.modal_report__cross} handler={closeHandler} />
                </header>
                <div className={styles.vin}>
                    <img className={styles.vin__img} src={vinImage} alt="vin" />
                    <div className={styles.vin__download}>
                        <a
                            className={styles.vin__link}
                            href="#"
                            onClick={downloadReport}
                            style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
                        >
                            {isLoading ? (
                                <Loader extraClass={styles.vin__loader} />
                            ) : (
                                <>
                                    <DownloadOutlined className={styles.modal_report__download_icon} />
                                    <span>Скачать отчёт</span>
                                </>
                            )}
                        </a>
                    </div>
                </div>

                {hasHistory ? (
                    <ul className={styles.modal_report__content}>
                        <li className={styles.modal_report__content_item}>
                            <span>Технические характеристики:</span>
                            <ul className={styles.modal_report__characters}>
                                <li className={styles.modal_report__characters_item}>
                                    VIN: <span>{vinTransform(history_cars[0]?.vin) || 'Нет данных'}</span>
                                </li>
                                <li className={styles.modal_report__characters_item}>
                                    № кузова: <span>{vinTransform(history_cars[0]?.vin) || 'Нет данных'}</span>
                                </li>
                                <li className={styles.modal_report__characters_item}>
                                    Тип ТС: <span>{body_type?.name || 'Нет данных'}</span>
                                </li>
                                <li className={styles.modal_report__characters_item}>
                                    Объём двигателя: <span>{engine_capacity_type?.capacity || 'Нет данных'}л.</span>
                                </li>
                                <li className={styles.modal_report__characters_item}>
                                    Последний пробег:{' '}
                                    <span>
                                        {history_cars[0]?.last_mileage
                                            ? formatPrice(history_cars[0].last_mileage)
                                            : 'Нет данных'}
                                    </span>{' '}
                                    км
                                </li>
                                <li className={styles.modal_report__characters_item}>
                                    Госномер: <span>{history_cars[0]?.registration_number || 'Нет данных'}</span>
                                </li>
                                <li className={styles.modal_report__characters_item}>
                                    Год выпуска: <span>{year || 'Нет данных'}</span>
                                </li>
                                <li className={styles.modal_report__characters_item}>
                                    Цвет: <span>{color?.name || 'Нет данных'}</span>
                                </li>
                                <li className={styles.modal_report__characters_item}>
                                    Мощность: <span>{engine_power_type?.power || 'Нет данных'}л.с.</span>
                                </li>
                            </ul>
                        </li>
                        {splitArrIntoPairs(Object.entries(history_cars[0]).slice(5)).map((history, index) => (
                            <li className={styles.modal_report__content_item} key={index}>
                                {history.map((item) => (
                                    <span key={item[0]}>{item[1]}</span>
                                ))}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className={styles.modal_report__no_history}>
                        <p>История автомобиля отсутствует</p>
                        <p>К сожалению, для данного автомобиля нет доступной информации об истории</p>
                    </div>
                )}
            </div>
        </div>
    );
};
