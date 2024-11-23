import React from 'react';
import { convertToUrl } from '../helpers/convertToUrl';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { banksListSelector, modalSelector } from '../redux/selectors';
import { customFetch } from '../helpers/customFetch';
import { formatPrice } from '../helpers/formatPrice';
import { getPayment } from '../helpers/car/getPayment';
import { setPaymentValue } from '../redux/slice/paymentSlice';
import type { CreditFormData, CreditPostQuery } from '../interfaces/formQuery.interface';
import type { SliderField, SuccessInformation } from '../interfaces/form.interface';
import type { UseCredit } from '../interfaces/hook.interface';

export const useCreditForm = (): UseCredit => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const targetBankLocation = useLocation().pathname.split('/')[2];

    const bankList = useSelector(banksListSelector).banksList;
    const modalCreditState = useSelector(modalSelector).credit.modalState;
    const carPrice = useSelector(modalSelector).selectCar.filter.car.carSelect.price || 0;
    const targetBank =
        useSelector(banksListSelector).targetBankId ||
        bankList.find((bank) => convertToUrl(bank.name) === targetBankLocation)?.id;
    const targetProgram = useSelector(banksListSelector).targetProgramId;
    const selectCarId = useSelector(modalSelector).selectCar.filter.car.carSelect.id;
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        watch,
        formState: { errors },
    } = useForm<CreditFormData>({
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
            credit_terms: [2, 6, 12, 24, 36, 48, 60, 72, 84, 96],
            initial_contribution: [0, 10, 20, 30, 40, 50, 60, 70, 80],
        },
        endpoints: {
            credit_terms: [2, 6, 12, 24, 36, 48, 60, 72, 84, 96],
            initial_contribution: [0, 10, 20, 30, 40, 50, 60, 70, 80],
        },
    };

    React.useEffect(() => {
        const initialContribution: number = sliderField.steps.initial_contribution[getValues('initial_contribution')];
        const creditTerm: number = sliderField.steps.credit_terms[getValues('credit_term')];

        dispatch(setPaymentValue({ initialContribution, creditTerm }));
        setPayment(formatPrice(getPayment(carPrice, initialContribution, creditTerm, 0)));
    }, [watch(['initial_contribution', 'credit_term']), carPrice, dispatch, getValues, sliderField.steps]);

    const onSubmit = async (data: CreditFormData): Promise<void> => {
        try {
            if (!data.agree || !data.agree_country) {
                console.log('Agreements not checked');
                return;
            }

            const dataQuery = {
                credit: {
                    car_id: selectCarId,
                    credit_term: sliderField.steps.credit_terms[data.credit_term],
                    initial_contribution:
                        (sliderField.steps.initial_contribution[data.initial_contribution] / 100) * carPrice,
                    name: data.name,
                    phone: data.phone,
                    banks_id: targetBank || null,
                    programs_id: targetProgram || null,
                } as CreditPostQuery,
            };

            await customFetch({ url: 'credits', data: JSON.stringify(dataQuery), method: 'POST' });

            const successInformation: SuccessInformation = {
                user_name: data.name,
                select_car_id: data.car_id,
                from: 'Автокредит предварительно одобрен',
            };

            navigate('/success', { state: successInformation, replace: true });
            reset();
        } catch (error) {
            console.error('Submit error:', error);
        }
    };

    return { register, errors, handleSubmit, onSubmit, sliderField, setValue, payment };
};
