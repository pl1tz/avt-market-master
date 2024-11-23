export type FormQuery = {
    car_id: number;
    credit_term: number;
    customer_car: string;
    initial_contribution: number;
    name: string;
    phone: string;
};

export type CallbackPostQuery = {
    car_id: number | null;
    name: string;
    phone: string;
    preferred_time: string;
};

export type ExtraField = {
    agree: boolean;
    agree_country: boolean;
    trade_in_credit: boolean;
};

export type BuyoutPostQuery = {
    id: number;
    name: string;
    phone: string;
    brand: string;
    model: string;
    year: number;
    mileage: number;
};

export type CreditPostQuery = FormQuery & { banks_id: number | null; programs_id: number | null };
export type ExchangePostQuery = FormQuery;
export type InstallmentPostQuery = FormQuery;

export type BuyoutFormData = Omit<ExtraField, 'trade_in_credit'> & BuyoutPostQuery;
export type CreditFormData = Omit<ExtraField, 'trade_in_credit'> & CreditPostQuery;
export type ExchangeFormData = Omit<ExtraField, 'agree_country'> & ExchangePostQuery;
export type InstallmentFormData = Omit<ExtraField, 'trade_in_credit'> & InstallmentPostQuery;
export type CallbackFormData = Omit<ExtraField, 'trade_in_credit' | 'agree_country'> & CallbackPostQuery;
