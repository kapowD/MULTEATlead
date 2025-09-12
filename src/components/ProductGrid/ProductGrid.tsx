import { Package } from 'lucide-react';
import React from 'react';

import { Product } from '../../types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.scss';

interface ProductGridProps {
    products: Product[];
    loading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, loading = false }) => {
    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <h3>Загрузка товаров...</h3>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className={styles.emptyState}>
                <Package size={64} className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>
                    Товары не найдены
                </h3>
                <p className={styles.emptyDescription}>
                    Попробуйте изменить критерии поиска или выбрать другую категорию
                </p>
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {products.map((product) => (
                <div key={product.id} className={styles.gridItem}>
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};