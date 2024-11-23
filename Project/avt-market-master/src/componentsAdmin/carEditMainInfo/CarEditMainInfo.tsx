import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useMessageContext } from '../../hoc/messageContext';
import { Typography } from 'antd';
import { useCarEditMainInfo } from '../../hook/useCarEditMainInfo';

const { Title } = Typography;

export const CarEditMainInfo = (): React.JSX.Element => {
    const { showSuccess, showError } = useMessageContext();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [car, modelValues, generationValues] = useCarEditMainInfo();

    if (!car) {
        return <></>;
    }

    const onFinish = async (values: Record<string, string | number | boolean>) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cars/${car.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                showSuccess('Данные успешно обновлены');
            } else {
                throw new Error('Ошибка при обновлении');
            }
        } catch (error) {
            showError('Ошибка при обновлении данных');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Title level={1} style={{ marginBottom: '20px' }}>
                Редактирование основной информации
            </Title>
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    model_id: car.models.id,
                    generation_id: car.generations.id,
                    year: car.year,
                    price: car.price,
                    color_id: car.colors.id,
                    body_type_id: car.body_types.id,
                    engine_type_id: car.engine_name_types.id,
                    gearbox_type_id: car.gearbox_types.id,
                    drive_type_id: car.drive_types.id,
                    complectation_name: car.complectation_name,
                    description: car.description,
                    availability: car.online_view_available,
                }}
                onFinish={onFinish}
            >
                <Form.Item label="Бренд">
                    <Input
                        value={car.brands.name}
                        disabled
                        style={{ backgroundColor: '#fff', color: 'rgba(0, 0, 0, 0.85)' }}
                    />
                </Form.Item>

                <Form.Item name="model_id" label="Модель" rules={[{ required: true }]}>
                    <Select>
                        {modelValues.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="generation_id" label="Поколение" rules={[{ required: true }]}>
                    <Select>
                        {generationValues.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="year" label="Год" rules={[{ required: true }]}>
                    <Input type="number" min={1885} />
                </Form.Item>

                <Form.Item name="price" label="Цена" rules={[{ required: true }]}>
                    <Input type="number" min={0} />
                </Form.Item>

                <Form.Item name="color_id" label="Цвет" rules={[{ required: true }]}>
                    <Select>
                        {car.all_colors.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="body_type_id" label="Тип кузова" rules={[{ required: true }]}>
                    <Select>
                        {car.all_body_types.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="engine_type_id" label="Тип двигателя" rules={[{ required: true }]}>
                    <Select>
                        {car.all_engine_name_types.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="gearbox_type_id" label="Тип КПП" rules={[{ required: true }]}>
                    <Select>
                        {car.all_gearbox_types.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="drive_type_id" label="Тип привода" rules={[{ required: true }]}>
                    <Select>
                        {car.all_drive_types.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="complectation_name" label="Комплектация">
                    <Input placeholder="Название комплектации" />
                </Form.Item>

                <Form.Item name="description" label="Короткое описание">
                    <Input.TextArea rows={1} placeholder="Бренд, марка, год, мощность" maxLength={100} showCount />
                </Form.Item>

                <Form.Item name="availability" label="Наличие" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value={true}>В наличии</Select.Option>
                        <Select.Option value={false}>Нет в наличии</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Сохранить изменения
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
