import React from 'react';
import { useForm } from 'react-hook-form';
import { customFetch } from '../helpers/customFetch';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../helpers/formatPrice';
import { setPaymentValue } from '../redux/slice/paymentSlice';
import { getPayment } from '../helpers/car/getPayment';
import { useSelector, useDispatch } from 'react-redux';
import { modalSelector } from '../redux/selectors';
import type { ExchangeFormData, ExchangePostQuery } from '../interfaces/formQuery.interface';
import type { UseExchange } from '../interfaces/hook.interface';
import type { SliderField, SuccessInformation } from '../interfaces/form.interface';

const sliderField: SliderField = {
    steps: {
        credit_terms: [2, 6, 12, 24, 36, 48, 60, 72, 84, 96],
        initial_contribution: [0, 10, 20, 30, 40, 50, 60, 70, 80],
    },
    endpoints: {
        credit_terms: [2, 6, 12, 24, 36, 48, 60, 72, 84, 96],
        initial_contribution: [0, 10, 20, 30, 40, 50, 60, 70, 80],
    },
};

export const useExchangeForm = (): UseExchange => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const modalCreditState = useSelector(modalSelector).credit.modalState;
    const carPrice = useSelector(modalSelector).selectCar.filter.car.carSelect.price || 0;
    const selectCarId = useSelector(modalSelector).selectCar.filter.car.carSelect.id;

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        setValue,
        getValues,
        reset,
    } = useForm<ExchangeFormData>({
        mode: 'onSubmit',
        defaultValues: {
            trade_in_credit: true,
            agree: true,
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

            if (!values.customer_car) {
                errorsResolver.customer_car = { type: 'required', message: 'Укажите ваш автомобиль' };
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
    const inCreditField: boolean = watch('trade_in_credit', true);

    React.useEffect(() => {
        const initialContribution: number = sliderField.steps.initial_contribution[getValues('initial_contribution')];
        const creditTerm: number = sliderField.steps.credit_terms[getValues('credit_term')];

        dispatch(setPaymentValue({ initialContribution, creditTerm }));
        setPayment(formatPrice(getPayment(carPrice, initialContribution, creditTerm, 0)));
    }, [watch(['initial_contribution', 'credit_term']), carPrice, dispatch, getValues, sliderField.steps]);

    const onSubmit = async (data: ExchangeFormData) => {
        try {
            if (!data.agree) {
                console.log('Agreement not checked');
                return;
            }

            const dataQuery = {
                exchange: {
                    car_id: selectCarId,
                    credit_term: data.trade_in_credit ? sliderField.steps.credit_terms[data.credit_term] : 0,
                    customer_car: data.customer_car,
                    initial_contribution: data.trade_in_credit
                        ? (sliderField.steps.initial_contribution[data.initial_contribution] / 100) * carPrice
                        : 0,
                    name: data.name,
                    phone: data.phone,
                } as ExchangePostQuery,
            };

            console.log('Sending request:', JSON.stringify(dataQuery));

            await customFetch({
                url: 'exchanges',
                data: JSON.stringify(dataQuery),
                method: 'POST',
            });

            const successInformation: SuccessInformation = {
                user_name: data.name,
                select_car_id: data.car_id,
                from: 'Заявка на выкуп автомобиля',
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
        sliderField,
        handleSubmit,
        onSubmit,
        register,
        errors,
        inCreditField,
        setValue,
        payment,
    };
};
