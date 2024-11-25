import React from 'react';
import styles from './BankList.module.scss';
import { banksListSelector } from '../../redux/selectors';
import { ErrorLoading } from '../errorLoading/ErrorLoading';
import { getBankImage } from '../../helpers/bank/getBankImage';
import { Link } from 'react-router-dom';
import { convertToUrl } from '../../helpers/convertToUrl';
import { Loader } from '../loader/Loader';
import { setTargetBankId } from '../../redux/slice/banksListSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { Bank } from '../../interfaces/banks.interface';

export const BanksList = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const banksList: Bank[] = useSelector(banksListSelector).banksList;
    const isLoad: boolean = useSelector(banksListSelector).stateLoad.isLoad;
    const error: boolean = useSelector(banksListSelector).stateLoad.error;

    const selectBank = (bankId: number) => dispatch(setTargetBankId(bankId));

    if (error) {
        return <ErrorLoading />;
    }

    if (isLoad) {
        return <Loader />;
    }

    return (
        <ul className={styles.banks_list}>
            {banksList.map(({ name, id }) => {
                return (
                    <li className={styles.banks_list__item} key={id}>
                        {getBankImage(name) ? (
                            <img className={styles.banks_list__img} src={getBankImage(name)} alt={name} />
                        ) : (
                            <div>{name}</div>
                        )}

                        <div className={styles.banks_list__helper}>
                            <p>Отправить заявку</p>
                            <p>в {name}</p>
                        </div>
                        <Link
                            className={styles.banks_list__link}
                            to={`/credit/${convertToUrl(name as string)}`}
                            onClick={() => selectBank(id)}
                        />
                    </li>
                );
            })}
        </ul>
    );
};
