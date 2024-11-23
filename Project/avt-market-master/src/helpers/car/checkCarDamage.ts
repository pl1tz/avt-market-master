export const checkForDamage = <T extends string>(inputString: T): 'Есть повреждения' | 'Повреждения не найдены' => {
    const regex = /не найден/i;

    if (regex.test(inputString)) {
        return 'Повреждения не найдены';
    }
    return 'Есть повреждения';
};
