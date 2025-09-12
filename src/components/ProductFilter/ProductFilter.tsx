import { Search } from 'lucide-react';
import React from 'react';

import { categories } from '../../data/products';
import styles from './ProductFilter.module.scss';

interface ProductFilterProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
    selectedCategory,
    onCategoryChange,
    searchTerm,
    onSearchChange
}) => {
    return (
        <div className={styles.container}>
            {/* <div className={styles.searchSection}>
                <h3 className={styles.sectionTitle}>
                    Поиск товаров
                </h3>
                <div className={styles.searchWrapper}>
                    <Search size={20} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Найти товар..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
            </div> */}
            
            <div className={styles.filterSection}>
                <h3 className={styles.sectionTitle}>
                    Категории
                </h3>
                <div className={styles.categories}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`${styles.categoryChip} ${
                                selectedCategory === category.id ? styles.active : ''
                            }`}
                        >
                            {category.name} ({category.count})
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};