import React from 'react';
import styles from './CreditBankProgram.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { banksListSelector, modalSelector } from '../../redux/selectors';
import { paymentSelector } from '../../redux/selectors';
import { getPayment } from '../../helpers/car/getPayment';
import { formatPrice } from '../../helpers/formatPrice';
import { setTargetBankId, setTaretProgramId } from '../../redux/slice/banksListSlice';
import type { Program } from '../../interfaces/banks.interface';

export const CreditBankProgram = ({ program }: { program: Program }): React.JSX.Element => {
    const dispatch = useDispatch();

    const targetProgram = useSelector(banksListSelector).targetProgramId;
    const creditTerm: number = useSelector(paymentSelector).creditTerm;
    const initialContribution: number = useSelector(paymentSelector).initialContribution;
    const carPrice: number = useSelector(modalSelector).selectCar.filter.car.carSelect.price;

    const setBankTarget = () => {
        dispatch(setTargetBankId(program.bank_id));
        dispatch(setTaretProgramId(targetProgram === program.id ? null : program.id));
    };

    return (
        <section className={styles.bank_program}>
            <h5 className={styles.bank_program__name}>{program.program_name}</h5>
            <span className={styles.bank_program__rate}>{program.interest_rate}%</span>
            <span className={styles.bank_program__payment}>
                {formatPrice(getPayment(carPrice, initialContribution, creditTerm, program.interest_rate))} &#8381;
            </span>
            <button className={styles.bank_program__btn} onClick={setBankTarget}>
                {targetProgram === program.id ? 'Выбрано' : 'Выбрать'}
            </button>
        </section>
    );
};
