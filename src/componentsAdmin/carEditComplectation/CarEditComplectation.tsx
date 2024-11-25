import React, { useState } from 'react';
import { Table, Form, Select, Button, Typography, Space, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useMessageContext } from '../../hoc/messageContext';
import { useCarEditComplectation } from '../../hook/useCarEditComplectation';
import type { ColumnsType } from 'antd/es/table';

interface FlatDataComplectation {
    key: number;
    category: string;
    feature: string;
}

const { Title } = Typography;

export const CarEditComplectation = () => {
    const { complectation, carId } = useCarEditComplectation();
    const [form] = Form.useForm();
    const [flatData, setFlatData] = useState<FlatDataComplectation[]>([]);
    const { showSuccess, showError } = useMessageContext();

    React.useEffect(() => {
        if (complectation?.extras.length) {
            setFlatData(
                complectation.extras.map((item) => ({
                    key: item.extra_id,
                    category: item.category_name,
                    feature: item.extra_name_name,
                })),
            );
        }
    }, [complectation]);

    if (!complectation) return <></>;

    const handleDelete = async (key: number) => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL!}/extras/${key}`, {
            method: 'DELETE',
            body: JSON.stringify({ extra_id: key }),
        });

        if (response.ok) {
            showSuccess('Характеристика успешно удалена');
        } else {
            showError('Ошибка при удалении характеристики');
        }
    };

    const columns: ColumnsType<FlatDataComplectation> = [
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'category',
            width: '30%',
            sorter: (a, b) => a.category.localeCompare(b.category),
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: 'Характеристика',
            dataIndex: 'feature',
            key: 'feature',
            width: '50%',
        },
        {
            title: 'Действия',
            key: 'action',
            width: '20%',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Удалить характеристику?"
                        description="Вы уверены, что хотите удалить эту характеристику?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Удалить
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const onFinish = async (values: { category_id: number; extra_name_id: number }) => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL!}/extras`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ extra: { ...values, car_id: carId } }),
        });

        if (response.ok) {
            showSuccess('Характеристика успешно добавлена');
        } else {
            showError('Ошибка при добавлении характеристики');
        }
    };

    return (
        <div>
            <Title level={1} style={{ marginBottom: '20px' }}>
                Комплектация автомобиля
            </Title>

            <Table
                columns={columns}
                dataSource={flatData}
                bordered
                size="middle"
                pagination={{
                    pageSize: 10,
                    showSizeChanger: false,
                    showTotal: (total) => `Всего ${total} записей`,
                }}
            />

            <Title level={3} style={{ marginTop: '20px' }}>
                Добавить характеристику
            </Title>
            <Form form={form} layout="inline" onFinish={onFinish}>
                <Form.Item name="category_id" rules={[{ required: true, message: 'Выберите категорию' }]}>
                    <Select
                        placeholder="Выберите категорию"
                        style={{ width: 200 }}
                        showSearch
                        optionFilterProp="children"
                    >
                        {complectation.all_categories.map((category) => (
                            <Select.Option key={category.id} value={category.id}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="extra_name_id" rules={[{ required: true, message: 'Выберите характеристику' }]}>
                    <Select
                        placeholder="Выберите характеристику"
                        style={{ width: 200 }}
                        showSearch
                        optionFilterProp="children"
                    >
                        {complectation.all_extra_names
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((extra) => (
                                <Select.Option key={extra.id} value={extra.id}>
                                    {extra.name}
                                </Select.Option>
                            ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
