export const formatPrice = <T extends number | string>(price: T): string => {
    const numericPrice = typeof price === 'number' ? price : parseFloat(price);
    const result = Math.floor(numericPrice).toString();

    return result.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
