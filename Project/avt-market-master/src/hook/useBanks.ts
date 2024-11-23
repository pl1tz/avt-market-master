import { useState, useEffect, useCallback } from 'react';
import { customFetch } from '../helpers/customFetch';
import type { Bank } from '../interfaces/banks.interface';

export const useBanks = () => {
    const [banks, setBanks] = useState<Bank[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchBanks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await customFetch<Bank[]>({
                url: 'banks',
                method: 'GET',
            });
            setBanks(response);
        } catch (error) {
            console.error('Error fetching banks:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBanks();
    }, [fetchBanks]);

    return {
        banks,
        loading,
        refreshBanks: fetchBanks,
    };
};
