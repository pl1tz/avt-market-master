import React from 'react';
import styles from './FormCredit.module.scss';
import { SelectAutoButton } from '../selectAutoButton/SelectAutoButton';
import { FieldSlider } from '../fieldSlider/FieldSlider';
import { FormField } from '../formField/FormField';
import { FormFieldPhone } from '../formFieldPhone/FormFieldPhone';
import { Checkbox } from '../checkbox/Checkbox';
import { CheckboxAgree } from '../checkboxAgree/CheckboxAgree';
import { FormSendButton } from '../formSendButton/FormSendButton';
import { useSelector } from 'react-redux';
import { modalSelector } from '../../redux/selectors';
import { UseCredit } from '../../interfaces/hook.interface';

export const FormCredit = (props: UseCredit): React.JSX.Element => {
    const { register, errors, onSubmit, handleSubmit, sliderField, setValue, payment } = props;
    const stateModalCredit: boolean = useSelector(modalSelector).credit.modalState;

    return (
        <form className={styles.form_credit} onSubmit={handleSubmit(onSubmit)}>
            {!stateModalCredit ? (
                <SelectAutoButton
                    isError={Boolean(errors.car_id)}
                    register={register('car_id', {
                        required: true,
                        validate: (value) => String(value) !== 'Выбрать автомобиль',
                    })}
                />
            ) : null}

            <FieldSlider
                endpoints={sliderField.endpoints.credit_terms}
                initValue={2}
                register={register('credit_term', { required: true })}
                steps={sliderField.steps.credit_terms}
                ticksContentWidth={'calc(100% - 23px)'}
                ticksLeft="17px"
                titleText="Срок кредита, мес.:"
                unitOfMeasurement="мес."
                setValue={setValue}
                fieldName={'credit_term'}
            />
            <FieldSlider
                endpoints={sliderField.endpoints.initial_contribution}
                initValue={0}
                register={register('initial_contribution', { required: true })}
                steps={sliderField.steps.initial_contribution as number[]}
                ticksContentWidth={'calc(100% - 10px)'}
                ticksLeft="15px"
                titleText="Первоначальный взнос:"
                unitOfMeasurement="&#8381;"
                setValue={setValue}
                fieldName={'initial_contribution'}
                unitTicks={'%'}
            />
            <h3 className={styles.form_credit__payment}>
                Ваш платёж:<span>{payment}&#8381;</span>
            </h3>
            <FormField
                id="installment_your_name"
                placeholder="ФИО"
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
                isError={Boolean(errors.name)}
            />
            <FormFieldPhone id="installment_credit_phone" isError={Boolean(errors.phone)} register={register} />
            <Checkbox
                id="installment_agree_country"
                isError={Boolean(errors.agree_country)}
                register={register('agree_country', { required: true })}
                textContent="Подтверждаю наличие гражданства РФ"
            />
            <CheckboxAgree
                id="installment_agree"
                isError={Boolean(errors.agree)}
                register={register('agree', { required: true })}
            />
            <FormSendButton textContent="Оставить заявку" />
        </form>
    );
};
