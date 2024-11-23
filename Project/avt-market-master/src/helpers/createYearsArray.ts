export const createYearsArray = (start: number, end: number): number[] => {
    return Array.from({ length: end - start + 1 })
        .fill(start)
        .map((year, index) => (year as number) + index);
};
