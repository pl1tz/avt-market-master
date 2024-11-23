import type { URL } from '../interfaces/interface';

export const customFetch = async <T>(config: {
    url: URL;
    data?: string;
    method: 'POST' | 'GET' | 'DELETE';
}): Promise<T> => {
    const { url, data, method } = config;

    const response = await fetch(`${process.env.REACT_APP_BASE_URL!}/${url}`, {
        method,
        body: data,
        headers: {
            'content-type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Ошибка при обращении к ${process.env.REACT_APP_BASE_URL!}/${url}`);
    }

    return response.json();
};
