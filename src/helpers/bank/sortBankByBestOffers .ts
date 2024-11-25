import { Bank } from '../../interfaces/banks.interface';

export const sortBankByBestOffers = (banksList: Bank[]): Bank[] => {
    return banksList
        .map((bank) => {
            bank.programs.sort((a, b) => a.interest_rate - b.interest_rate);
            return bank;
        })
        .sort((a, b) => {
            const ABankTotalInterest: number = a.programs.reduce((acc, program) => acc + program.interest_rate, 0);
            const BBankTotalInterest: number = b.programs.reduce((acc, program) => acc + program.interest_rate, 0);

            return ABankTotalInterest - BBankTotalInterest;
        });
};
