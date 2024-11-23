import React from 'react';
import styles from './ModalSelectCar.module.scss';
import { closeModal } from '../../redux/slice/modalSlice';
import { Cross } from '../svg/Svg';
import { FilterKey } from '../../interfaces/slice.interface';
import { ModalSelectCarBrandList } from '../modalSelectCarList.ts/ModalSelectCarBrandList';
import { ModalSelectCarGenerationList } from '../modalSelectCarList.ts/ModalSelectCarGenerationList';
import { ModalSelectCarList } from '../modalSelectCarList.ts/ModalSelectCarList';
import { ModalSelectCarModelList } from '../modalSelectCarList.ts/ModalSelectCarModelList';
import { modalSelector } from '../../redux/selectors';
import { setStageFilter } from '../../redux/slice/modalSlice';
import { useSelector, useDispatch } from 'react-redux';

export const ModalSelectCar = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const modalSelect = useSelector(modalSelector).selectCar.filter;
    const modalSelectState = useSelector(modalSelector).selectCar.modalState;
    const selectStage = useSelector(modalSelector).selectCar.filter.stage;

    const labelState = (filterField: FilterKey | null): string => {
        if (!filterField) return styles.modal_select__label;
        return `${styles.modal_select__label} ${!modalSelect[filterField].status ? styles.modal_select__label_disabled : ''}`;
    };

    const closeHandler = () => dispatch(closeModal('selectCar'));

    const labelHandler = (stage: number) => {
        dispatch(setStageFilter(stage));
    };

    return (
        <div
            className={`${styles.modal_select} ${modalSelectState ? styles.modal_select_active : ''}`}
            onClick={closeHandler}
        >
            <div className={styles.modal_select__inner} onClick={(event) => event.stopPropagation()}>
                <header className={styles.modal_select__header}>
                    <h3 className={styles.modal_select__title}>Выберите автомобиль</h3>
                    <Cross className={styles.modal_select__cross} handler={closeHandler} />
                </header>

                <div className={styles.modal_select__panel}>
                    <label className={labelState(null)} htmlFor="select-marka" onClick={() => labelHandler(1)}>
                        <span className={styles.modal_select__label_text}>
                            {`${modalSelect.brand.selected}` || '1. Марка'}
                        </span>
                        <input id="select-marka" type="radio" name="select" checked={selectStage === 1} readOnly />
                    </label>

                    <label className={labelState('model')} htmlFor="select-model" onClick={() => labelHandler(2)}>
                        <span className={styles.modal_select__label_text}>
                            {`${modalSelect.model.selected}` || '2. Модель'}
                        </span>
                        <input id="select-model" type="radio" name="select" checked={selectStage === 2} readOnly />
                    </label>

                    <label
                        className={labelState('generation')}
                        htmlFor="select-generation"
                        onClick={() => labelHandler(3)}
                    >
                        <span className={styles.modal_select__label_text}>
                            {`${modalSelect.generation.selected}` || '3. Поколение'}
                        </span>
                        <input id="select-generation" type="radio" name="select" checked={selectStage === 3} readOnly />
                    </label>

                    <label className={labelState('car')} htmlFor="select-car" onClick={() => labelHandler(4)}>
                        <span className={styles.modal_select__label_text}>4. Автомобиль</span>
                        <input id="select-car" type="radio" name="select" checked={selectStage === 4} readOnly />
                    </label>
                </div>

                {selectStage === 1 ? (
                    <ModalSelectCarBrandList />
                ) : selectStage === 2 ? (
                    <ModalSelectCarModelList />
                ) : selectStage === 3 ? (
                    <ModalSelectCarGenerationList />
                ) : (
                    <ModalSelectCarList />
                )}
            </div>
        </div>
    );
};
