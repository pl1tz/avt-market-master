import type { SliderField } from './form.interface';
import type { BuyoutFormData, CallbackFormData, CreditFormData } from './formQuery.interface';
import type { ExchangeFormData, InstallmentFormData } from './formQuery.interface';
import type { AutoCard } from './cars.interface';
import type { UseFormHandleSubmit, UseFormRegister, FieldErrors, UseFormSetValue, UseFormReset } from 'react-hook-form';
import { FilterElement } from '../hook/useCarsFilterAdmin';

export type UseNumberPhoneProps = {
    phoneInput: React.MutableRefObject<HTMLInputElement | null>;
};

export type UseNumberPhone = [
    string,
    (event: React.KeyboardEvent<HTMLInputElement>) => void,
    (el: HTMLInputElement | null) => void,
];

export type UseExchange = {
    errors: FieldErrors<ExchangeFormData>;
    handleSubmit: UseFormHandleSubmit<ExchangeFormData, undefined>;
    inCreditField: boolean;
    onSubmit: (data: ExchangeFormData) => Promise<void>;
    register: UseFormRegister<ExchangeFormData>;
    sliderField: SliderField;
    setValue: UseFormSetValue<ExchangeFormData>;
    payment: string;
};

export type UseBuyout = {
    onSubmit: (data: BuyoutFormData) => Promise<void>;
    handleSubmit: UseFormHandleSubmit<BuyoutFormData, undefined>;
    register: UseFormRegister<BuyoutFormData>;
    errors: FieldErrors<BuyoutFormData>;
    setValue: UseFormSetValue<BuyoutFormData>;
};

export type UseInstallment = {
    errors: FieldErrors<InstallmentFormData>;
    handleSubmit: UseFormHandleSubmit<InstallmentFormData, undefined>;
    onSubmit: (data: InstallmentFormData) => Promise<void>;
    register: UseFormRegister<InstallmentFormData>;
    setValue: UseFormSetValue<InstallmentFormData>;
    sliderField: SliderField;
    payment: string;
};

export type UseCredit = {
    errors: FieldErrors<CreditFormData>;
    handleSubmit: UseFormHandleSubmit<CreditFormData, undefined>;
    onSubmit: (data: CreditFormData) => Promise<void>;
    register: UseFormRegister<CreditFormData>;
    setValue: UseFormSetValue<CreditFormData>;
    sliderField: SliderField;
    payment: string;
};

export type UseModalCallback = {
    errors: FieldErrors<CallbackFormData>;
    handleSubmit: UseFormHandleSubmit<CallbackFormData, undefined>;
    onSubmit: (data: CallbackFormData) => Promise<void>;
    register: UseFormRegister<CallbackFormData>;
    setValue: UseFormSetValue<CallbackFormData>;
    reset: UseFormReset<CallbackFormData>;
};

export type UseCardAuto = {
    handleMouseMove: (index: number) => void;
    openModalCredit: (props: AutoCard) => void;
    currentImageIndex: number;
};

export type UseFavorite = {
    isFavorite: boolean;
    removeFavorites: () => void;
    addFavorites: () => void;
};

export interface UseCarsAdminType {
    cars: AutoCard[];
    setCars: React.Dispatch<React.SetStateAction<AutoCard[]>>;
    loading: boolean;
    filters: Record<FilterElement['key'], FilterElement>;
    onFilterChange: (key: FilterElement['key'], value: string) => Promise<void>;
}
