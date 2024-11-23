export const splitArrIntoPairs = <T>(arr: [string, T][]): [string, T][][] => {
    const result = [];

    for (let i = 0; i < arr.length; i += 2) {
        const pair = arr.slice(i, i + 2);
        result.push(pair);
    }

    return result;
};
