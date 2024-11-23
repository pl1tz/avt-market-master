import React from 'react';
import { Table, Card, Button, Modal, Form, Input, Space, Typography, Select, InputNumber } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useMessageContext } from '../../hoc/messageContext';
import { usePrograms } from '../../hook/usePrograms';
import { useBanks } from '../../hook/useBanks';
import type { ColumnsType } from 'antd/es/table';
import type { Program, CreateProgramDto } from '../../interfaces/banks.interface';

const { Title } = Typography;

export const Programs: React.FC = () => {
    const { programs, loading, refreshPrograms } = usePrograms();
    const { banks } = useBanks(); // Используем существующий хук для получения банков
    const { showSuccess, showError } = useMessageContext();
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [editingProgram, setEditingProgram] = React.useState<Program | null>(null);
    const [submitLoading, setSubmitLoading] = React.useState(false);

    const handleAdd = () => {
        setEditingProgram(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record: Program) => {
        setEditingProgram(record);
        form.setFieldsValue({
            bank_id: record.bank_id,
            program_name: record.program_name,
            interest_rate: record.interest_rate,
        });
        setIsModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/programs/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                showSuccess('Программа успешно удалена');
                refreshPrograms();
            } else {
                showError('Ошибка при удалении программы');
            }
        } catch (error) {
            showError('Ошибка при удалении программы');
        }
    };

    const handleSubmit = async (values: CreateProgramDto) => {
        setSubmitLoading(true);
        try {
            const method = editingProgram ? 'PATCH' : 'POST';
            const url = editingProgram
                ? `${process.env.REACT_APP_BASE_URL}/programs/${editingProgram.id}`
                : `${process.env.REACT_APP_BASE_URL}/programs`;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    program: values,
                }),
            });

            if (response.ok) {
                showSuccess(`Программа успешно ${editingProgram ? 'обновлена' : 'добавлена'}`);
                setIsModalVisible(false);
                refreshPrograms();
            } else {
                showError(`Ошибка при ${editingProgram ? 'обно��лении' : 'добавлении'} программы`);
            }
        } catch (error) {
            showError(`Ошибка при ${editingProgram ? 'обновлении' : 'добавлении'} программы`);
        } finally {
            setSubmitLoading(false);
        }
    };

    const columns: ColumnsType<Program> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Банк',
            dataIndex: ['bank', 'name'],
            key: 'bank_name',
            sorter: (a, b) => a.program_name.localeCompare(b.program_name),
        },
        {
            title: 'Название программы',
            dataIndex: 'program_name',
            key: 'program_name',
            sorter: (a, b) => a.program_name.localeCompare(b.program_name),
        },
        {
            title: 'Процентная ставка',
            dataIndex: 'interest_rate',
            key: 'interest_rate',
            render: (rate: number) => `${rate}%`,
            sorter: (a, b) => a.interest_rate - b.interest_rate,
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
            <Title level={1}>Управление программами</Title>

            <div style={{ marginBottom: 16 }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                    Добавить программу
                </Button>
            </div>

            <Table
                dataSource={programs}
                columns={columns}
                rowKey="id"
                loading={loading}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `Всего: ${total} записей`,
                }}
            />

            <Modal
                title={`${editingProgram ? 'Редактировать' : 'Добавить'} программу`}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item name="bank_id" label="Банк" rules={[{ required: true, message: 'Выберите банк' }]}>
                        <Select showSearch placeholder="Выберите банк" optionFilterProp="children">
                            {banks.map((bank) => (
                                <Select.Option key={bank.id} value={bank.id}>
                                    {bank.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="program_name"
                        label="Название программы"
                        rules={[{ required: true, message: 'Введите название программы' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="interest_rate"
                        label="Процентная ставка"
                        rules={[{ required: true, message: 'Введите процентную ставку' }]}
                    >
                        <InputNumber
                            min={0}
                            max={100}
                            step={0.1}
                            formatter={(value) => `${value}%`}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" loading={submitLoading}>
                                {editingProgram ? 'Сохранить' : 'Добавить'}
                            </Button>
                            <Button onClick={() => setIsModalVisible(false)}>Отмена</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};
