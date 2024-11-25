import React from 'react';
import benefits from './benefits.json';
import styles from './Buyout.module.scss';
import { Benefits } from '../../components/benefits/Benefits';
import { Checkbox } from '../../components/checkbox/Checkbox';
import { CheckboxAgree } from '../../components/checkboxAgree/CheckboxAgree';
import { createYearsArray } from '../../helpers/createYearsArray';
import { FormField } from '../../components/formField/FormField';
import { FormFieldPhone } from '../../components/formFieldPhone/FormFieldPhone';
import { FormFieldSelect } from '../../components/formFieldSelect/FormFieldSelect';
import { FormSendButton } from '../../components/formSendButton/FormSendButton';
import { useBuyout } from '../../hook/useBuyout';

export const Buyout = (): React.JSX.Element => {
    const { register, errors, handleSubmit, onSubmit, setValue } = useBuyout();

    return (
        <div className="container">
            <div className={`${styles.buyout} page`}>
                <h1 className={`${styles.buyout__title} page__title`}>Выкуп авто в Москве</h1>
                <Benefits benefits={benefits} />
                <div className={styles.buyout__content}>
                    <form className={styles.buyout__form} onSubmit={handleSubmit(onSubmit)}>
                        <FormField
                            register={register('brand', {
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
                            isError={Boolean(errors.brand)}
                            id="buyout_mark"
                            placeholder="Марка"
                        />
                        <FormField
                            register={register('model', {
                                required: true,
                                minLength: {
                                    value: 2,
                                    message: 'Минимальная длина - 2 символа.',
                                },
                                pattern: {
                                    value: /^[a-zA-Zа-яА-ЯёЁ0-9\s-]+$/,
                                    message: 'Используйте только буквы, цифры, пробел или дефис',
                                },
                            })}
                            isError={Boolean(errors.model)}
                            id="buyout_model"
                            placeholder="Модель"
                        />
                        <FormFieldSelect
                            setFormValue={setValue}
                            fieldName={'year'}
                            items={createYearsArray(2004, 2024)}
                            register={register('year', {
                                required: true,
                                pattern: {
                                    value: /^(200[4-9]|201[0-9]|202[0-4])$/,
                                    message: 'Выберите год с 2004 по 2024',
                                },
                            })}
                            isError={Boolean(errors.year)}
                            placeholder="Год"
                        />
                        <FormField
                            register={register('mileage', {
                                required: true,
                                pattern: {
                                    value: /^[1-9]\d{0,5}$/,
                                    message: 'Введите число от 1 до 999999',
                                },
                                validate: {
                                    isNumber: (value) => !isNaN(Number(value)) || 'Введите числовое значение',
                                    isPositive: (value) => Number(value) > 0 || 'Значение должно быть больше 0',
                                },
                            })}
                            isError={Boolean(errors.mileage)}
                            id="buyout_mileage"
                            placeholder="Пробег"
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
                            isError={Boolean(errors.name)}
                            id="buyout_name"
                            placeholder="ФИО"
                        />
                        <FormFieldPhone register={register} isError={Boolean(errors.phone)} id="buyout_phone" />
                        <Checkbox
                            register={register('agree_country', { required: true })}
                            id="buyout_agree_country"
                            textContent="Подтверждаю наличие гражданства РФ"
                            isError={Boolean(errors.agree_country)}
                        />
                        <CheckboxAgree
                            register={register('agree', { required: true })}
                            isError={Boolean(errors.agree)}
                            id="buyout_agree_data"
                        />
                        <FormSendButton textContent="Оставить заявку" />
                    </form>

                    <div className={styles.buyout__description}>
                        <p>
                            Самостоятельная продажа автомобиля зачастую занимает много времени. Наш автосалон предлагает
                            выкуп вашего автомобиля с пробегом любой марки с бесплатной оценкой в удобном для вас месте
                            и времени.
                        </p>

                        <ul>
                            <li>
                                <h3>Почему выкуп автомобиля — это выгодно?</h3>
                            </li>
                            <li>Экономия времени, денежных средств и потраченных нервов.</li>
                            <li>Быстрое получение денег.</li>
                            <li>Юридическое сопровождение.</li>
                            <li>Отсутствие рисков.</li>
                            <li>Любое состояние подержанного авто.</li>
                        </ul>
                        <p>
                            Свяжитесь с нами, чтобы получить дополнительную информацию по выкупу авто с пробегом в
                            Москве.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
