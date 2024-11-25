import React from 'react';
import styles from './Layout.module.scss';
import { BurgerMenu } from '../burgerMenu/BurgerMenu';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import { InitialProvider } from '../../hoc/InitialProvider';
import { ModalBenefit } from '../modalBenefit/ModalBenefit';
import { ModalCallback } from '../modalCallback/ModalCallback';
import { ModalCredit } from '../modalCredit/ModalCredit';
import { ModalEquipment } from '../modalEquipment/ModalEquipment';
import { ModalExchange } from '../modalExchange/ModalExchange';
import { ModalReport } from '../modalReport/ModalReport';
import { ModalSelectCar } from '../modalSelectCar/ModalSelectCar';
import { Outlet } from 'react-router-dom';

export const Layout = (): React.JSX.Element => {
    return (
        <InitialProvider>
            <div className={styles.body_inner}>
                <Header />
                <main className={styles.main}>
                    <Outlet />
                </main>
                <Footer />

                <BurgerMenu />
                <ModalBenefit />
                <ModalCallback />
                <ModalCredit />
                <ModalEquipment />
                <ModalExchange />
                <ModalReport />
                <ModalSelectCar />
            </div>
        </InitialProvider>
    );
};
