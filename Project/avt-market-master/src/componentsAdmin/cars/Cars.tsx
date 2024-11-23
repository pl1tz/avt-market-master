import React from 'react';
import { Table, Space, Select, Typography } from 'antd';
import { useCarsFilterAdmin } from '../../hook/useCarsFilterAdmin';
import { useMessageContext } from '../../hoc/messageContext';
import { Link } from 'react-router-dom';
import type { TableProps } from 'antd';
import type { AutoCard } from '../../interfaces/cars.interface';

const { Title } = Typography;

export const Cars = (): React.JSX.Element => {
    const { cars, loading, filters, onFilterChange, setCars } = useCarsFilterAdmin();
    const { showError, showSuccess } = useMessageContext();

    const deleteCar = async (id: number) => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL!}/cars/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
        });

        if (response.ok) {
            showSuccess('Автомобиль успешно удален');
            setCars(cars.filter((car) => car.id !== id));
        } else {
            showError('Ошибка при удалении автомобиля');
        }
    };

    const columns: TableProps<AutoCard>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Бренд',
            dataIndex: ['brand', 'name'],
            key: 'brand',
        },
        {
            title: 'Модель',
            dataIndex: ['model', 'name'],
            key: 'model',
            sorter: (a, b) => a.model.name.localeCompare(b.model.name),
        },
        {
            title: 'Поколение',
            dataIndex: ['generation', 'name'],
            key: 'generation',
        },
        {
            title: 'Год',
            dataIndex: 'year',
            key: 'year',
            sorter: (a, b) => a.year - b.year,
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => Number(a.price) - Number(b.price),
            render: (price: string) => `${parseInt(price).toLocaleString()} ₽`,
        },
        {
            title: 'Действия',
            key: 'action',
            render: (_, record: AutoCard) => (
                <Space size="middle">
                    <Link to={`/admin/car/${record.id}`} state={{ car: record }}>
                        Редактировать
                    </Link>
                    <a onClick={() => deleteCar(record.id)}>Удалить</a>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Title level={1}>Поиск автомобиля</Title>
            <Space style={{ marginBottom: 24 }}>
                <Select
                    style={{ width: 200 }}
                    placeholder="Выберите бренд"
                    value={filters.brand_name.value}
                    onChange={(value) => onFilterChange('brand_name', value)}
                    options={filters.brand_name.selectItems.map((brand) => ({
                        label: brand,
                        value: brand,
                    }))}
                />

                <Select
                    style={{ width: 200 }}
                    placeholder="Выберите модель"
                    value={filters.model_name.value}
                    onChange={(value) => onFilterChange('model_name', value)}
                    disabled={filters.brand_name.value === 'Все бренды'}
                    options={filters.model_name.selectItems.map((model) => ({
                        label: model,
                        value: model,
                    }))}
                />

                <Select
                    style={{ width: 200 }}
                    placeholder="Выберите поколение"
                    value={filters.generation_name.value}
                    onChange={(value) => onFilterChange('generation_name', value)}
                    disabled={filters.model_name.value === 'Все модели'}
                    options={filters.generation_name.selectItems.map((generation) => ({
                        label: generation,
                        value: generation,
                    }))}
                />
            </Space>

            <Table
                columns={columns}
                dataSource={cars}
                loading={loading}
                rowKey="id"
                pagination={{
                    total: cars.length,
                    pageSize: 18,
                    showSizeChanger: false,
                }}
            />
        </div>
    );
};
