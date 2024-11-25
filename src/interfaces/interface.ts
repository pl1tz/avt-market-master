export type URL =
    | 'installment'
    | 'buyout'
    | 'exchanges'
    | 'credits'
    | 'cars_count'
    | 'call_requests'
    | 'banks'
    | 'filters'
    | 'cars'
    | 'contacts'
    | 'about_companies'
    | 'brands'
    | 'models'
    | 'generations'
    | 'colors'
    | 'body_types'
    | 'engine_power_types'
    | 'engine_name_types'
    | 'engine_capacity_types'
    | 'gearbox_types'
    | 'drive_types'
    | 'extras/all_extras';

export type BenefitsProps = {
    description: string;
    title: string;
};

export type ModalPromotionData = {
    link?: string;
    img: string;
} & BenefitsProps;

export type LogoProps = {
    className: string;
};

export type CrossProps = {
    className: string;
    handler: () => void;
};

export type ExtraInformationElement = {
    title: string;
    description: string;
};

export type ExtraInformationProps = {
    title: string;
    information: ExtraInformationElement[];
};

export type ErrorProps = {
    error?: Error;
    resetErrorBoundary?: () => void;
};

export type VectorProps = {
    className?: string;
    isOpen: boolean;
};

export type ButtonCardOpenModalProps = {
    className?: string;
    extraClassName?: string;
    textContent: string;
    handler: () => void;
};

export type ContactsType = {
    id: number;
    phone: number;
    mode_operation: string;
    auto_address: string;
};
