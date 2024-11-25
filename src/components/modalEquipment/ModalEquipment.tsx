import React from 'react';
import styles from './ModalEquipment.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { modalSelector } from '../../redux/selectors';
import { closeModal } from '../../redux/slice/modalSlice';
import { Cross } from '../svg/Svg';
import type { AutoCard } from '../../interfaces/cars.interface';

export const ModalEquipment = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const [car, setCar] = React.useState<AutoCard | null>(null);
    const { selectCar, equipment } = useSelector(modalSelector);
    const modalEquipmentState = equipment.modalState;

    const closeModalEquipment = (): void => {
        dispatch(closeModal('equipment'));
    };

    React.useEffect(() => {
        const carData = selectCar.filter.car.carSelect;
        if (carData && (!car || car.id !== carData.id)) {
            setCar(carData);
        }
    }, [selectCar, car]);

    if (!car?.brand) return <></>;

    return (
        <div
            className={`${styles.modal_equipment} ${modalEquipmentState ? styles.modal_equipment_active : ''}`}
            onClick={closeModalEquipment}
        >
            <div className={styles.modal_equipment__inner} onClick={(event) => event.stopPropagation()}>
                <header className={styles.modal_equipment__header}>
                    <h3 className={styles.modal_equipment__title}>Комплектация</h3>
                    <h4>{car.description}</h4>
                    <Cross className={styles.modal_equipment__cross} handler={closeModalEquipment} />
                </header>
                <div className={styles.modal_equipment__content}>
                    <ul className={styles.modal_equipment__category_list}>
                        {car?.extras && car?.extras?.length
                            ? car.extras.map((category) => {
                                  return (
                                      <li className={styles.modal_equipment__category_item} key={category.category}>
                                          <div>{category.category}</div>
                                          <ul className={styles.modal_equipment__name_list}>
                                              {category.names.map((item) => {
                                                  return (
                                                      <li className={styles.modal_equipment__name_item} key={item}>
                                                          {item}
                                                      </li>
                                                  );
                                              })}
                                          </ul>
                                      </li>
                                  );
                              })
                            : 'Нет данных'}
                    </ul>
                </div>
            </div>
        </div>
    );
};
