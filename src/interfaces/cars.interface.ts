import { FilterKeys } from './filter.interface';

export type AutoCardCarAbbreviation = 'АКПП' | 'МКПП' | 'CVT' | 'РКПП';

export type CarSelectionFilterProps = {
    className?: string;
    dropValue: string[];
    filterKey: FilterKeys;
    hasVector?: boolean;
    isOpen: boolean;
    title: string;
    onToggle: (title: FilterKeys) => void;
};

export type AutoCardAutoImage = {
    car_id: number;
    id: number;
    url: string;
};

export type AutoCardCarMainPiece = {
    id: number;
    name: string;
};

export type AutoCardHistoryCar = {
    accidents_found: string;
    id: number;
    last_mileage: number;
    pledge_status: string;
    previous_owners: number;
    registration_number: string;
    repair_estimates_found: string;
    vin: string;
};

export type AutoCardExtras = {
    category: string;
    names: string[];
};

export type AutoCard = {
    id: number;
    year: number;
    price: number;
    description: string;
    online_view_available: boolean;
    images: AutoCardAutoImage[];
    history_cars: AutoCardHistoryCar[];
    brand: AutoCardCarMainPiece;
    model: AutoCardCarMainPiece & { created_at: string };
    complectation_name: string;
    generation: AutoCardCarMainPiece & {
        start_date: null | string;
        end_date: null | string;
        modarnization: null | string;
    };
    color: AutoCardCarMainPiece;
    body_type: AutoCardCarMainPiece;
    engine_name_type: AutoCardCarMainPiece;
    engine_power_type: { id: number; power: number };
    engine_capacity_type: { id: number; capacity: number };
    gearbox_type: AutoCardCarMainPiece & {
        abbreviation: AutoCardCarAbbreviation;
    };
    drive_type: AutoCardCarMainPiece;
    extras: AutoCardExtras[];
};

export type ExtraCardAuto = {
    extraClassName?: string;
    inModalCredit?: boolean;
    inModalSelect?: boolean;
};

export type CarsCount = {
    brand: string;
    total: number;
    models: CarsCountModel[];
};

export type CarsCountModel = {
    name: string;
    total: string;
    generations: CarsCountGenerations[];
};

export type CarsCountGenerations = {
    name: string;
    count: number;
};
