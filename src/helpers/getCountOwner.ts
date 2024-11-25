export const getCountOwner = (count: number): string => {
    return count > 1 ? `${count} владельцев` : `${count} владелец`;
};
