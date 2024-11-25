import React from 'react';
import benefits from './benefits.json';
import styles from './Installment.module.scss';
import { BanksList } from '../../components/banksList/BanksList';
import { Benefits } from '../../components/benefits/Benefits';
import { CardAutoHorizontal } from '../../components/cardAutoHorizontal/CardAutoHorizontal';
import { Checkbox } from '../../components/checkbox/Checkbox';
import { CheckboxAgree } from '../../components/checkboxAgree/CheckboxAgree';
import { FieldSlider } from '../../components/fieldSlider/FieldSlider';
import { FormField } from '../../components/formField/FormField';
import { FormFieldPhone } from '../../components/formFieldPhone/FormFieldPhone';
import { FormSendButton } from '../../components/formSendButton/FormSendButton';
import { modalSelector } from '../../redux/selectors';
import { SelectAutoButton } from '../../components/selectAutoButton/SelectAutoButton';
import { useInstallmentForm } from '../../hook/useInstallmentForm';
import { useSelector } from 'react-redux';
import type { AutoCard } from '../../interfaces/cars.interface';

export const Installment = (): React.JSX.Element => {
    const { errors, register, handleSubmit, onSubmit, setValue, sliderField, payment } = useInstallmentForm();
    const selectCar: AutoCard = useSelector(modalSelector).selectCar.filter.car.carSelect;

    return (
        <div className="container">
            <div className={styles.installment}>
                <h1 className={styles.installment__title}>Автомобиль в рассрочку по 2 документам</h1>
                <Benefits benefits={benefits} />
                <div className={styles.installment__content}>
                    <form className={styles.installment__form} onSubmit={handleSubmit(onSubmit)}>
                        <SelectAutoButton
                            isError={Boolean(errors.car_id)}
                            register={register('car_id', {
                                required: true,
                                validate: (value) => String(value) !== 'Выбрать автомобиль',
                            })}
                        />
                        <FieldSlider
                            endpoints={sliderField.endpoints.credit_terms}
                            fieldName="credit_term"
                            initValue={2}
                            register={register('credit_term', { required: true })}
                            setValue={setValue}
                            steps={sliderField.steps.credit_terms}
                            ticksContentWidth={'calc(100% - 23px)'}
                            ticksLeft="17px"
                            titleText="Срок кредита, мес.:"
                            unitOfMeasurement="мес."
                        />
                        <FieldSlider
                            endpoints={sliderField.endpoints.initial_contribution}
                            fieldName="initial_contribution"
                            initValue={0}
                            register={register('initial_contribution', { required: true })}
                            setValue={setValue}
                            steps={sliderField.steps.initial_contribution as number[]}
                            ticksContentWidth={'calc(100% - 27px)'}
                            ticksLeft="17px"
                            titleText="Первоначальный взнос:"
                            unitOfMeasurement="&#8381;"
                        />

                        <h3 className={styles.installment__payment}>
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
                        <FormFieldPhone
                            id="installment_credit_phone"
                            register={register}
                            isError={Boolean(errors.phone)}
                        />
                        <Checkbox
                            id="installment_agree_country"
                            textContent="Подтверждаю наличие гражданства РФ"
                            register={register('agree_country', { required: true })}
                            isError={Boolean(errors.agree_country)}
                        />
                        <CheckboxAgree
                            id="installment_agree"
                            isError={Boolean(errors.agree)}
                            register={register('agree', { required: true })}
                        />
                        <FormSendButton textContent="Оставить заявку" />
                    </form>
                    <div>
                        {selectCar?.brand ? <CardAutoHorizontal {...selectCar} /> : null}
                        <div className={styles.installment__description}>
                            <p className={styles.installment__text}>
                                Автоцентр «You-Auto» предлагает вам возможность приобрести автомобиль в рассрочку без
                                переплат и процентов.
                            </p>
                            <p className={styles.installment__text}>
                                Рассрочка - это удобный способ приобретения подержанного автомобиля и идеальное решение,
                                если вы можете погасить его за срок до 3 лет. Если выплата всей стоимости автомобиля в
                                течение 3 лет будет невозможна, отличным вариантом может стать автокредит с процентной
                                ставкой от 4.9% и со скидкой до 300 000 ₽.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.installment__banks}>
                    <h2 className={styles.installment__banks_title}>Банки-партнеры</h2>
                    <BanksList />
                </div>
            </div>
        </div>
    );
};
