import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { customFetch } from '../helpers/customFetch';
import { modalSelector } from '../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/slice/modalSlice';
import type { UseModalCallback } from '../interfaces/hook.interface';
import type { SuccessInformation } from '../interfaces/form.interface';
import type { CallbackFormData, CallbackPostQuery } from '../interfaces/formQuery.interface';

export const useModalCallback = (): UseModalCallback => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectCar = useSelector(modalSelector)?.selectCar.filter?.car?.carSelect;
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        reset,
    } = useForm<CallbackFormData>({
        defaultValues: {
            agree: true,
        },
    });

    const onSubmit = async (data: CallbackFormData) => {
        const dataQuery = {
            call_request: {
                car_id: selectCar.id || null,
                name: data.name,
                phone: data.phone,
                preferred_time: data.preferred_time,
            } as CallbackPostQuery,
        };

        const successInformation: SuccessInformation = {
            user_name: data.name,
            from: 'Заявка на обратный звонок принята',
        };

        try {
            await customFetch({ url: 'call_requests', data: JSON.stringify(dataQuery), method: 'POST' });
            dispatch(closeModal('callback'));
            navigate('/success', { state: successInformation, replace: true });
            reset();
        } catch (error) {}
    };

    return { register, handleSubmit, errors, onSubmit, setValue, reset };
};
