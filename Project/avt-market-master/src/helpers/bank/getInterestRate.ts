import type { Program } from '../../interfaces/banks.interface';

export const getInterestRate = (programs: Program[]): string => {
    const allInterestRate: number[] = programs.flatMap((program) => program.interest_rate);
    return `${Math.min(...allInterestRate)}% - ${Math.max(...allInterestRate)}%`;
};
