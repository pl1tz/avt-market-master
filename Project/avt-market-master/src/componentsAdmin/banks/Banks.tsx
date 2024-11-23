import React from 'react';
import { Table, Card, Button, Modal, Form, Input, Space, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useMessageContext } from '../../hoc/messageContext';
import { useBanks } from '../../hook/useBanks';
import type { ColumnsType } from 'antd/es/table';
import type { Bank, Program, CreateBankDto } from '../../interfaces/banks.interface';

const { Title } = Typography;

export const Banks: React.FC = () => {
    const { banks, loading, refreshBanks } = useBanks();
    const { showSuccess, showError } = useMessageContext();
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [editingBank, setEditingBank] = React.useState<Bank | null>(null);
    const [submitLoading, setSubmitLoading] = React.useState(false);

    const handleAdd = () => {
        setEditingBank(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record: Bank) => {
        setEditingBank(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/banks/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                showSuccess('Банк успешно удален');
                refreshBanks();
            } else {
                showError('Ошибка при удалении банка');
            }
        } catch (error) {
            showError('Ошибка при удалении банка');
        }
    };

    const handleSubmit = async (values: CreateBankDto) => {
        setSubmitLoading(true);
        try {
            const method = editingBank ? 'PATCH' : 'POST';
            const url = editingBank
                ? `${process.env.REACT_APP_BASE_URL}/banks/${editingBank.id}`
                : `${process.env.REACT_APP_BASE_URL}/banks`;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bank: values,
                }),
            });

            if (response.ok) {
                showSuccess(`Банк успешно ${editingBank ? 'обновлен' : 'добавлен'}`);
                setIsModalVisible(false);
                refreshBanks();
            } else {
                showError(`Ошибка при ${editingBank ? 'обновлении' : 'добавлении'} банка`);
            }
        } catch (error) {
            showError(`Ошибка при ${editingBank ? 'обновлении' : 'добавлении'} банка`);
        } finally {
            setSubmitLoading(false);
        }
    };

    const expandedRowRender = (record: Bank) => {
        const programColumns: ColumnsType<Program> = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 80,
            },
            {
                title: 'Название программы',
                dataIndex: 'program_name',
                key: 'program_name',
            },
            {
                title: 'Процентная ставка',
                dataIndex: 'interest_rate',
                key: 'interest_rate',
                render: (rate: number) => `${rate}%`,
            },
            {
                title: 'Дата создания',
                dataIndex: 'created_at',
                key: 'created_at',
                render: (date: string) => new Date(date).toLocaleDateString(),
            },
        ];

        return (
            <Card title="Программы банка" style={{ marginBottom: 16 }}>
                <Table columns={programColumns} dataSource={record.programs} rowKey="id" pagination={false} />
            </Card>
        );
    };

    const columns: ColumnsType<Bank> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Страна',
            dataIndex: 'country',
            key: 'country',
            sorter: (a, b) => a.country.localeCompare(b.country),
        },
        {
            title: 'Количество программ',
            key: 'programs_count',
            render: (_, record) => record.programs.length,
        },
        {
            title: 'Действия',
            key: 'actions',
            width: 120,
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <Card>
            <Title level={1}>Управление банками</Title>

            <div style={{ marginBottom: 16 }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                    Добавить банк
                </Button>
            </div>

            <Table
                dataSource={banks}
                columns={columns}
                rowKey="id"
                loading={loading}
                expandable={{
                    expandedRowRender,
                    expandRowByClick: true,
                }}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `Всего: ${total} записей`,
                }}
            />

            <Modal
                title={`${editingBank ? 'Редактировать' : 'Добавить'} банк`}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Название"
                        rules={[{ required: true, message: 'Введите название банка' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="country" label="Страна" rules={[{ required: true, message: 'Введите страну' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" loading={submitLoading}>
                                {editingBank ? 'Сохранить' : 'Добавить'}
                            </Button>
                            <Button onClick={() => setIsModalVisible(false)}>Отмена</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};
