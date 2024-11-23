import React from 'react';
import { MessageProvider } from '../hoc/messageContext';
import { Outlet } from 'react-router-dom';
import { AuthorizationProvider } from '../hoc/authorizationProvider';

export const Admin = (): React.JSX.Element => {
    return (
        <div>
            <MessageProvider>
                <AuthorizationProvider>
                    <Outlet />
                </AuthorizationProvider>
            </MessageProvider>
        </div>
    );
};
