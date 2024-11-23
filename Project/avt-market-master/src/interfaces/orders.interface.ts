export enum OrderType {
    CREDIT = 'credit',
    BUYOUT = 'buyout',
    EXCHANGE = 'exchange',
    INSTALLMENT = 'installment',
    CALL_REQUEST = 'call_request',
}

export interface OrderStatus {
    id: number;
    name: string;
}

export interface BaseOrder {
    id: number;
    description: string;
    order_status: OrderStatus;
}

export interface CreditRequest {
    id: number;
    car_id: number;
    name: string;
    phone: string;
    credit_term: number;
    initial_contribution: string;
    banks_id: number;
    programs_id: number;
}

export interface OrderCredit extends BaseOrder {
    credit: CreditRequest;
}

export interface BuyoutRequest {
    id: number;
    car_id: number;
    name: string;
    phone: string;
}

export interface OrderBuyout extends BaseOrder {
    buyout: BuyoutRequest;
}

export interface ExchangeRequest {
    id: number;
    car_id: number;
    name: string;
    phone: string;
}

export interface OrderExchange extends BaseOrder {
    exchange: ExchangeRequest;
}

export interface InstallmentRequest {
    id: number;
    car_id: number;
    name: string;
    phone: string;
    installment_term: number;
    initial_contribution: string;
}

export interface OrderInstallment extends BaseOrder {
    installment: InstallmentRequest;
}

export interface CallRequest {
    id: number;
    car_id: number;
    name: string;
    phone: string;
}

export interface OrderCallRequest extends BaseOrder {
    call_request: CallRequest;
}
