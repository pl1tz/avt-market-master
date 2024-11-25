import React from 'react';
import { Form, Input, InputNumber, Select, Switch, Button, Typography, Card, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useMessageContext } from '../../hoc/messageContext';
import { useLoadCategories, SelectElement } from '../../hook/useLoadCategories';
import { AutoCard } from '../../interfaces/cars.interface';
import type { CreateCar } from '../../interfaces/editCar.interface';
import type { BaseEditElement } from '../../interfaces/editCar.interface';

const { Title } = Typography;
const { TextArea } = Input;

export const CarAdd = () => {
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
    } = useLoadCategories();
    const [form] = Form.useForm();
    const { showError, showSuccess } = useMessageContext();

    const [selectBrand, setSelectBrand] = React.useState<null | number>(null);
    const [selectModel, setSelectModel] = React.useState<null | number>(null);

    if (!brands.length) return <div style={{ marginTop: '50px', textAlign: 'center' }}>Загрузка...</div>;

    const sortByName = (arr: Array<Omit<SelectElement, 'model_id'>>) => {
        return [...arr].sort((a, b) => (a?.name || '').localeCompare(b?.name || ''));
    };

    const onFinish = async (values: CreateCar) => {
        const responseMainInfo = await fetch(`${process.env.REACT_APP_BASE_URL}/cars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                car: {
                    model_id: values.model_id,
                    brand_id: values.brand_id,
                    year: values.year,
                    price: values.price,
                    description: values.description,
                    color_id: values.color_id,
                    body_type_id: values.body_type_id,
                    engine_power_type_id: values.engine_power_type_id,
                    engine_name_type_id: values.engine_name_type_id,
                    engine_capacity_type_id: values.engine_capacity_type_id,
                    gearbox_type_id: values.gearbox_type_id,
                    drive_type_id: values.drive_type_id,
                    generation_id: values.generation_id,
                    complectation_name: values.complectation_name,
                    online_view_available: values.online_view_available,
                },
            }),
        });

        if (!responseMainInfo.ok) {
            showError('Ошибка при добавлении основной информации автомобиля');
            return;
        }
        showSuccess('Основная информация автомобиля добавлена. Автомобиль был создан');

        const car = (await responseMainInfo.json()) as AutoCard;

        const responseHistory = await fetch(`${process.env.REACT_APP_BASE_URL}/history_cars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                history_car: {
                    car_id: car.id,
                    vin: values.vin,
                    last_mileage: values.last_mileage,
                    previous_owners: values.previous_owners,
                    registration_number: values.registration_number,
                    registration_restrictions: values.registration_restrictions,
                    registration_restrictions_info: values.registration_restrictions_info,
                    wanted_status: values.wanted_status,
                    wanted_status_info: values.wanted_status_info,
                    pledge_status: values.pledge_status,
                    pledge_status_info: values.pledge_status_info,
                    accidents_found: values.accidents_found,
                    accidents_found_info: values.accidents_found_info,
                    repair_estimates_found: values.repair_estimates_found,
                    repair_estimates_found_info: values.repair_estimates_found_info,
                    taxi_usage: values.taxi_usage,
                    taxi_usage_info: values.taxi_usage_info,
                    carsharing_usage: values.carsharing_usage,
                    carsharing_usage_info: values.carsharing_usage_info,
                    diagnostics_found: values.diagnostics_found,
                    diagnostics_found_info: values.diagnostics_found_info,
                    technical_inspection_found: values.technical_inspection_found,
                    technical_inspection_found_info: values.technical_inspection_found_info,
                    imported: values.imported,
                    imported_info: values.imported_info,
                    insurance_found: values.insurance_found,
                    recall_campaigns_found: values.recall_campaigns_found,
                    recall_campaigns_found_info: values.recall_campaigns_found_info,
                },
            }),
        });

        if (!responseHistory.ok) {
            showError('Ошибка при добавлении истории автомобиля');
            return;
        }

        showSuccess('История автомобиля добавлена');

        const responseImages = await fetch(`${process.env.REACT_APP_BASE_URL}/images/update_multiple`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ images: values.images.map((image) => ({ car_id: car.id, url: image })) }),
        });

        if (!responseImages.ok) {
            showError('Ошибка при добавлении изображений');
            return;
        }

        showSuccess('Изображения добавлены');

        const responseExtras = await fetch(`${process.env.REACT_APP_BASE_URL}/extras/update_multiple`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                extras: values.categoryExtras.map((extra) => ({
                    car_id: car.id,
                    category_id: extra.category_id,
                    extra_name_id: extra.extra_ids,
                })),
            }),
        });

        if (!responseExtras.ok) {
            showError('Ошибка при добавлении дополнительных опций');
            return;
        }

        showSuccess('Дополнительные опции добавлены');
        showSuccess('Полное создание автомобиля завершено');
    };

    return (
        <div style={{ padding: '20px' }}>
            <Title level={1}>Добавление автомобиля</Title>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    images: [''],
                    online_view_available: false,
                    registration_number: 'Отсутствует',
                    registration_restrictions: 'Не найдены ограничения на регистрацию',
                    registration_restrictions_info:
                        'Запрет регистрационных действий на машину накладывается, если у автовладельца есть неоплаченные штрафы и налоги, либо если имущество стало предметом спора.',
                    wanted_status: 'Нет сведений о розыске',
                    wanted_status_info:
                        'Покупка разыскиваемого автомобиля грозит тем, что его отберут в ГИБДД при регистрации, и пока будет идти следствие, а это может затянуться на долгий срок, автомобиль будет стоять на штрафплощадке.',
                    pledge_status: 'Залог не найден',
                    pledge_status_info:
                        'Мы проверили базы данных Федеральной нотариальной палаты (ФНП) и Национального бюро кредитных историй (НБКИ).',
                    accidents_found: 'ДТП не найдены',
                    accidents_found_info:
                        'В отчёт не попадут аварии, которые произошли раньше 2015 года или не оформлялись в ГИБДД.',
                    repair_estimates_found: 'Не найдены расчёты стоимости ремонта',
                    repair_estimates_found_info:
                        'Мы проверяем, во сколько эксперты страховых компаний оценили восстановление автомобиля после ДТП. Расчёт не означает, что машину ремонтировали.',
                    taxi_usage: 'Не найдено разрешение на работу в такси',
                    taxi_usage_info:
                        'Данные представлены из региональных баз по регистрации автомобиля в качестве такси.',
                    carsharing_usage: 'Не найдены сведения об использовании в каршеринге',
                    carsharing_usage_info:
                        'На каршеринговых авто ездят практически круглосуточно. Они много времени проводят в пробках — от этого двигатель и сцепление быстро изнашиваются. Салон тоже страдает от большого количества водителей и пассажиров.',
                    diagnostics_found: 'Не найдены сведения о диагностике',
                    diagnostics_found_info:
                        'В блоке представлены данные по оценке состояния автомобиля по результатам офлайн диагностики. В ходе диагностики специалисты проверяют состояние ЛКП, всех конструкций автомобиля, состояние салона, фактическую комплектацию и проводят небольшой тест-драйв.',
                    technical_inspection_found: 'Не найдены сведения о техосмотрах',
                    technical_inspection_found_info:
                        'В данном блоке отображаются данные о прохождении техосмотра на основании данных диагностических карт ТС. Срок прохождения технического осмотра для автомобилей категории «B»: — первые четыре года — не требуется; — возраст от 4 до 10 лет — каждые 2 года; — старше 10 лет — ежегодно.',
                    imported: 'Нет сведений о ввозе из-за границы',
                    imported_info:
                        'Данные из таможенной декларации, которую заполняет компания, осуществляющая ввоз транспортного средства на территорию РФ.',
                    insurance_found: 'Нет полиса ОСАГО',
                    recall_campaigns_found: 'Не найдены сведения об отзывных кампаниях',
                    recall_campaigns_found_info:
                        'Для данного автомобиля не проводилось или нет действующих отзывных кампаний. Отзыв автомобиля представляет собой устранение выявленного брака. Практически все автомобильные производители периодически отзывают свои продукты для устранения дефектов.',
                }}
            >
                <Card>
                    <Title level={2}>Основная информация</Title>
                    <Form.Item name="brand_id" label="Марка" rules={[{ required: true, message: 'Выберите марку' }]}>
                        <Select
                            placeholder="Выберите марку"
                            onChange={(value) => setSelectBrand(value)}
                            showSearch
                            optionFilterProp="children"
                        >
                            {sortByName(brands).map((brand) => (
                                <Select.Option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="model_id" label="Модель" rules={[{ required: true, message: 'Выберите модель' }]}>
                        <Select
                            placeholder="Выберите модель"
                            showSearch
                            optionFilterProp="children"
                            onChange={(value) => setSelectModel(value)}
                        >
                            {sortByName(models.filter((model) => model.brand_id === selectBrand)).map((model) => (
                                <Select.Option key={model.id} value={model.id}>
                                    {model.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="generation_id"
                        label="Поколение"
                        rules={[{ required: true, message: 'Выберите поколение' }]}
                    >
                        <Select placeholder="Выберите поколение" showSearch optionFilterProp="children">
                            {generations
                                .filter((item) => item.model_id === selectModel)
                                .map((gen) => (
                                    <Select.Option key={gen.id} value={gen.id}>
                                        {gen.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="color_id" label="Цвет" rules={[{ required: true, message: 'Выберите цвет' }]}>
                        <Select placeholder="Выберите цвет" showSearch optionFilterProp="children">
                            {sortByName(colors).map((color) => (
                                <Select.Option key={color.id} value={color.id}>
                                    {color.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="body_type_id"
                        label="Тип кузова"
                        rules={[{ required: true, message: 'Выберите тип кузова' }]}
                    >
                        <Select placeholder="Выберите тип кузова" showSearch optionFilterProp="children">
                            {sortByName(bodyTypes).map((type) => (
                                <Select.Option key={type.id} value={type.id}>
                                    {type.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="engine_power_type_id"
                        label="Мощность двигателя"
                        rules={[{ required: true, message: 'Выберите мощность двигателя' }]}
                    >
                        <Select placeholder="Выберите тип двигателя" showSearch optionFilterProp="children">
                            {enginePowerTypes
                                .sort((a, b) => a.power - b.power)
                                .map((type) => (
                                    <Select.Option key={type.id} value={type.id}>
                                        {type.power}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="engine_name_type_id"
                        label="Модель двигателя"
                        rules={[{ required: true, message: 'Выберите модель двигателя' }]}
                    >
                        <Select placeholder="Выберите тип двигателя" showSearch optionFilterProp="children">
                            {engineNameTypes
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((type) => (
                                    <Select.Option key={type.id} value={type.id}>
                                        {type.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="engine_capacity_type_id"
                        label="Объем двигателя"
                        rules={[{ required: true, message: 'Выберите объем двигателя' }]}
                    >
                        <Select placeholder="Выберите тип двигателя" showSearch optionFilterProp="children">
                            {engineCapacityTypes
                                .sort((a, b) => a.capacity - b.capacity)
                                .map((type) => (
                                    <Select.Option key={type.id} value={type.id}>
                                        {type.capacity}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="gearbox_type_id"
                        label="Тип КПП"
                        rules={[{ required: true, message: 'Выберите тип КПП' }]}
                    >
                        <Select placeholder="Выберите тип КПП" showSearch optionFilterProp="children">
                            {sortByName(gearboxTypes).map((type) => (
                                <Select.Option key={type.id} value={type.id}>
                                    {type.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="drive_type_id"
                        label="Тип привода"
                        rules={[{ required: true, message: 'Выберите тип привода' }]}
                    >
                        <Select placeholder="Выберите тип привода" showSearch optionFilterProp="children">
                            {sortByName(driveTypes).map((type) => (
                                <Select.Option key={type.id} value={type.id}>
                                    {type.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="year"
                        label="Год выпуска"
                        rules={[{ required: true, message: 'Укажите год выпуска' }]}
                    >
                        <InputNumber min={1900} max={new Date().getFullYear()} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="price" label="Цена" rules={[{ required: true, message: 'Укажите цену' }]}>
                        <InputNumber
                            min={0}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Описание"
                        rules={[{ required: true, message: 'Добавьте описание' }]}
                    >
                        <TextArea rows={4} showCount maxLength={1000} />
                    </Form.Item>

                    <Form.Item
                        name="complectation_name"
                        label="Название комплектации"
                        rules={[{ required: true, message: 'Укажите название комплектации' }]}
                    >
                        <Input maxLength={100} showCount />
                    </Form.Item>

                    <Form.Item name="online_view_available" label="В наличии" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Card>

                <Card style={{ marginTop: '20px' }}>
                    <Title level={2}>Дополнительная информация</Title>

                    <Form.Item name="vin" label="VIN номер" rules={[{ required: true, message: 'Введите VIN номер' }]}>
                        <Input maxLength={17} showCount />
                    </Form.Item>

                    <Form.Item
                        name="last_mileage"
                        label="Текущий пробег (км)"
                        rules={[
                            { required: true, message: 'Укажите текущий пробег' },
                            {
                                pattern: /^[0-9]+$/,
                                message: 'Пробег должен содержать только цифры',
                            },
                        ]}
                    >
                        <InputNumber
                            min={0}
                            max={999999}
                            style={{ width: '100%' }}
                            formatter={(value) => `${value}`.replace(/[^0-9]/g, '')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="previous_owners"
                        label="Количество владельцев"
                        rules={[
                            { required: true, message: 'Укажите количество владельцев' },
                            {
                                pattern: /^[0-9]+$/,
                                message: 'Количество владельцев должно содержать только цифры',
                            },
                        ]}
                    >
                        <InputNumber
                            min={1}
                            max={99}
                            style={{ width: '100%' }}
                            formatter={(value) => `${value}`.replace(/[^0-9]/g, '')}
                        />
                    </Form.Item>

                    <Form.Item name="registration_number" label="Регистрационный номер">
                        <Input />
                    </Form.Item>

                    <Form.Item name="registration_restrictions" label="Ограничения на регистрацию">
                        <Input />
                    </Form.Item>

                    <Form.Item name="registration_restrictions_info" label="Информация об ограничениях">
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item name="wanted_status" label="Статус розыска">
                        <Input />
                    </Form.Item>

                    <Form.Item name="wanted_status_info" label="Информация о розыске">
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item name="pledge_status" label="Статус залога">
                        <Input />
                    </Form.Item>

                    <Form.Item name="pledge_status_info" label="Информация о залоге">
                        <TextArea rows={2} />
                    </Form.Item>

                    <Form.Item name="accidents_found" label="Информация о ДТП">
                        <Input />
                    </Form.Item>

                    <Form.Item name="accidents_found_info" label="Дополнительно о ДТП">
                        <TextArea rows={2} />
                    </Form.Item>

                    <Form.Item name="repair_estimates_found" label="Расчёты ремонта">
                        <Input />
                    </Form.Item>

                    <Form.Item name="repair_estimates_found_info" label="Информация о расчётах">
                        <TextArea rows={2} />
                    </Form.Item>

                    <Form.Item name="taxi_usage" label="Использование в такси">
                        <Input />
                    </Form.Item>

                    <Form.Item name="taxi_usage_info" label="Информация об использовании в такси">
                        <TextArea rows={2} />
                    </Form.Item>

                    <Form.Item name="carsharing_usage" label="Использование в каршеринге">
                        <Input />
                    </Form.Item>

                    <Form.Item name="carsharing_usage_info" label="Информация о каршеринге">
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item name="diagnostics_found" label="Диагностика">
                        <Input />
                    </Form.Item>

                    <Form.Item name="diagnostics_found_info" label="Информация о диагностике">
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item name="technical_inspection_found" label="Техосмотр">
                        <Input />
                    </Form.Item>

                    <Form.Item name="technical_inspection_found_info" label="Информация о техосмотре">
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item name="imported" label="Информация о ввозе">
                        <Input />
                    </Form.Item>

                    <Form.Item name="imported_info" label="Дополнительно о ввозе">
                        <TextArea rows={2} />
                    </Form.Item>

                    <Form.Item name="insurance_found" label="Страховка">
                        <Input />
                    </Form.Item>

                    <Form.Item name="recall_campaigns_found" label="Отзывные кампании">
                        <Input />
                    </Form.Item>

                    <Form.Item name="recall_campaigns_found_info" label="Информация об отзывных кампаниях">
                        <TextArea rows={3} />
                    </Form.Item>
                </Card>

                <Card style={{ marginTop: '20px' }}>
                    <Title level={2}>Изображения автомобиля</Title>

                    <Form.List
                        name="images"
                        rules={[
                            {
                                validator: async (_, images) => {
                                    if (!images || images.length < 1) {
                                        return Promise.reject(new Error('Добавьте хотя бы одно изображение'));
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field) => (
                                    <Form.Item required={false} key={field.key} style={{ marginBottom: '10px' }}>
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: 'Введите URL изображения или удалите поле',
                                                },
                                                {
                                                    type: 'url',
                                                    message: 'Введите корректный URL',
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input
                                                placeholder="URL изображения"
                                                style={{ width: 'calc(100% - 40px)' }}
                                            />
                                        </Form.Item>
                                        {fields.length > 1 && (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                                style={{ margin: '0 8px' }}
                                            />
                                        )}
                                    </Form.Item>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        icon={<PlusOutlined />}
                                        style={{ width: '100%' }}
                                    >
                                        Добавить изображение
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Card>

                <Card style={{ marginTop: '20px' }}>
                    <Title level={2}>Категории и дополнительные характеристики</Title>

                    <Form.List name="categoryExtras" initialValue={[{}]}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{
                                            display: 'flex',
                                            marginBottom: 8,
                                            alignItems: 'flex-start',
                                        }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'category_id']}
                                            rules={[{ required: true, message: 'Выберите категорию' }]}
                                        >
                                            <Select
                                                style={{ width: '200px' }}
                                                placeholder="Выберите категорию"
                                                showSearch
                                                optionFilterProp="children"
                                            >
                                                {categories.map((category: BaseEditElement) => (
                                                    <Select.Option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, 'extra_ids']}
                                            rules={[{ required: true, message: 'Выберите характеристики' }]}
                                        >
                                            <Select
                                                style={{ width: '400px' }}
                                                placeholder="Выберите характеристики"
                                                showSearch
                                                optionFilterProp="children"
                                            >
                                                {extras
                                                    .sort((a, b) => a.name.localeCompare(b.name))
                                                    .map((extra: BaseEditElement) => (
                                                        <Select.Option key={extra.id} value={extra.id}>
                                                            {extra.name}
                                                        </Select.Option>
                                                    ))}
                                            </Select>
                                        </Form.Item>

                                        {fields.length > 1 && (
                                            <MinusCircleOutlined
                                                onClick={() => remove(name)}
                                                style={{
                                                    marginLeft: '8px',
                                                    color: '#999',
                                                    fontSize: '20px',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        )}
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Добавить категорию с характеристиками
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Card>

                <Form.Item style={{ marginTop: '20px' }}>
                    <Button type="primary" htmlType="submit" size="large">
                        Добавить автомобиль
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
