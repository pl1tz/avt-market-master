import React from 'react';
import { customFetch } from '../helpers/customFetch';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentValue } from '../redux/slice/paymentSlice';
import { formatPrice } from '../helpers/formatPrice';
import { getPayment } from '../helpers/car/getPayment';
import { modalSelector } from '../redux/selectors';
import type { InstallmentFormData, InstallmentPostQuery } from '../interfaces/formQuery.interface';
import type { SliderField, SuccessInformation } from '../interfaces/form.interface';
import type { UseInstallment } from '../interfaces/hook.interface';

export const useInstallmentForm = (): UseInstallment => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const modalCreditState = useSelector(modalSelector).credit.modalState;
    const carPrice = useSelector(modalSelector).selectCar.filter.car.carSelect.price || 0;
    const selectCarId = useSelector(modalSelector).selectCar.filter.car.carSelect.id;

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        watch,
        formState: { errors },
    } = useForm<InstallmentFormData>({
        mode: 'onSubmit',
        defaultValues: {
            agree: true,
            agree_country: true,
            initial_contribution: 0,
            credit_term: 0,
        },
        resolver: (values) => {
            const errorsResolver: Record<string, any> = {};

            if (!values.name) {
                errorsResolver.name = { type: 'required', message: 'Обязательное поле' };
            }

            if (!values.phone) {
                errorsResolver.phone = { type: 'required', message: 'Обязательное поле' };
            }

            if (!modalCreditState && !values.car_id) {
                errorsResolver.car_id = { type: 'required', message: 'Выберите автомобиль' };
            }

            return {
                values,
                errors: errorsResolver,
            };
        },
    });

    const [payment, setPayment] = React.useState('0');

    const sliderField: SliderField = {
        steps: {
            credit_terms: [2, 6, 12, 24, 36],
            initial_contribution: [0, 10, 20, 30, 40, 50, 60, 70],
        },
        endpoints: {
            credit_terms: [2, 6, 12, 24, 36],
            initial_contribution: [0, 10, 20, 30, 40, 50, 60, 70],
        },
    };

    React.useEffect(() => {
        const initialContribution: number = sliderField.steps.initial_contribution[getValues('initial_contribution')];
        const creditTerm: number = sliderField.steps.credit_terms[getValues('credit_term')];

        dispatch(setPaymentValue({ initialContribution, creditTerm }));
        setPayment(formatPrice(getPayment(carPrice, initialContribution, creditTerm, 0)));
    }, [watch(['initial_contribution', 'credit_term']), carPrice, dispatch, getValues, sliderField.steps]);

    const onSubmit = async (data: InstallmentFormData) => {
        try {
            if (!data.agree || !data.agree_country) {
                console.log('Agreements not checked');
                return;
            }

            const dataQuery = {
                installment: {
                    car_id: selectCarId,
                    credit_term: sliderField.steps.credit_terms[data.credit_term],
                    initial_contribution:
                        (sliderField.steps.initial_contribution[data.initial_contribution] / 100) * carPrice,
                    name: data.name,
                    phone: data.phone,
                } as InstallmentPostQuery,
            };

            console.log('Sending request:', JSON.stringify(dataQuery));

            await customFetch({
                url: 'installment',
                data: JSON.stringify(dataQuery),
                method: 'POST',
            });

            const successInformation: SuccessInformation = {
                user_name: data.name,
                select_car_id: data.car_id,
                from: 'Рассрочка предварительно одобрена',
            };

            navigate('/success', { state: successInformation, replace: true });
            reset();
        } catch (error) {
            console.error('Submit error:', error);
        }
    };

    React.useEffect(() => {
        if (modalCreditState) {
            reset();
        }
    }, [modalCreditState, reset]);

    return {
        register,
        handleSubmit,
        errors,
        sliderField,
        onSubmit,
        payment,
        setValue,
    };
};
