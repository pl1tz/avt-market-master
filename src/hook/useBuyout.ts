import { useForm } from 'react-hook-form';
import { customFetch } from '../helpers/customFetch';
import { useNavigate } from 'react-router-dom';
import type { BuyoutFormData, BuyoutPostQuery } from '../interfaces/formQuery.interface';
import type { SuccessInformation } from '../interfaces/form.interface';
import type { UseBuyout } from '../interfaces/hook.interface';

export const useBuyout = (): UseBuyout => {
    const navigate = useNavigate();
    const {
        register,
        setValue,
        getValues,
        formState: { errors },
        handleSubmit,
    } = useForm<BuyoutFormData>({
        mode: 'onSubmit',
        defaultValues: {
            agree: true,
            agree_country: true,
        },
    });

    console.log(getValues('year'));

    const onSubmit = async (data: BuyoutFormData) => {
        if (!data.agree || !data.agree_country) return;

        const dataQuery: BuyoutPostQuery = {
            brand: data.brand,
            id: data.id,
            mileage: data.mileage,
            model: data.model,
            name: data.name,
            phone: data.phone,
            year: data.year,
        };

        const successInformation: SuccessInformation = {
            user_name: data.name,
            from: 'Trade in предварительно одобрен',
        };

        customFetch({ url: 'buyout', data: JSON.stringify(dataQuery), method: 'POST' });
        navigate('/success', { state: successInformation, replace: true });
    };

    return { handleSubmit, onSubmit, errors, register, setValue };
};
