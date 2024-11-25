import { useState, useEffect, useCallback } from 'react';
import { OrderStatus, OrderType } from '../interfaces/orders.interface';

export const useOrders = (orderType: OrderType) => {
    const [orders, setOrders] = useState<any[]>([]);
    const [statuses, setStatuses] = useState<OrderStatus[]>([]);
    const [loading, setLoading] = useState(false);

    const getEndpoint = () => {
        switch (orderType) {
            case OrderType.CREDIT:
                return 'orders_credits';
            case OrderType.BUYOUT:
                return 'orders_buyouts';
            case OrderType.EXCHANGE:
                return 'orders_exchanges';
            case OrderType.INSTALLMENT:
                return 'orders_installments';
            case OrderType.CALL_REQUEST:
                return 'orders_call_requests';
            default:
                return '';
        }
    };

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const endpoint = getEndpoint();
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${endpoint}`);
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    }, [orderType]);

    const fetchStatuses = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/order_statuses`);
            const data = await response.json();
            setStatuses(data);
        } catch (error) {
            console.error('Error fetching statuses:', error);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
        fetchStatuses();
    }, [fetchOrders, fetchStatuses]);

    const updateOrderStatus = async (orderId: number, newStatusId: number) => {
        try {
            const endpoint = getEndpoint();
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${endpoint}/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    [`orders_${orderType}`]: {
                        order_status_id: newStatusId,
                    },
                }),
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    };

    const deleteOrder = async (orderId: number) => {
        const endpoint = getEndpoint();
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${endpoint}/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.ok;
    };

    return {
        orders,
        statuses,
        loading,
        refreshOrders: fetchOrders,
        updateOrderStatus,
        deleteOrder,
    };
};
