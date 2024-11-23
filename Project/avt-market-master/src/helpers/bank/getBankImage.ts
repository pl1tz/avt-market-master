const banksImages: Record<string, string> = {
    Сбербанк: 'sberbank',
    'Т Банк': 't-bank',
    'Альфа Банк': 'alfa',
    АТБ: 'ATB',
    ВТБ: 'VTB',
    Газпромбанк: 'gazprom',
    'Банк Зенит': 'zenit',
    'Ингосстрах Банк': 'ingosstrakh',
    'Райффайзен Банк': 'raiffeisen',
    Открытие: 'opening',
    Экспобанк: 'expobank',
    'Абсолют Банк': 'absolute',
    МКБ: 'MKB',
    'Оранжевый Банк': 'orange',
    'Отп Банк': 'OTP',
    Россельхозбанк: 'rosselkhoz',
    'Почта Банк': 'mail',
    'Ренессанс Кредит': 'renessans',
    ЛокоБанк: 'lokobank',
    Совкомбанк: 'sovcombank',
    ПСБ: 'PSB',
    Юрганк: 'ural',
    'Хоум Банк': 'homebank',
    'Банк Центр-Инвест': 'bank-center-invest',
    ДрайвКлик: 'drive-click',
    ПримСоцБанк: 'prim-soc-bank',
    'Банк Авангард': 'avangard',
};

export const getBankImage = (name: string): string => {
    const bankName = banksImages[name];

    if (bankName) {
        return require(`../../assets/images/banks/${bankName}.svg`);
    }

    return '';
};
