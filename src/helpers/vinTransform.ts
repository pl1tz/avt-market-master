export const vinTransform = (vin: string) => {
    const vinArray = vin.split('');
    return vinArray.slice(0, 5).concat(vinArray.slice(5).map(() => '*'));
};
