import React, { useMemo, useState } from "react"
import { ProductFilter } from "../../components/ProductFilter/ProductFilter"
import { ProductGrid } from "../../components/ProductGrid/ProductGrid"
import { products } from "../../data/products"
import { PageMeta } from "@shared/ui/PageMeta/PageMeta" // ✅ добавлено
import styles from "./products.module.scss"

const Products: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [searchTerm, setSearchTerm] = useState<string>("")

    const filteredProducts = useMemo(() => {
        let filtered = products

        if (selectedCategory !== "all") {
            filtered = filtered.filter((product) => product.category === selectedCategory)
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim()
            filtered = filtered.filter(
                (product) =>
                    product.name.toLowerCase().includes(term) ||
                    product.description.toLowerCase().includes(term)
            )
        }

        return filtered
    }, [selectedCategory, searchTerm])

    const handleCategoryChange = (category: string) => setSelectedCategory(category)
    const handleSearchChange = (term: string) => setSearchTerm(term)

    return (
        <div className={styles.page}>
            {/* ✅ Мета-теги */}
            <PageMeta
                title="MULTEAT — Каталог продукции"
                description="Каталог продукции MULTEAT: топливные системы, фильтры, комплектующие и другие товары. Найдите нужную деталь по категории или названию."
            />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Каталог</h1>
                    {/* <p className={styles.subtitle}>Широкий ассортимент продукции MULTEAT</p> */}
                </div>

                <ProductFilter
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                />

                <div className={styles.results}>
                    <h2 className={styles.resultCount}>
                        Найдено товаров: {filteredProducts.length}
                    </h2>

                    <ProductGrid products={filteredProducts} />
                </div>
            </div>
        </div>
    )
}

export default Products
