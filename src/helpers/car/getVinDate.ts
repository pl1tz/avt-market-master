export const getVinDate = (): string => {
    const date: Date = new Date();

    const months: string[] = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];

    const day: number = date.getDate();
    const month: string = months[date.getMonth()];

    return `От ${day} ${month} ${date.getFullYear()} года`;
};
