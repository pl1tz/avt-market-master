export const getCountProgram = (countProgram: number): string => {
    if (countProgram === 1) {
        return '1 программа';
    } else if (countProgram >= 2 && countProgram <= 4) {
        return `${countProgram} программы`;
    }

    return `${countProgram} программ`;
};
