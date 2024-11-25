import React from 'react';
import { Typography, Tabs } from 'antd';
import { useLoadCategories } from '../../hook/useLoadCategories';
import { CategoryManager } from './CategoryManager';

const { Title } = Typography;

export const Categories = () => {
    const {
        brands,
        models,
        generations,
        colors,
        bodyTypes,
        enginePowerTypes,
        engineNameTypes,
        engineCapacityTypes,
        gearboxTypes,
        driveTypes,
        extras,
        categories,
        refreshData,
    } = useLoadCategories();

    if (!brands.length) return <div style={{ marginTop: '50px', textAlign: 'center' }}>Загрузка...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <Title level={1}>Редактирование категорий</Title>
            <Tabs
                items={[
                    {
                        key: 'brands',
                        label: 'Бренды',
                        children: (
                            <CategoryManager
                                items={brands}
                                dataKey="brand"
                                endpoint="brands"
                                title="Бренд"
                                onUpdate={refreshData}
                            />
                        ),
                    },
                    {
                        key: 'colors',
                        label: 'Цвета',
                        children: (
                            <CategoryManager
                                items={colors}
                                endpoint="colors"
                                dataKey="color"
                                title="Цвет"
                                onUpdate={refreshData}
                            />
                        ),
                    },
                    {
                        key: 'models',
                        label: 'Модели',
                        children: (
                            <CategoryManager
                                items={models}
                                endpoint="models"
                                title="Модель"
                                onUpdate={refreshData}
                                dataKey="model"
                                brands={brands}
                            />
                        ),
                    },
                    {
                        key: 'generations',
                        label: 'Поколения',
                        children: (
                            <CategoryManager
                                items={generations}
                                endpoint="generations"
                                title="Поколение"
                                onUpdate={refreshData}
                                models={models}
                                dataKey="generation"
                            />
                        ),
                    },
                    {
                        key: 'body_types',
                        label: 'Типы кузова',
                        children: (
                            <CategoryManager
                                items={bodyTypes}
                                endpoint="body_types"
                                title="Тип кузова"
                                onUpdate={refreshData}
                                dataKey="body_type"
                            />
                        ),
                    },
                    {
                        key: 'engine_power_types',
                        label: 'Типы мощности',
                        children: (
                            <CategoryManager
                                items={enginePowerTypes}
                                endpoint="engine_power_types"
                                title="Тип мощности"
                                onUpdate={refreshData}
                                dataKey="engine_power_type"
                            />
                        ),
                    },
                    {
                        key: 'engine_name_types',
                        label: 'Типы двигателей',
                        children: (
                            <CategoryManager
                                items={engineNameTypes}
                                endpoint="engine_name_types"
                                title="Тип двигателя"
                                onUpdate={refreshData}
                                dataKey="engine_name_type"
                            />
                        ),
                    },
                    {
                        key: 'engine_capacity_types',
                        label: 'Типы объема двигателя',
                        children: (
                            <CategoryManager
                                items={engineCapacityTypes}
                                endpoint="engine_capacity_types"
                                title="Тип объема двигателя"
                                onUpdate={refreshData}
                                dataKey="engine_capacity_type"
                            />
                        ),
                    },
                    {
                        key: 'gearbox_types',
                        label: 'Типы коробок передач',
                        children: (
                            <CategoryManager
                                items={gearboxTypes}
                                endpoint="gearbox_types"
                                title="Тип коробки передач"
                                onUpdate={refreshData}
                                dataKey="gearbox_type"
                            />
                        ),
                    },
                    {
                        key: 'drive_types',
                        label: 'Типы приводов',
                        children: (
                            <CategoryManager
                                items={driveTypes}
                                endpoint="drive_types"
                                title="Тип привода"
                                onUpdate={refreshData}
                                dataKey="drive_type"
                            />
                        ),
                    },
                    {
                        key: 'categories',
                        label: 'Категории дополнительного оборудования',
                        children: (
                            <CategoryManager
                                items={categories}
                                endpoint="categories"
                                title="Дополнительное оборудование"
                                onUpdate={refreshData}
                                dataKey="category"
                            />
                        ),
                    },
                    {
                        key: 'extras',
                        label: 'Названия дополнительного оборудования',
                        children: (
                            <CategoryManager
                                items={extras}
                                endpoint="extra_names"
                                title="Дополнительное оборудование"
                                onUpdate={refreshData}
                                dataKey="extra_name"
                            />
                        ),
                    },
                ]}
            />
        </div>
    );
};
