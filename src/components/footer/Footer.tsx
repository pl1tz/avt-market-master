import React from 'react';
import styles from './Footer.module.scss';
import { FooterContacts } from '../footerContacts/FooterContacts';
import { FooterInformation } from '../footerInformation/FooterInformation';
import { FooterDisclaimer } from '../footerDisclaimer/FooterDisclaimer';
import { FooterLegalInfo } from '../footerLegalInfo/FooterLegalInfo';

export const Footer = (): React.JSX.Element => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footer__inner}>
                    <FooterContacts />
                    <FooterInformation />
                    <FooterDisclaimer />
                    <FooterLegalInfo />
                </div>
            </div>
        </footer>
    );
};
