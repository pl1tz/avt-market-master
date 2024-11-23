import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminSelector } from '../redux/selectors';

export const AuthorizationProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
    const isAuthRedux: boolean = useSelector(adminSelector).isAuth;
    const isAuthSession = sessionStorage.getItem('isAuth');
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        if (!isAuthRedux && !isAuthSession) {
            navigate('/admin');
        }

        if ((isAuthRedux || isAuthSession) && location.pathname === '/admin') {
            navigate('/admin/cars');
        }
    }, [isAuthRedux, location.pathname]);

    return <>{children}</>;
};
