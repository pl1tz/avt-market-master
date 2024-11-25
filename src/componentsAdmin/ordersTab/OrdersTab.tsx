import React from 'react';
import { Table, Tag, Select, Button, Popconfirm, Typography, Tabs, Descriptions } from 'antd';
import { useOrders } from '../../hook/useOrders';
import { useMessageContext } from '../../hoc/messageContext';
import { OrderType, BaseOrder } from '../../interfaces/orders.interface';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined } from '@ant-design/icons';

const statusColors = {
    Новая: 'blue',
    'В обработке': 'orange',
    Одобрена: 'green',
    Отклонена: 'red',
    Завершена: 'gray',
};

interface OrdersTabProps {
    type: OrderType;
}

const { Title } = Typography;

const orderTypeNames = {
    [OrderType.CREDIT]: 'Заявки на кредит',
    [OrderType.INSTALLMENT]: 'Заявки на рассрочку',
    [OrderType.CALL_REQUEST]: 'Заявки на обратный звонок',
    [OrderType.BUYOUT]: 'Заявки на выкуп автомобиля',
    [OrderType.EXCHANGE]: 'Заявки на обмен автомобиля',
};

export const OrdersTab: React.FC<OrdersTabProps> = ({ type }) => {
    const { orders, statuses, loading, refreshOrders, updateOrderStatus, deleteOrder } = useOrders(type);
    const { showSuccess, showError } = useMessageContext();

    const sortedOrders = [...orders].reverse();

    const handleStatusChange = async (orderId: number, newStatusId: number) => {
        const success = await updateOrderStatus(orderId, newStatusId);
        if (success) {
            showSuccess('Статус заявки успешно обновлен');
            refreshOrders();
        } else {
            showError('Ошибка при обновлении статуса');
        }
    };

    const handleDeleteOrder = async (orderId: number) => {
        try {
            await deleteOrder(orderId);
            showSuccess('Заявка успешно удалена');
            refreshOrders();
        } catch (error) {
            showError('Ошибка при удалении заявки');
        }
    };

    const getTypeSpecificColumns = (): ColumnsType<BaseOrder> => {
        switch (type) {
            case OrderType.CREDIT:
                return [
                    {
                        title: 'Срок кредита',
                        dataIndex: ['credit', 'credit_term'],
                        key: 'credit_term',
                        render: (_: unknown, record: any) => `${record.credit?.credit_term} мес.`,
                    },
                    {
                        title: 'Первый взнос',
                        dataIndex: ['credit', 'initial_contribution'],
                        key: 'initial_contribution',
                        render: (_: unknown, record: any) =>
                            `${Number(record.credit?.initial_contribution).toLocaleString()} ₽`,
                    },
                ];
            case OrderType.INSTALLMENT:
                return [
                    {
                        title: 'Срок рассрочки',
                        dataIndex: ['installment', 'credit_term'],
                        key: 'credit_term',
                        render: (_: unknown, record: any) => `${record.installment?.credit_term} мес.`,
                    },
                    {
                        title: 'Первый взнос',
                        dataIndex: ['installment', 'initial_contribution'],
                        key: 'initial_contribution',
                        render: (_: unknown, record: any) =>
                            `${Number(record.installment?.initial_contribution).toLocaleString()} ₽`,
                    },
                ];
            case OrderType.CALL_REQUEST:
                return [
                    {
                        title: 'Предпочтительное время',
                        dataIndex: ['call_request', 'preferred_time'],
                        key: 'preferred_time',
                    },
                ];
            case OrderType.BUYOUT:
                return [
                    {
                        title: 'Марка',
                        dataIndex: ['buyout', 'brand'],
                        key: 'brand',
                        render: (_: unknown, record: any) => record.buyout?.brand,
                    },
                    {
                        title: 'Модель',
                        dataIndex: ['buyout', 'model'],
                        key: 'model',
                        render: (_: unknown, record: any) => record.buyout?.model,
                    },
                    {
                        title: 'Год выпуска',
                        dataIndex: ['buyout', 'year'],
                        key: 'year',
                        render: (_: unknown, record: any) => record.buyout?.year,
                    },
                    {
                        title: 'Пробег',
                        dataIndex: ['buyout', 'mileage'],
                        key: 'mileage',
                        render: (_: unknown, record: any) => `${Number(record.buyout?.mileage).toLocaleString()} км`,
                    },
                ];
            case OrderType.EXCHANGE:
                return [
                    {
                        title: 'Автомобиль клиента',
                        dataIndex: ['exchange', 'customer_car'],
                        key: 'customer_car',
                    },
                    {
                        title: 'Срок кредита',
                        dataIndex: ['exchange', 'credit_term'],
                        key: 'credit_term',
                        render: (term: number) => `${term} мес.`,
                    },
                    {
                        title: 'Первый взнос',
                        dataIndex: ['exchange', 'initial_contribution'],
                        key: 'initial_contribution',
                        render: (value: string) => `${Number(value).toLocaleString()} ₽`,
                    },
                    {
                        title: 'Выбранный автомобиль',
                        dataIndex: ['exchange', 'car_details'],
                        key: 'car',
                        render: (carDetails: any) =>
                            carDetails
                                ? `${carDetails.brand.name} ${carDetails.model.name} ${carDetails.year}`
                                : 'Не выбран',
                    },
                ];
            default:
                return [];
        }
    };

    const expandedRowRender = (record: any) => {
        if (type === OrderType.INSTALLMENT) {
            const carDetails = record[type]?.car_details;
            return (
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Информация об автомобиле">
                        {carDetails ? (
                            <>
                                {`${carDetails.brand.name} ${carDetails.model.name} ${carDetails.generation.name} ${carDetails.year}`}
                                <br />
                                {`Комплектация: ${carDetails.complectation_name}`}
                                <br />
                                {`Двигатель: ${carDetails.engine_capacity_type.capacity}л. ${carDetails.engine_name_type.name} (${carDetails.engine_power_type.power} л.с.)`}
                                <br />
                                {`КПП: ${carDetails.gearbox_type.name}`}
                                <br />
                                {`Привод: ${carDetails.drive_type.name}`}
                                <br />
                                {`Цвет: ${carDetails.color.name}`}
                                <br />
                                {`Цена: ${Number(carDetails.price).toLocaleString()} ₽`}
                            </>
                        ) : (
                            'Автомобиль не выбран'
                        )}
                    </Descriptions.Item>
                </Descriptions>
            );
        }

        if (type === OrderType.EXCHANGE) {
            const carDetails = record[type]?.car_details;
            return (
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Информация о желаемом автомобиле">
                        {carDetails ? (
                            <>
                                {`${carDetails.brand.name} ${carDetails.model.name} ${carDetails.generation.name} ${carDetails.year}`}
                                <br />
                                {`Комплектация: ${carDetails.complectation_name}`}
                                <br />
                                {`Двигатель: ${carDetails.engine_capacity_type.capacity}л. ${carDetails.engine_name_type.name} (${carDetails.engine_power_type.power} л.с.)`}
                                <br />
                                {`КПП: ${carDetails.gearbox_type.name}`}
                                <br />
                                {`Привод: ${carDetails.drive_type.name}`}
                                <br />
                                {`Цвет: ${carDetails.color.name}`}
                                <br />
                                {`Цена: ${Number(carDetails.price).toLocaleString()} ₽`}
                            </>
                        ) : (
                            'Автомобиль не выбран'
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Автомобиль клиента">
                        {record[type]?.customer_car || 'Не указан'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Первоначальный взнос">
                        {record[type]?.initial_contribution
                            ? `${Number(record[type].initial_contribution).toLocaleString()} ₽`
                            : 'Не указан'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Срок кредита">
                        {record[type]?.credit_term ? `${record[type].credit_term} мес.` : 'Не указан'}
                    </Descriptions.Item>
                </Descriptions>
            );
        }

        const carDetails = record[type]?.car_details;
        const bank = record.bank;
        const program = record.program;

        return (
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Информация об автомобиле">
                    {carDetails ? (
                        <>
                            {`${carDetails.brand.name} ${carDetails.model.name} ${carDetails.generation.name} ${carDetails.year}`}
                            <br />
                            {`Комплектация: ${carDetails.complectation_name}`}
                            <br />
                            {`Двигатель: ${carDetails.engine_capacity_type.capacity}л. ${carDetails.engine_name_type.name} (${carDetails.engine_power_type.power} л.с.)`}
                            <br />
                            {`КПП: ${carDetails.gearbox_type.name}`}
                            <br />
                            {`Привод: ${carDetails.drive_type.name}`}
                            <br />
                            {`Цвет: ${carDetails.color.name}`}
                            <br />
                            {`Цена: ${Number(carDetails.price).toLocaleString()} ₽`}
                        </>
                    ) : (
                        'Автомобиль не выбран'
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Банк">{bank ? bank.name : 'Банк не выбран'}</Descriptions.Item>
                <Descriptions.Item label="Программа">
                    {program ? program.name : 'Программа не выбрана'}
                </Descriptions.Item>
            </Descriptions>
        );
    };

    const getColumns = (): ColumnsType<BaseOrder> => [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            sorter: (a, b) => b.id - a.id,
        },
        {
            title: 'Имя клиента',
            dataIndex: [type, 'name'],
            key: 'name',
            render: (_: unknown, record: any) => record[type]?.name,
        },
        {
            title: 'Телефон',
            dataIndex: [type, 'phone'],
            key: 'phone',
            render: (_: unknown, record: any) => record[type]?.phone,
        },
        ...getTypeSpecificColumns(),
        {
            title: 'Стаус',
            key: 'status',
            render: (_: unknown, record: any) => (
                <Select
                    value={record.order_status.id}
                    onChange={(value) => handleStatusChange(record.id, value)}
                    style={{ width: 150 }}
                >
                    {statuses.map((status) => (
                        <Select.Option key={status.id} value={status.id}>
                            <Tag color={statusColors[status.name as keyof typeof statusColors]}>{status.name}</Tag>
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            title: 'Действия',
            key: 'actions',
            width: 100,
            render: (_: unknown, record: any) => (
                <Popconfirm
                    title="Удалить заявку?"
                    description="Это действие нельзя отменить"
                    onConfirm={() => handleDeleteOrder(record.id)}
                    okText="Да"
                    cancelText="Нет"
                >
                    <Button type="link" danger icon={<DeleteOutlined />} />
                </Popconfirm>
            ),
        },
    ];

    return (
        <>
            <Title level={3} style={{ marginBottom: 24 }}>
                {orderTypeNames[type]}
            </Title>
            <Table
                dataSource={sortedOrders}
                columns={getColumns()}
                rowKey="id"
                loading={loading}
                expandable={{
                    expandedRowRender,
                    rowExpandable: () => [OrderType.CREDIT, OrderType.INSTALLMENT, OrderType.EXCHANGE].includes(type),
                }}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `Всего: ${total} записей`,
                    defaultCurrent: 1,
                }}
            />
        </>
    );
};

const tabItems = [
    {
        key: OrderType.CREDIT,
        label: 'Кредиты',
        children: <OrdersTab type={OrderType.CREDIT} />,
    },
    {
        key: OrderType.INSTALLMENT,
        label: 'Рассрочка',
        children: <OrdersTab type={OrderType.INSTALLMENT} />,
    },
    {
        key: OrderType.CALL_REQUEST,
        label: 'Обратные звонки',
        children: <OrdersTab type={OrderType.CALL_REQUEST} />,
    },
    {
        key: OrderType.BUYOUT,
        label: 'Выкуп авто',
        children: <OrdersTab type={OrderType.BUYOUT} />,
    },
    {
        key: OrderType.EXCHANGE,
        label: 'Обмен авто',
        children: <OrdersTab type={OrderType.EXCHANGE} />,
    },
];

export const OrdersTabContainer: React.FC = () => {
    return <Tabs items={tabItems} />;
};
