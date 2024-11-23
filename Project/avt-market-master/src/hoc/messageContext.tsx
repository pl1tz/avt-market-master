import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { useMessageAdmin } from '../hook/useAdminMessage';
import type { MessageFunction } from '../hook/useAdminMessage';

interface MessageContextType {
    showSuccess: MessageFunction;
    showError: MessageFunction;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

interface MessageProviderProps {
    children: ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
    const { showSuccess, showError, contextHolder } = useMessageAdmin();

    const value = useMemo(
        () => ({
            showSuccess,
            showError,
        }),
        [showSuccess, showError],
    );

    return (
        <MessageContext.Provider value={value}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    );
};

export const useMessageContext = (): MessageContextType => {
    const context = useContext(MessageContext);

    if (!context) {
        throw new Error('useMessageContext must be used within MessageProvider');
    }

    return context;
};
