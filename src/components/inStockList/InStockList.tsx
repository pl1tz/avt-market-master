import React from 'react';
import styles from './InStockList.module.scss';
import { Link } from 'react-router-dom';
import { Loader } from '../loader/Loader';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useInStockList } from '../../hook/useInStockList';

export const InStockList = (): React.JSX.Element => {
    const {
        isLoading,
        error,
        visibleMore,
        listData: { currentModels, currentGenerations, visibleItems },
        params: { brandParam, modelParam, generationParam },
        handlers: { handleMoreButton, handleBrandClick, handleModelClick, handleGenerationClick },
    } = useInStockList();

    if (isLoading) return <Loader />;
    if (error) return <>Ошибка загрузки списка машин</>;

    if (!brandParam && !modelParam && !generationParam) {
        return (
            <div>
                <ul className={styles.in_stock__list}>
                    {[...visibleItems]
                        .sort((a, b) => a.brand.localeCompare(b.brand))
                        .map((car) => (
                            <li className={styles.in_stock__item} key={car.brand}>
                                <h3 className={styles.in_stock__name}>{car.brand}</h3>
                                <span className={styles.in_stock__count}>{car.total}</span>
                                <Link
                                    className={styles.in_stock__link}
                                    to={`/cars?brand_name=${car.brand}`}
                                    onClick={() => handleBrandClick(car.brand!)}
                                    state={{ from: 'inStockList' }}
                                />
                            </li>
                        ))}
                </ul>
                <button className={styles.in_stock__btn_more} onClick={handleMoreButton} type="button">
                    Показать больше марок{' '}
                    {visibleMore ? (
                        <ArrowUpOutlined className={styles.in_stock__arrow_icon} />
                    ) : (
                        <ArrowDownOutlined className={styles.in_stock__arrow_icon} />
                    )}
                </button>
            </div>
        );
    }

    if (brandParam && !modelParam && !generationParam) {
        return (
            <ul className={styles.in_stock__list} style={{ columnCount: 7 }}>
                {currentModels?.map((model) => (
                    <li className={styles.in_stock__item} key={model.name}>
                        <h3 className={styles.in_stock__name}>{model.name}</h3>
                        <span className={styles.in_stock__count}>{model.total}</span>
                        <Link
                            className={styles.in_stock__link}
                            to={`/cars?brand_name=${brandParam}&model_name=${model.name}`}
                            onClick={() => handleModelClick(brandParam, model.name!)}
                            state={{ from: 'inStockList' }}
                        />
                    </li>
                ))}
            </ul>
        );
    }

    if (brandParam && modelParam) {
        return (
            <ul className={styles.in_stock__list}>
                {currentGenerations?.map((generation) => (
                    <li className={styles.in_stock__item} key={generation.name}>
                        <h3 className={styles.in_stock__name}>{generation.name}</h3>
                        <span className={styles.in_stock__count}>{generation.count}</span>

                        <Link
                            className={styles.in_stock__link}
                            to={`/cars?brand_name=${brandParam}&model_name=${modelParam}&generation_name=${generation.name}`}
                            state={{ from: 'inStockList' }}
                            onClick={() => handleGenerationClick(brandParam, modelParam, generation.name!)}
                        />
                    </li>
                ))}
            </ul>
        );
    }

    return <></>;
};
