import type { FieldValues, UseFormRegister, UseFormRegisterReturn, UseFormSetValue, Path } from 'react-hook-form';

export type RegisterNameFormField = 'name' | 'brand' | 'mileage' | 'year' | 'phone' | 'id' | 'model' | 'customer_car';
export type RegisterNameFormFieldSlider = 'credit_term' | 'initial_contribution';
export type RegisterNameCheckbox = 'agree' | 'agree_country' | 'trade_in_credit';

export type SelectAutoButtonProps = {
    isError: boolean;
    register: UseFormRegisterReturn<'car_id'>;
};

export type FormSendButtonProps = {
    textContent: string;
};

export type CheckboxProps = {
    id: string;
    isError?: boolean | 'no error';
    register?: UseFormRegisterReturn<RegisterNameCheckbox>;
    textContent: string;
};

export type FormFieldProps = {
    id: string;
    isError: boolean;
    placeholder: string;
    register: UseFormRegisterReturn<RegisterNameFormField>;
};

export type FormFieldSelectProps<T extends FieldValues> = {
    fieldName: Path<T>;
    isError: boolean;
    items: number[] | string[];
    placeholder: string;
    register?: UseFormRegisterReturn<'year' | 'preferred_time'>;
    setFormValue: UseFormSetValue<T>;
};

export type FormFieldPhoneProps<T extends FieldValues> = {
    id: string;
    isError: boolean;
    register: UseFormRegister<T>;
};

export type FieldSliderProps<T extends FieldValues> = {
    endpoints: number[];
    fieldName: Path<T>;
    initValue: number;
    register: UseFormRegisterReturn<RegisterNameFormFieldSlider>;
    setValue: UseFormSetValue<T>;
    steps: number[];
    ticksContentWidth: string;
    ticksLeft: string;
    titleText: string;
    unitOfMeasurement: string;
    unitTicks?: string;
};

export type SliderField = {
    steps: {
        credit_terms: number[];
        initial_contribution: number[];
    };
    endpoints: {
        credit_terms: number[];
        initial_contribution: number[];
    };
};

export type SuccessInformation = {
    from: string;
    user_name: string;
    select_car_id?: number;
};
