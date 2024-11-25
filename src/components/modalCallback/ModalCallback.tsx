import React from 'react';
import styles from './ModalCallback.module.scss';
import { CheckboxAgree } from '../checkboxAgree/CheckboxAgree';
import { closeModal } from '../../redux/slice/modalSlice';
import { Cross } from '../svg/Svg';
import { FormField } from '../formField/FormField';
import { FormFieldPhone } from '../formFieldPhone/FormFieldPhone';
import { FormFieldSelect } from '../formFieldSelect/FormFieldSelect';
import { FormSendButton } from '../formSendButton/FormSendButton';
import { modalSelector } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useModalCallback } from '../../hook/useModalCallback';

export const ModalCallback = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const callbackModalState: boolean = useSelector(modalSelector).callback.modalState;
    const { register, errors, handleSubmit, onSubmit, setValue, reset } = useModalCallback();

    const crossHandler = (): void => {
        reset();
        dispatch(closeModal('callback'));
    };

    return (
        <div
            className={`${styles.modal_callback} ${callbackModalState ? styles.modal_callback_active : ''}`}
            onClick={crossHandler}
        >
            <div className={styles.modal_callback__inner} onClick={(event) => event.stopPropagation()}>
                <h3 className={styles.modal_callback__title}>Обратный звонок</h3>
                <div className={styles.modal_callback__content}>
                    <form className={styles.modal_callback__form} onSubmit={handleSubmit(onSubmit)}>
                        <h4 className={styles.modal_callback__form_title}>
                            <span>Оставьте заявку, и наши операторы свяжутся с вами в течение 5 минут!</span>
                            <Cross className={styles.modal_callback__cross} handler={crossHandler} />
                        </h4>
                        <FormField
                            register={register('name', {
                                required: true,
                                minLength: {
                                    value: 2,
                                    message: 'Минимальная длина - 2 символа.',
                                },
                            })}
                            id="callback_name"
                            isError={Boolean(errors.name)}
                            placeholder="ФИО"
                        />
                        <FormFieldPhone register={register} id="callback_phone" isError={Boolean(errors.phone)} />
                        <FormFieldSelect
                            register={register('preferred_time', {
                                required: true,
                            })}
                            fieldName="preferred_time"
                            isError={Boolean(errors.preferred_time)}
                            placeholder="Когда вам перезвонить"
                            setFormValue={setValue}
                            items={[
                                'Как можно скорее',
                                'с 17:00 до 18:00',
                                'с 18:00 до 19:00',
                                'с 19:00 до 20:00',
                                'с 20:00 до 21:00',
                            ]}
                        />
                        <CheckboxAgree
                            register={register('agree', { required: true })}
                            isError={Boolean(errors.agree)}
                            id="callback_agree"
                        />
                        <FormSendButton textContent="Перезвонить мне" />
                    </form>
                </div>
            </div>
        </div>
    );
};
