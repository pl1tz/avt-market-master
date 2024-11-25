import React from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useMessageContext } from '../../hoc/messageContext';
import type { ColumnsType } from 'antd/es/table';
import type { SelectElement, SelectElementWithBrandId } from '../../hook/useLoadCategories';
import type { EngineCapacityElement, EnginePowerElement, BaseEditElement } from '../../interfaces/editCar.interface';

type ItemType =
    | SelectElement
    | SelectElementWithBrandId
    | Omit<SelectElement, 'model_id'>
    | EngineCapacityElement
    | EnginePowerElement
    | BaseEditElement;

interface CategoryManagerProps {
    items: ItemType[];
    endpoint: string;
    title: string;
    onUpdate: () => void;
    brands?: Array<Omit<SelectElement, 'model_id'>>;
    models?: SelectElementWithBrandId[];
    dataKey: string;
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({
    items,
    endpoint,
    title,
    onUpdate,
    brands,
    models,
    dataKey,
}) => {
    const [form] = Form.useForm();
    const { showSuccess, showError } = useMessageContext();
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [editingItem, setEditingItem] = React.useState<ItemType | null>(null);
    const [loading, setLoading] = React.useState(false);

    const isEngineCapacity = (item: ItemType): item is EngineCapacityElement => 'capacity' in item;
    const isEnginePower = (item: ItemType): item is EnginePowerElement => 'power' in item;

    const isModel = endpoint === 'models';
    const isGeneration = endpoint === 'generations';

    const handleAdd = () => {
        setEditingItem(null);
        form.resetFields();
        if (endpoint === 'gearbox_types') {
            form.setFieldsValue({
                name: '',
                abbreviation: '',
            });
        }
        setIsModalVisible(true);
    };

    const handleEdit = (record: ItemType) => {
        setEditingItem(record);
        if (isEngineCapacity(record)) {
            form.setFieldsValue({ capacity: record.capacity });
        } else if (isEnginePower(record)) {
            form.setFieldsValue({ power: record.power });
        } else if ('abbreviation' in record) {
            form.setFieldsValue({
                name: record.name,
                abbreviation: record.abbreviation,
            });
        } else {
            form.setFieldsValue({ name: record.name });
        }
        setIsModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${endpoint}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                showSuccess('Успешно удалено');
                onUpdate();
            } else {
                showError('Ошибка при удалении');
            }
        } catch (error) {
            showError('Ошибка при удалении');
        }
    };

    const handleSubmit = async (values: {
        name?: string;
        capacity?: number;
        power?: number;
        brand_id?: number;
        model_id?: number;
        abbreviation?: string;
    }) => {
        setLoading(true);
        try {
            const method = editingItem ? 'PATCH' : 'POST';
            const url = editingItem
                ? `${process.env.REACT_APP_BASE_URL}/${endpoint}/${editingItem.id}`
                : `${process.env.REACT_APP_BASE_URL}/${endpoint}`;

            if (endpoint === 'gearbox_types' && (!values.name || !values.abbreviation)) {
                showError('Необходимо заполнить название и аббревиатуру');
                return;
            }

            const payload = {
                [dataKey]: {
                    ...values,
                    ...(endpoint === 'gearbox_types' && {
                        name: values.name,
                        abbreviation: values.abbreviation,
                    }),
                },
            };

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                showSuccess(`${title} успешно ${editingItem ? 'обновлен' : 'добавлен'}`);
                setIsModalVisible(false);
                onUpdate();
            } else {
                showError(`Ошибка при ${editingItem ? 'обновлении' : 'добавлении'}`);
            }
        } catch (error) {
            showError(`Ошибка при ${editingItem ? 'обновлении' : 'добавлении'}`);
        } finally {
            setLoading(false);
        }
    };

    const isModelRecord = (record: ItemType): record is SelectElementWithBrandId => 'brand_id' in record;

    const isGenerationRecord = (record: ItemType): record is SelectElement => 'model_id' in record;

    const getColumns = (): ColumnsType<ItemType> => {
        const baseColumns: ColumnsType<ItemType> = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 80,
                sorter: (a, b) => a.id - b.id,
            },
        ];

        if (items.length > 0) {
            if (isEngineCapacity(items[0])) {
                baseColumns.push({
                    title: 'Объем',
                    dataIndex: 'capacity',
                    key: 'capacity',
                    sorter: (a: ItemType, b: ItemType) => {
                        if (isEngineCapacity(a) && isEngineCapacity(b)) {
                            return a.capacity - b.capacity;
                        }
                        return 0;
                    },
                });
            } else if (isEnginePower(items[0])) {
                baseColumns.push({
                    title: 'Мощность',
                    dataIndex: 'power',
                    key: 'power',
                    sorter: (a: ItemType, b: ItemType) => {
                        if (isEnginePower(a) && isEnginePower(b)) {
                            return a.power - b.power;
                        }
                        return 0;
                    },
                });
            } else {
                baseColumns.push({
                    title: 'Название',
                    dataIndex: 'name',
                    key: 'name',
                    sorter: (a: ItemType, b: ItemType) => {
                        const nameA = 'name' in a ? a.name : '';
                        const nameB = 'name' in b ? b.name : '';
                        return nameA.localeCompare(nameB);
                    },
                });

                if (endpoint === 'gearbox_types') {
                    baseColumns.push({
                        title: 'Аббревиатура',
                        dataIndex: 'abbreviation',
                        key: 'abbreviation',
                    });
                }

                if (isModel && brands) {
                    baseColumns.push({
                        title: 'Бренд',
                        key: 'brand',
                        render: (_: any, record: ItemType) => {
                            if (isModelRecord(record)) {
                                const brand = brands.find((b) => b.id === record.brand_id);
                                return brand?.name || 'Неизвестно';
                            }
                            return 'Неизвестно';
                        },
                    });
                }

                if (isGeneration && models) {
                    baseColumns.push({
                        title: 'Модель',
                        key: 'model',
                        render: (_: any, record: ItemType) => {
                            if (isGenerationRecord(record)) {
                                const model = models.find((m) => m.id === record.model_id);
                                return model?.name || 'Неизвестно';
                            }
                            return 'Неизвестно';
                        },
                    });
                }
            }
        }

        baseColumns.push({
            title: 'Действия',
            key: 'actions',
            width: 120,
            render: (_: any, record: ItemType) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        });

        return baseColumns;
    };

    const getFormItems = () => {
        if (!editingItem && endpoint === 'gearbox_types') {
            return (
                <>
                    <Form.Item name="name" label="Название" rules={[{ required: true, message: 'Введите название' }]}>
                        <Input placeholder="Например: Автоматическая" />
                    </Form.Item>
                    <Form.Item
                        name="abbreviation"
                        label="Аббревиатура"
                        rules={[{ required: true, message: 'Введите аббревиатуру' }]}
                        tooltip="Сокращенное название коробки передач"
                    >
                        <Input placeholder="Например: АКПП" />
                    </Form.Item>
                </>
            );
        }

        if (items.length > 0) {
            if (isEngineCapacity(items[0])) {
                return (
                    <Form.Item
                        name="capacity"
                        label="Объем двигателя"
                        rules={[{ required: true, message: 'Введите объем двигателя' }]}
                    >
                        <InputNumber min={0} step={0.1} style={{ width: '100%' }} />
                    </Form.Item>
                );
            } else if (isEnginePower(items[0])) {
                return (
                    <Form.Item
                        name="power"
                        label="Мощность двигателя"
                        rules={[{ required: true, message: 'Введите мощность двигателя' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                );
            }
        }

        return (
            <>
                <Form.Item name="name" label="Название" rules={[{ required: true, message: 'Введите название' }]}>
                    <Input />
                </Form.Item>

                {endpoint === 'gearbox_types' && (
                    <Form.Item
                        name="abbreviation"
                        label="Аббревиатура"
                        rules={[{ required: true, message: 'Введите аббревиатуру' }]}
                        tooltip="Сокращенное название коробки передач"
                    >
                        <Input placeholder="Например: АКПП, МКПП, РКП" />
                    </Form.Item>
                )}

                {isModel && brands && (
                    <Form.Item name="brand_id" label="Бренд" rules={[{ required: true, message: 'Выберите бренд' }]}>
                        <Select showSearch optionFilterProp="children" placeholder="Выберите бренд">
                            {brands.map((brand) => (
                                <Select.Option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}

                {isGeneration && models && (
                    <Form.Item name="model_id" label="Модель" rules={[{ required: true, message: 'Выберите модель' }]}>
                        <Select showSearch optionFilterProp="children" placeholder="Выберите модель">
                            {models.map((model) => (
                                <Select.Option key={model.id} value={model.id}>
                                    {model.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}
            </>
        );
    };

    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                    Добавить {title.toLowerCase()}
                </Button>
            </div>

            <Table dataSource={items} columns={getColumns()} rowKey="id" pagination={{ pageSize: 10 }} />

            <Modal
                title={`${editingItem ? 'Рдактировать' : 'Добавить'} ${title.toLowerCase()}`}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    {getFormItems()}
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {editingItem ? 'Сохранить' : 'Добавить'}
                            </Button>
                            <Button onClick={() => setIsModalVisible(false)}>Отмена</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
