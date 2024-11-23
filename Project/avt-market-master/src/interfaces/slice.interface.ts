import type { Bank } from './banks.interface';
import type { AutoCard, CarsCount, CarsCountGenerations, CarsCountModel } from './cars.interface';
import type { Filter } from './filter.interface';
import type { MenuElement } from './header.interface';
import type { ContactsType, ModalPromotionData } from './interface';

export type ModalName =
    | 'callback'
    | 'burgerMenu'
    | 'promotion'
    | 'credit'
    | 'selectCar'
    | 'exchange'
    | 'report'
    | 'equipment';
export type FilterKey = 'brand' | 'generation' | 'model' | 'car';

export type Modal = {
    modalState: boolean;
};

export type SelectCarSection<THIS, NEXT> = {
    thisValue: null | THIS;
    nextValue: null | NEXT;
    status: boolean;
    selected: string;
};

export type SelectCarModal = {
    stateLoad: {
        isLoad: boolean;
        error: boolean;
    };
    filter: {
        brand: SelectCarSection<CarsCount[], CarsCountModel[]>;
        model: SelectCarSection<CarsCountModel[], CarsCountGenerations[]>;
        generation: SelectCarSection<CarsCountGenerations[], AutoCard[]>;
        car: {
            carList: AutoCard[];
            carSelect: AutoCard;
            status: boolean;
        };
        stage: number;
    };
};

export type ModalSlice = {
    modals: {
        burgerMenu: Modal & { menuNavigation: MenuElement[] };
        callback: Modal;
        credit: Modal;
        equipment: Modal;
        exchange: Modal;
        promotion: Modal & Omit<ModalPromotionData, 'img'>;
        report: Modal;
        selectCar: Modal & SelectCarModal;
    };
};

export type FavoritesSlice = {
    favoritesCount: number;
    favoritesList: AutoCard[];
};

export type MediaQuerySlice = {
    readonly SMALL: number;
    readonly MEDIUM: number;
    isSmall: boolean;
    isMedium: boolean;
};

export type BanksListSlice = {
    banksList: Bank[];
    bestOffersBanks: Bank[];
    stateLoad: {
        isLoad: boolean;
        error: boolean;
    };
    targetBankId: number | null;
    targetProgramId: number | null;
};

export type InStockSlice = {
    inStockList: CarsCount[];
    stateLoad: {
        isLoad: boolean;
        error: boolean;
    };
};

export type LastArrivalsSlice = {
    lastArrivalsList: AutoCard[];
    stateLoad: {
        isLoad: boolean;
        error: boolean;
    };
};

export type PaymentSlice = {
    creditTerm: number;
    initialContribution: number;
};

export type FilterSlice = {
    values: {
        brand_name: string | null;
        model_name: string | null;
        generation_name: string | null;
        year_from: string | null;
        max_price: string | null;
        engine_name_type_name: string | null;
        gearbox_type_name: string | null;
        body_type_name: string | null;
        drive_type_name: string | null;
        owners_count: string | null;
    };
    state: {
        isLoading: boolean;
        filtersList: Filter[];
        error: null | string;
        carCount: number | null;
    };
};

export type ContactsSlice = {
    contacts: ContactsType;
    stateLoad: {
        isLoading: boolean;
        error: boolean;
    };
};

export type AboutSlice = {
    about: { id: number; description: string }[];
    stateLoad: {
        isLoading: boolean;
        error: boolean;
    };
};
