import React from 'react';
import styles from './CreditBankInfo.module.scss';
import { getBankImage } from '../../helpers/bank/getBankImage';
import { getCountProgram } from '../../helpers/bank/countProgramm';
import { getInterestRate } from '../../helpers/bank/getInterestRate';
import { Vector } from '../svg/Svg';
import type { CreditBankInfoProps } from '../../interfaces/credit.interface';

export const CreditBankInfo = (props: CreditBankInfoProps & { payment: string }): React.JSX.Element => {
    const { bank, isOpen, handler, payment } = props;

    return (
        <section className={styles.bank_info} onClick={handler}>
            <div className={styles.bank_info__bank}>
                <div>
                    {getBankImage(bank.name) ? (
                        <img className={styles.bank_info__img} src={getBankImage(bank.name)} alt={bank.name} />
                    ) : (
                        <div>{bank.name}</div>
                    )}
                </div>
                <section className={styles.bank_info__name}>
                    <h4>{bank.name}</h4>
                    <h5>{getCountProgram(bank.programs.length)}</h5>
                </section>
            </div>

            <div className={styles.bank_info__rate}>
                <h4>Ставка</h4>
                <h5>{getInterestRate(bank.programs)}</h5>
            </div>
            <div className={styles.bank_info__payment}>
                <h4>Ежемесячный платёж</h4>
                <h5>{payment} &#8381;</h5>
            </div>

            <Vector isOpen={isOpen} />
        </section>
    );
};
