export type Bank = {
    id: number;
    name: string;
    country: string;
    created_at: string;
    updated_at: string;
    programs: Program[];
};

export type Program = {
    id: number;
    bank_id: number;
    program_name: string;
    interest_rate: number;
    created_at: string;
    updated_at: string;
};

export type CreateBankDto = {
    name: string;
    country: string;
};

export interface CreateProgramDto {
    bank_id: number;
    program_name: string;
    interest_rate: number;
}
