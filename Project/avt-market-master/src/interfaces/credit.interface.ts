import type { Bank } from './banks.interface';

export type CreditBankInfoProps = {
    bank: Bank;
    isOpen: boolean;
    handler: () => void;
};
