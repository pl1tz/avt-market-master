export const getValueFromLocalStorage = <T>(key: string, defaultValue: T): T => {
    const value: string | null = localStorage.getItem(key);

    if (value) {
        return JSON.parse(value);
    }

    return defaultValue;
};
