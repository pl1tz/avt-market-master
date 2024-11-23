export type EditCar = {
    id: number;
    year: number;
    price: number;
    description: string;
    online_view_available: boolean;
    complectation_name: string;
    brands: BaseEditElement;
    models: BaseEditElement;
    generations: BaseEditElement;
    gearbox_types: BaseEditElement;
    body_types: BaseEditElement;
    drive_types: BaseEditElement;
    engine_name_types: BaseEditElement;
    colors: BaseEditElement;
    engine_power_types: EnginePowerElement;
    engine_capacity_types: EngineCapacityElement;
    all_brands: AllBrands[];
    all_engine_capacity_types: EngineCapacityElement[];
    all_colors: AllColors[];
    all_engine_power_types: EnginePowerElement[];
    all_engine_name_types: AllEngineName[];
    all_gearbox_types: AllGearbox[];
    all_body_types: AllCarBody[];
    all_drive_types: AllCarDrive[];
};

export type AllBrands = BaseEditElement & {
    all_models: AllModels[];
};

export type AllModels = BaseEditElement & {
    all_generations: AllGenerations[];
};

export type EngineCapacityElement = {
    id: number;
    capacity: number;
};

export type EnginePowerElement = {
    id: number;
    power: number;
};

export type BaseEditElement = {
    id: number;
    name: string;
};

export type AllGenerations = BaseEditElement;
export type AllColors = BaseEditElement;
export type AllEngineName = BaseEditElement;
export type AllGearbox = BaseEditElement;
export type AllCarBody = BaseEditElement;
export type AllCarDrive = BaseEditElement;

export type CarEditHistoryType = {
    vin: string;
    registration_number: string;
    last_mileage: number;
    previous_owners: number;
    registration_restrictions: string;
    registration_restrictions_info: string;
    wanted_status: string;
    wanted_status_info: string;
    pledge_status: string;
    pledge_status_info: string;
    accidents_found: string;
    accidents_found_info: string;
    repair_estimates_found: string;
    repair_estimates_found_info: string;
    carsharing_usage: string;
    carsharing_usage_info: string;
    taxi_usage: string;
    taxi_usage_info: string;
    diagnostics_found: string;
    diagnostics_found_info: string;
    technical_inspection_found: string;
    technical_inspection_found_info: string;
    imported: string;
    imported_info: string;
    insurance_found: string;
    insurance_found_info: string;
    recall_campaigns_found: string;
    recall_campaigns_found_info: string;
};

export type ComplectationItem = {
    extra_id: number;
    category_id: number;
    category_name: string;
    extra_name_id: number;
    extra_name_name: string;
};

export type CarEditComplectationType = {
    extras: ComplectationItem[];
    all_extra_names: BaseEditElement[];
    all_categories: BaseEditElement[];
};

export type GroupedDataComplectation = {
    key: string;
    category: string;
    features: string[];
};

export type CreateCar = {
    model_id: number;
    brand_id: number;
    year: number;
    price: number;
    description: string;
    color_id: number;
    body_type_id: number;
    engine_power_type_id: number;
    engine_name_type_id: number;
    engine_capacity_type_id: number;
    gearbox_type_id: number;
    drive_type_id: number;
    generation_id: number;
    online_view_available: boolean;
    complectation_name: string;

    vin: string;
    last_mileage: number;
    previous_owners: number;
    registration_number: string;
    registration_restrictions: string;
    registration_restrictions_info: string;
    wanted_status: string;
    wanted_status_info: string;
    pledge_status: string;
    pledge_status_info: string;
    accidents_found: string;
    accidents_found_info: string;
    repair_estimates_found: string;
    repair_estimates_found_info: string;
    taxi_usage: string;
    taxi_usage_info: string;
    carsharing_usage: string;
    carsharing_usage_info: string;
    diagnostics_found: string;
    diagnostics_found_info: string;
    technical_inspection_found: string;
    technical_inspection_found_info: string;
    imported: string;
    imported_info: string;
    insurance_found: string;
    recall_campaigns_found: string;
    recall_campaigns_found_info: string;

    categoryExtras: { category_id: number; extra_ids: number[] }[];

    images: string[];
};
