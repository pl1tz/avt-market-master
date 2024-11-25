import React from 'react';
import { useSelector } from 'react-redux';
import { modalSelector } from '../redux/selectors';
import type { UseNumberPhone } from '../interfaces/hook.interface';

export const useNumberPhone = (): UseNumberPhone => {
    const callbackState: boolean = useSelector(modalSelector).callback.modalState;
    const PHONE_INIT = '+7 (___) ___-__-__';
    const [value, setValue] = React.useState<string>('');
    const cursorPosition = React.useRef<number>(PHONE_INIT.indexOf('_'));
    const inputElement = React.useRef<HTMLInputElement | null>(null);

    const setInputRef = (el: HTMLInputElement | null) => {
        inputElement.current = el;
    };

    const setCursorIndex = (newPositionCursor: number): void => {
        cursorPosition.current = newPositionCursor;
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const input = inputElement.current;
        if (!input) return;

        event.preventDefault();

        if (event.key === 'Backspace') {
            setValue((prev) => {
                const newValue = prev.slice(0, 3) + prev.slice(3).replace(/\d(?!.*\d)/, '_');
                setCursorIndex(newValue.indexOf('_') || 4);
                return newValue;
            });
        } else if (/^[0-9]$/.test(event.key)) {
            setValue((prev) => {
                const newValue = prev.replace('_', event.key);
                setCursorIndex(newValue.indexOf('_') || 4);
                return newValue;
            });
        }
    };

    React.useEffect(() => {
        const focus = (): void => {
            const input = inputElement.current;
            if (input) {
                if (input.value === '') {
                    setValue(PHONE_INIT);
                }
            }
            setTimeout(() => {
                input!.setSelectionRange(cursorPosition.current, cursorPosition.current);
            }, 0);
        };

        const blur = (): void => {
            const input = inputElement.current;
            if (input && input.value === PHONE_INIT) {
                setValue('');
            }
        };

        const currentInput = inputElement.current;
        currentInput?.addEventListener('focus', focus);
        currentInput?.addEventListener('blur', blur);

        return () => {
            currentInput?.removeEventListener('focus', focus);
            currentInput?.removeEventListener('blur', blur);
        };
    }, []);

    React.useEffect(() => {
        const input = inputElement.current;
        if (input) {
            input.setSelectionRange(cursorPosition.current, cursorPosition.current);
        }
    }, [value]);

    React.useEffect(() => {
        if (!callbackState) {
            setValue('');
        }
    }, [callbackState]);

    return [value, handleKeyDown, setInputRef];
};
