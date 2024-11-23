export type FilterKeys =
    | 'brand_name'
    | 'model_name'
    | 'generation_name'
    | 'year_from'
    | 'max_price'
    | 'engine_name_type_name'
    | 'gearbox_type_name'
    | 'body_type_name'
    | 'drive_type_name'
    | 'owners_count';

export type Filter = {
    key: FilterKeys;
    values: string[];
};

export interface CarCountFilter {
    key: 'car_count';
    value: string;
}

export type FilterResponse = Filter | CarCountFilter;

export type FetchFiltersParams = {
    brand_name?: string;
    model_name?: string;
    generation_name?: string;
};
