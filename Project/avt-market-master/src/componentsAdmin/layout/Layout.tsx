import React from 'react';
import styles from './Layout.module.scss';
import { useDispatch } from 'react-redux';
import { usePageTitle } from '../../hook/usePageTitle';
import { Layout as AntLayout, Menu } from 'antd';
import {
    CarOutlined,
    LogoutOutlined,
    PlusCircleOutlined,
    InfoCircleOutlined,
    BankOutlined,
    AppstoreOutlined,
    FileProtectOutlined,
    ShoppingOutlined,
    ContactsOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { setAuth } from '../../redux/slice/adminSlice';
import { useLoad } from '../../hook/useLoad';
import type { MenuProps } from 'antd';

const { Header, Content } = AntLayout;

export const Layout = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useLoad();
    usePageTitle();

    const items: MenuProps['items'] = [
        {
            label: <Link to="/admin/cars">Автомобили</Link>,
            key: '/admin/cars',
            icon: <CarOutlined />,
        },
        {
            label: <Link to="/admin/add_car">Добавить авто</Link>,
            key: '/admin/add_car',
            icon: <PlusCircleOutlined />,
        },
        {
            label: <Link to="/admin/categories">Категории</Link>,
            key: '/admin/categories',
            icon: <AppstoreOutlined />,
        },
        {
            label: <Link to="/admin/banks">Банки</Link>,
            key: '/admin/banks',
            icon: <BankOutlined />,
        },
        {
            label: <Link to="/admin/programs">Программы</Link>,
            key: '/admin/programs',
            icon: <FileProtectOutlined />,
        },
        {
            label: <Link to="/admin/contacts">Заявки</Link>,
            key: '/admin/orders',
            icon: <ShoppingOutlined />,
        },
        {
            label: <Link to="/admin/contacts">Контакты</Link>,
            key: '/admin/contacts',
            icon: <ContactsOutlined />,
        },
        {
            label: <Link to="/admin/About">О нас</Link>,
            key: '/admin/about',
            icon: <InfoCircleOutlined />,
        },
        {
            label: 'Выход',
            key: 'logout',
            icon: <LogoutOutlined />,
            danger: true,
            style: { marginLeft: 'auto' },
        },
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'logout') {
            dispatch(setAuth(false));
            sessionStorage.removeItem('isAuth');
            return;
        }
        navigate(e.key);
    };

    return (
        <AntLayout className={styles.layout}>
            <Header className={styles.header}>
                <div className={styles.logo}>ADMIN PANEL</div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={items}
                    selectedKeys={[location.pathname]}
                    onClick={onClick}
                    className={styles.menu}
                />
            </Header>
            <Content className={styles.content}>
                <Outlet />
            </Content>
        </AntLayout>
    );
};
