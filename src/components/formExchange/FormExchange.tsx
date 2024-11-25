import React from 'react';
import styles from './FormExchange.module.scss';
import { Checkbox } from '../../components/checkbox/Checkbox';
import { CheckboxAgree } from '../../components/checkboxAgree/CheckboxAgree';
import { FieldSlider } from '../../components/fieldSlider/FieldSlider';
import { FormField } from '../../components/formField/FormField';
import { FormFieldPhone } from '../../components/formFieldPhone/FormFieldPhone';
import { FormSendButton } from '../../components/formSendButton/FormSendButton';
import { SelectAutoButton } from '../../components/selectAutoButton/SelectAutoButton';
import { useExchangeForm } from '../../hook/useExchangeForm';

export const FormExchange = () => {
    const { sliderField, handleSubmit, onSubmit, register, errors, inCreditField, setValue, payment } =
        useExchangeForm();

    return (
        <form className={styles.exchange__form} onSubmit={handleSubmit(onSubmit)}>
            <SelectAutoButton
                isError={Boolean(errors.car_id)}
                register={register('car_id', {
                    required: true,
                    validate: (value) => String(value) !== 'Выбрать автомобиль',
                })}
            />
            <Checkbox
                register={register('trade_in_credit')}
                id="trade_in_credit"
                textContent="Купить авто в кредит"
                isError={'no error'}
            />

            <div className={styles.exchange__extra_fields} style={{ height: inCreditField ? '100%' : '0%' }}>
                <FieldSlider
                    endpoints={sliderField.endpoints.credit_terms}
                    initValue={2}
                    register={register('credit_term', { required: true })}
                    steps={sliderField.steps.credit_terms}
                    ticksContentWidth={'calc(100% - 24px)'}
                    ticksLeft="18px"
                    titleText="Срок кредита, мес.:"
                    unitOfMeasurement="мес."
                    fieldName="credit_term"
                    setValue={setValue}
                />
                <FieldSlider
                    endpoints={sliderField.endpoints.initial_contribution}
                    initValue={0}
                    register={register('initial_contribution', { required: true })}
                    steps={sliderField.steps.initial_contribution as number[]}
                    ticksContentWidth={'calc(100% - 28px)'}
                    ticksLeft="19px"
                    titleText="Первоначальный взнос:"
                    unitOfMeasurement="&#8381;"
                    fieldName="initial_contribution"
                    setValue={setValue}
                />
            </div>

            <h3 className={styles.exchange__payment}>
                Ваш платёж: <span>{payment}&#8381;</span>
            </h3>
            <FormField
                register={register('customer_car', {
                    required: true,
                    minLength: {
                        value: 2,
                        message: 'Минимальная длина - 2 символа.',
                    },
                    pattern: {
                        value: /^[a-zA-Zа-яА-ЯёЁ0-9\s-]+$/,
                        message: 'Используйте только буквы, цифры, пробел или дефис',
                    },
                    validate: {
                        noSpecialChars: (value) =>
                            !/[!@#$%^&*()_+={}[\]|\\:;"'<>,.?/]/.test(value) || 'Специальные символы не допускаются',
                    },
                })}
                id="trade_in_your_auto"
                placeholder="Ваш автомобиль"
                isError={Boolean(errors.customer_car)}
            />
            <FormField
                register={register('name', {
                    required: true,
                    minLength: {
                        value: 2,
                        message: 'Минимальная длина - 2 символа.',
                    },
                    pattern: {
                        value: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
                        message: 'Используйте только буквы, пробел или дефис',
                    },
                })}
                id="trade_in_your_name"
                placeholder="ФИО"
                isError={Boolean(errors.name)}
            />
            <FormFieldPhone register={register} id="trade_in_credit_phone" isError={Boolean(errors.phone)} />
            <CheckboxAgree
                register={register('agree', { required: true })}
                id="trade_in_agree"
                isError={Boolean(errors.agree)}
            />
            <FormSendButton textContent="Оставить заявку" />
        </form>
    );
};
