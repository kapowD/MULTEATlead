import { Search } from "lucide-react"
import React from "react"

import { categories } from "../../catalog/products"
import styles from "./ProductFilter.module.scss"

interface ProductFilterProps {
    selectedCategory: string
    onCategoryChange: (category: string) => void
    searchTerm: string
    onSearchChange: (term: string) => void
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
    selectedCategory,
    onCategoryChange,
    searchTerm,
    onSearchChange,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.searchSection}>
                <div className={styles.searchWrapper}>
                    <Search size={20} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Найти товар или модель"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className={styles.searchInput}
                        aria-label="Поиск товаров"
                    />
                </div>
            </div>

            <div className={styles.filterSection}>
                <div className={styles.categories} role="group" aria-label="Категории товаров">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            type="button"
                            aria-pressed={selectedCategory === category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`${styles.categoryChip} ${
                                selectedCategory === category.id ? styles.active : ""
                            }`}
                        >
                            {category.name} <span className={styles.count}>{category.count}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
