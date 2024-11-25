import React from 'react';
import { Card, Typography, Tabs } from 'antd';
import { OrdersTab } from '../../componentsAdmin/ordersTab/OrdersTab';
import { OrderType } from '../../interfaces/orders.interface';

const { Title } = Typography;
const { TabPane } = Tabs;

export const Orders: React.FC = () => {
    return (
        <Card>
            <Title level={1}>Управление заявками</Title>
            <Tabs defaultActiveKey={OrderType.CREDIT}>
                <TabPane tab="Обратный звонок" key={OrderType.CALL_REQUEST}>
                    <OrdersTab type={OrderType.CALL_REQUEST} />
                </TabPane>
                <TabPane tab="Кредит" key={OrderType.CREDIT}>
                    <OrdersTab type={OrderType.CREDIT} />
                </TabPane>
                <TabPane tab="Рассрочка" key={OrderType.INSTALLMENT}>
                    <OrdersTab type={OrderType.INSTALLMENT} />
                </TabPane>
                <TabPane tab="Выкуп" key={OrderType.BUYOUT}>
                    <OrdersTab type={OrderType.BUYOUT} />
                </TabPane>
                <TabPane tab="Обмен" key={OrderType.EXCHANGE}>
                    <OrdersTab type={OrderType.EXCHANGE} />
                </TabPane>
            </Tabs>
        </Card>
    );
};
