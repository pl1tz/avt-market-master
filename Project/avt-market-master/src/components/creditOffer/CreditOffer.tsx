import React from 'react';
import styles from './CreditOffer.module.scss';
import { useSelector } from 'react-redux';
import { CreditBankProgram } from '../creditBankProgram/CreditBankProgram';
import { CreditBankInfo } from '../creditBankInfo/CreditBankInfo';
import { banksListSelector } from '../../redux/selectors';
import type { Bank } from '../../interfaces/banks.interface';

export const CreditOffer = ({ bank, payment }: { bank: Bank; payment: string }): React.JSX.Element => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const targetProgram = useSelector(banksListSelector).targetProgramId;

    const handlerCreditOffer = (): void => {
        setIsOpen((prev) => !prev);
    };

    const isTargetProgram = (): boolean => {
        return bank.programs.some((program) => program.id === targetProgram);
    };

    return (
        <article
            className={`${styles.offer} ${isOpen ? styles.offer_active_open : ''} ${isTargetProgram() ? styles.offer_active_program : ''}`}
        >
            <CreditBankInfo bank={bank} isOpen={isOpen} handler={handlerCreditOffer} payment={payment} />
            <div className={styles.offer__programs} style={{ maxHeight: `${isOpen ? 250 : 0}px` }}>
                {bank.programs.map((program) => {
                    return <CreditBankProgram key={program.id} program={program} />;
                })}
            </div>
        </article>
    );
};
