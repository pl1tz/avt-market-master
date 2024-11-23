import React from 'react';
import { Card, Image, Button, Form, Input, Typography, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useCarEditImages } from '../../hook/useCarEditImages';
import { useMessageContext } from '../../hoc/messageContext';

const { Title } = Typography;

export const CarEditImages = () => {
    const { images, setImages, carId } = useCarEditImages();
    const [form] = Form.useForm();
    const { showSuccess, showError } = useMessageContext();

    const handleAdd = async (values: { url: string }) => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: { car_id: carId, url: values.url } }),
        });

        if (response.ok) {
            const res = await response.json();
            showSuccess('Изображение добавлено');
            setImages([...images, { car_id: carId, id: res.id, url: values.url }]);
            form.resetFields();
            console.log(res);
        } else {
            showError('Ошибка при добавлении изображения');
        }
    };

    const onDelete = async (imageId: number) => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/images/${imageId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            setImages(images.filter((image) => image.id !== imageId));
            showSuccess('Изображение успешно удалено');
        } else {
            showError('Ошибка при удалении изображения');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Title level={1} style={{ marginBottom: '20px' }}>
                Добавить/удалить изображения
            </Title>

            <Card style={{ marginBottom: '20px' }}>
                <Form form={form} onFinish={handleAdd} layout="inline" style={{ marginBottom: '20px' }}>
                    <Form.Item
                        name="url"
                        rules={[
                            { required: true, message: 'Введите URL изображения' },
                            { type: 'url', message: 'Введите корректный URL' },
                        ]}
                        style={{ flex: 1 }}
                    >
                        <Input placeholder="Введите URL изображения" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Добавить изображение
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <Row gutter={[16, 16]}>
                {images.map((image) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={image.id}>
                        <Card
                            hoverable
                            cover={
                                <div style={{ height: '200px', overflow: 'hidden' }}>
                                    <Image
                                        alt="car"
                                        src={image.url}
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                        }}
                                        preview={{
                                            mask: 'Просмотр',
                                        }}
                                    />
                                </div>
                            }
                            actions={[
                                <Button
                                    key="delete"
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => onDelete(image.id)}
                                >
                                    Удалить
                                </Button>,
                            ]}
                        >
                            <Card.Meta description={`ID: ${image.id}`} />
                        </Card>
                    </Col>
                ))}
            </Row>

            {images.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Typography.Text type="secondary">Нет доступных изображений</Typography.Text>
                </div>
            )}
        </div>
    );
};
