import { useState, useEffect, useCallback } from 'react';
import type { Program } from '../interfaces/banks.interface';

export const usePrograms = () => {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchPrograms = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/programs`);
            const data = await response.json();
            setPrograms(data);
        } catch (error) {
            console.error('Error fetching programs:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPrograms();
    }, [fetchPrograms]);

    return {
        programs,
        loading,
        refreshPrograms: fetchPrograms,
    };
};
