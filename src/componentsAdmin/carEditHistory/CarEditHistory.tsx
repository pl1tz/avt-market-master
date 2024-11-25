import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Typography, Divider } from 'antd';
import { useMessageContext } from '../../hoc/messageContext';
import { CarEditHistoryType } from '../../interfaces/editCar.interface';
import { useCarEditHistory } from '../../hook/useCarEditHistory';

const { Title } = Typography;
const { TextArea } = Input;

export const CarEditHistory = (): React.JSX.Element => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [carHistory, historyId, carId] = useCarEditHistory();
    const { showSuccess, showError } = useMessageContext();

    if (!carId || !carHistory) {
        return <></>;
    }

    const onFinish = async (values: CarEditHistoryType) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/history_cars/${historyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    history_car: {
                        car_id: carId,
                        ...values,
                    },
                }),
            });

            console.log(
                JSON.stringify({
                    history_car: {
                        car_id: carId,
                        ...values,
                    },
                }),
            );

            if (!response.ok) {
                throw new Error('Ошибка при обновлении');
            }

            showSuccess('История автомобиля успешно обновлена');
        } catch (error) {
            showError('Ошибка при обновлении истории автомобиля');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Title level={1} style={{ marginBottom: '20px' }}>
                Редактирование истории автомобиля
            </Title>

            <Form form={form} layout="vertical" onFinish={onFinish} initialValues={carHistory}>
                <Form.Item
                    name="vin"
                    label="VIN номер"
                    rules={[{ required: true, message: 'Пожалуйста, введите VIN номер' }]}
                >
                    <Input placeholder="Введите VIN номер" maxLength={17} style={{ textTransform: 'uppercase' }} />
                </Form.Item>

                <Form.Item
                    name="registration_number"
                    label="Регистрационный номер"
                    rules={[{ required: true, message: 'Пожалуйста, введите регистрационный номер' }]}
                >
                    <Input placeholder="Например: А123БВ777" style={{ textTransform: 'uppercase' }} />
                </Form.Item>

                <Form.Item
                    name="last_mileage"
                    label="Пробег (км)"
                    rules={[
                        { required: true, message: 'Пожалуйста, укажите пробег' },
                        { type: 'number', min: 0, message: 'Пробег не может быть отрицательным' },
                    ]}
                >
                    <InputNumber
                        min={0}
                        max={9999999}
                        style={{ width: '100%' }}
                        placeholder="Введите пробег"
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                </Form.Item>

                <Form.Item
                    name="previous_owners"
                    label="Количество владельцев"
                    rules={[
                        { required: true, message: 'Укажите количество владельцев' },
                        { type: 'number', min: 1, message: 'Минимум 1 владелец' },
                    ]}
                >
                    <InputNumber
                        min={1}
                        max={99}
                        style={{ width: '100%' }}
                        placeholder="Введите количество владельцев"
                    />
                </Form.Item>

                <Divider />
                <Title level={2}>Ограничения и розыск (Не обязательно к заполнению)</Title>
                <Form.Item name="registration_restrictions" label="Ограничения на регистрацию">
                    <Input placeholder="Например: Не найдены ограничения на регистрацию" />
                </Form.Item>

                <Form.Item name="registration_restrictions_info" label="Информация об ограничениях">
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item name="wanted_status" label="Статус розыска">
                    <Input placeholder="Например: Нет сведений о розыске" />
                </Form.Item>

                <Form.Item name="wanted_status_info" label="Информация о розыске">
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item name="pledge_status" label="Статус залога">
                    <Input placeholder="Например: Залог не найден" />
                </Form.Item>

                <Form.Item name="pledge_status_info" label="Информация о залоге">
                    <TextArea rows={2} />
                </Form.Item>

                <Divider />
                <Title level={2}>ДТП и ремонт (Не обязательно к заполнению)</Title>

                <Form.Item name="accidents_found" label="Информация о ДТП">
                    <Input placeholder="Например: ДТП не найдены" />
                </Form.Item>

                <Form.Item name="accidents_found_info" label="Дополнительная информация о ДТП">
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item name="repair_estimates_found" label="Расчёты ремонта">
                    <Input placeholder="Например: Не найдены расчёты стоимости ремонта" />
                </Form.Item>

                <Form.Item name="repair_estimates_found_info" label="Информация о расчётах ремонта">
                    <TextArea rows={2} />
                </Form.Item>

                <Divider />
                <Title level={2}>История использования (Не обязательно к заполнению)</Title>

                <Form.Item name="carsharing_usage" label="Использование в каршеринге">
                    <Input />
                </Form.Item>

                <Form.Item name="carsharing_usage_info" label="Информация о каршеринге">
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item name="taxi_usage" label="Использование в такси">
                    <Input />
                </Form.Item>

                <Form.Item name="taxi_usage_info" label="Информация о такси">
                    <TextArea rows={2} />
                </Form.Item>

                <Divider />
                <Title level={2}>Техническое состояние (Не обязательно к заполнению)</Title>

                <Form.Item name="diagnostics_found" label="Диагностика">
                    <Input />
                </Form.Item>

                <Form.Item name="diagnostics_found_info" label="Информация о диагностике">
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item name="technical_inspection_found" label="Техосмотр">
                    <Input />
                </Form.Item>

                <Form.Item name="technical_inspection_found_info" label="Информация о техосмотре">
                    <TextArea rows={2} />
                </Form.Item>

                <Divider />
                <Title level={2}>Дополнительная информация (Не обязательно к заполнению)</Title>

                <Form.Item name="imported" label="Ввоз из-за границы">
                    <Input />
                </Form.Item>

                <Form.Item name="imported_info" label="Информация о ввозе">
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item name="insurance_found" label="Страховка ОСАГО">
                    <Input />
                </Form.Item>

                <Form.Item name="insurance_found_info" label="Информация о страховке">
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item name="recall_campaigns_found" label="Отзывные кампании">
                    <Input />
                </Form.Item>

                <Form.Item name="recall_campaigns_found_info" label="Информация об отзывных кампаниях">
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} size="large">
                        Сохранить изменения
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
