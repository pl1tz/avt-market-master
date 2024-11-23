import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { customFetch } from '../../helpers/customFetch';
import type { ContactsType } from '../../interfaces/interface';

const { Title } = Typography;

interface ContactsForm {
    phone: string;
    auto_address: string;
    mode_operation: string;
}

export const Contacts = (): React.JSX.Element => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState<ContactsType | null>(null);

    React.useEffect(() => {
        (async () => {
            const response = await customFetch<ContactsType>({
                url: 'contacts',
                method: 'GET',
            });

            setContacts(response);
        })();
    }, []);

    const onFinish = async (values: ContactsForm) => {
        if (contacts) {
            setLoading(true);

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/contacts/${contacts.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contact: {
                        ...values,
                    },
                }),
            });

            if (response.ok) {
                message.success('Контактные данные успешно обновлены');
            } else {
                throw new Error('Ошибка при обновлении');
            }

            setLoading(false);
        }
    };

    if (!contacts) return <></>;

    return (
        <div style={{ padding: '20px' }}>
            <Title level={1} style={{ marginBottom: '20px' }}>
                Редактирование контактной информации
            </Title>
            <Form form={form} layout="vertical" onFinish={onFinish} initialValues={contacts}>
                <Form.Item
                    name="phone"
                    label="Номер телефона"
                    rules={[{ required: true, message: 'Введите номер телефона' }]}
                >
                    <Input placeholder="+7 (999) 999-99-99" />
                </Form.Item>

                <Form.Item name="auto_address" label="Адрес" rules={[{ required: true, message: 'Введите адрес' }]}>
                    <Input.TextArea rows={2} placeholder="Введите адрес" />
                </Form.Item>

                <Form.Item
                    name="mode_operation"
                    label="Время работы"
                    rules={[{ required: true, message: 'Укажите время работы' }]}
                >
                    <Input.TextArea rows={2} placeholder="Введите время работы" />
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
