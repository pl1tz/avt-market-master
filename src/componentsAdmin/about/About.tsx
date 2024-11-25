import React, { useEffect } from 'react';
import { Typography, Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import { aboutSelector } from '../../redux/selectors';
import { useMessageContext } from '../../hoc/messageContext';

const { Title } = Typography;

export const About = (): React.JSX.Element => {
    const about = useSelector(aboutSelector).about;
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);
    const { showSuccess, showError } = useMessageContext();

    useEffect(() => {
        if (about?.length) {
            form.setFieldsValue({
                paragraph_1: about[0]?.description,
                paragraph_2: about[1]?.description,
                paragraph_3: about[2]?.description,
            });
        }
    }, [about, form]);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/about_companies/update_multiple`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    about_companies: [
                        {
                            id: 1,
                            description: values.paragraph_1,
                        },
                        {
                            id: 2,
                            description: values.paragraph_2,
                        },
                        {
                            id: 3,
                            description: values.paragraph_3,
                        },
                    ],
                }),
            });

            console.log(`url`, `${process.env.REACT_APP_BASE_URL}/about_companies`);
            console.log(
                `value`,
                JSON.stringify({
                    about_companies: [
                        {
                            id: 1,
                            description: values.paragraph_1,
                        },
                        {
                            id: 2,
                            description: values.paragraph_2,
                        },
                        {
                            id: 3,
                            description: values.paragraph_3,
                        },
                    ],
                }),
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            showSuccess('Изменения сохранены');
        } catch (error) {
            console.error('Error updating about:', error);
            showError('Ошибка при сохранении изменений');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Title level={1}>О нас</Title>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                initialValues={{
                    paragraph_1: about[0]?.description,
                    paragraph_2: about[1]?.description,
                    paragraph_3: about[2]?.description,
                }}
            >
                <Form.Item name="paragraph_1" label="Параграф 1" rules={[{ required: true, message: 'Введите текст' }]}>
                    <Input.TextArea rows={6} placeholder="Введите текст" />
                </Form.Item>
                <Form.Item name="paragraph_2" label="Параграф 2" rules={[{ required: true, message: 'Введите текст' }]}>
                    <Input.TextArea rows={6} placeholder="Введите текст" />
                </Form.Item>
                <Form.Item name="paragraph_3" label="Параграф 3" rules={[{ required: true, message: 'Введите текст' }]}>
                    <Input.TextArea rows={3} placeholder="Введите текст" />
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
