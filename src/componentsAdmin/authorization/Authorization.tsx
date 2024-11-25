import React from 'react';
import styles from './Authorization.module.scss';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { setAuth } from '../../redux/slice/adminSlice';
import { adminSelector } from '../../redux/selectors';
import { Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useMessageContext } from '../../hoc/messageContext';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

type AuthorizationForm = {
    username: string;
    password: string;
};

export const Authorization = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth: boolean = useSelector(adminSelector).isAuth;
    const { showError, showSuccess } = useMessageContext();

    const onFinish = async (values: AuthorizationForm): Promise<void> => {
        const { username, password } = values;

        if (username === 'admin@gmail.com' && password === '123456') {
            sessionStorage.setItem('isAuth', 'true');
            dispatch(setAuth(true));

            navigate('/admin/cars');
            showSuccess('Вход выполнен успешно');
        } else {
            showError('Неверный логин или пароль');
        }
    };

    if (isAuth || sessionStorage.getItem('isAuth')) {
        return <></>;
    }

    return (
        <div className={styles.authorization}>
            <div className={styles.authorization__inner}>
                <Title level={1}>Вход в панель управления</Title>

                <Form name="login" initialValues={{ remember: true }} style={{ maxWidth: 360 }} onFinish={onFinish}>
                    <Form.Item name="username" rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}>
                        <Input prefix={<UserOutlined />} placeholder="Логин" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}>
                        <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" />
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
