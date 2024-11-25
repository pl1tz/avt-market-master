export const getPayment = (
    carPrice: number,
    initialContribution: number,
    creditTerm: number,
    interestRate: number,
): number => {
    if (!carPrice) return 0;

    const initialContributionAmount: number = (initialContribution / 100) * carPrice;
    const loanAmount: number = carPrice - initialContributionAmount;

    if (interestRate === 0) {
        return loanAmount / creditTerm;
    }

    const monthlyRate: number = interestRate / 100 / 12;
    const monthlyPayment: number = loanAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -creditTerm)));

    return monthlyPayment;
};
