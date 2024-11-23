import React from 'react';
import benefits from './benefits.json';
import extraInformation from './extraInformation.json';
import styles from './Credit.module.scss';
import { BanksList } from '../../components/banksList/BanksList';
import { Benefits } from '../../components/benefits/Benefits';
import { CreditAbout } from '../../components/creditAbout/CreditAbout';
import { CreditOffersList } from '../../components/creditOffersList/CreditOffersList';
import { ExtraInformation } from '../../components/extraInformation/ExtraInformation';
import { FormCredit } from '../../components/formCredit/FormCredit';
import { modalSelector } from '../../redux/selectors';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCreditForm } from '../../hook/useCreditForm';
import { CardAutoHorizontal } from '../../components/cardAutoHorizontal/CardAutoHorizontal';
import { banksListSelector } from '../../redux/selectors';
import { convertToUrl } from '../../helpers/convertToUrl';
import { setTargetBankId } from '../../redux/slice/banksListSlice';
import type { AutoCard } from '../../interfaces/cars.interface';
import type { Bank } from '../../interfaces/banks.interface';

export const Credit = (): React.JSX.Element => {
    const { register, errors, onSubmit, handleSubmit, sliderField, setValue, payment } = useCreditForm();
    const dispatch = useDispatch();
    const fromBanks = useLocation().pathname.split('/')[2];
    const selectCar: AutoCard = useSelector(modalSelector).selectCar.filter.car.carSelect;
    const bankList: Bank[] = useSelector(banksListSelector).banksList;

    React.useEffect(() => {
        if (bankList.length > 0 && fromBanks) {
            const targetBank = bankList.find((bank) => {
                return convertToUrl(bank.name) === fromBanks;
            });
            dispatch(setTargetBankId(targetBank?.id || null));
        }
    }, [bankList, fromBanks, dispatch]);

    return (
        <div className="container">
            <div className={`${styles.credit} page`}>
                <h1 className={`${styles.credit__title} page__title`}>Автокредит от 4.9%</h1>
                <Benefits benefits={benefits} />

                <div className={styles.credit__content}>
                    <aside className={styles.credit__column_form}>
                        <FormCredit {...{ register, errors, onSubmit, handleSubmit, sliderField, setValue, payment }} />
                        <ExtraInformation {...extraInformation} />
                    </aside>

                    <section className={styles.credit__column_about}>
                        {selectCar?.brand ? <CardAutoHorizontal {...selectCar} /> : null}
                        {!fromBanks ? <CreditOffersList payment={payment} /> : null}
                        <CreditAbout />
                    </section>
                </div>

                <div className={styles.credit__banks}>
                    <h2 className={styles.credit__banks_title}>Банки-партнеры</h2>
                    <BanksList />
                </div>
            </div>
        </div>
    );
};
