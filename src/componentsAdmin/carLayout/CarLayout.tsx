import React from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { CarOutlined, HistoryOutlined, ToolOutlined, PictureOutlined } from '@ant-design/icons';
import { useCarEditLoad } from '../../hook/useCarEditLoad';
import { editCarSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import type { MenuProps } from 'antd';

const { Content, Sider } = Layout;

export const CarLayout = (): React.JSX.Element => {
    const { id } = useParams();
    const location = useLocation();
    const car = useSelector(editCarSelector).car;

    useCarEditLoad();

    const getSelectedKey = () => {
        const path = location.pathname;
        if (path.endsWith(`/car/${id}`)) return 'edit-car-main-info';
        if (path.includes('/history')) return 'edit-car-history';
        if (path.includes('/complectation')) return 'edit-car-complectation';
        if (path.includes('/images')) return 'edit-car-images';
        return 'edit-car-main-info';
    };

    const menuItems: MenuProps['items'] = [
        {
            key: 'edit-car-main-info',
            icon: <CarOutlined />,
            label: <a href={`/admin/car/${id}`}>Основная информация</a>,
        },
        {
            key: 'edit-car-history',
            icon: <HistoryOutlined />,
            label: <a href={`/admin/car/${id}/history`}>История машины</a>,
        },
        {
            key: 'edit-car-complectation',
            icon: <ToolOutlined />,
            label: <a href={`/admin/car/${id}/complectation`}>Комплектации</a>,
        },
        {
            key: 'edit-car-images',
            icon: <PictureOutlined />,
            label: <a href={`/admin/car/${id}/images`}>Изображения</a>,
        },
    ];

    if (!car) return <></>;

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
            <Sider width={300}>
                <Menu
                    mode="inline"
                    selectedKeys={[getSelectedKey()]}
                    style={{ height: '100%', borderRight: 0, paddingTop: '24px' }}
                    items={menuItems}
                />
            </Sider>
            <Layout style={{ paddingLeft: '24px' }}>
                <Content
                    style={{
                        padding: '24px',
                        margin: 0,
                        background: '#fff',
                        borderRadius: '8px',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
