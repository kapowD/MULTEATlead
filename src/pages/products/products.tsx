import React, { useMemo, useState } from "react"
import { PageMeta } from "@shared/ui/PageMeta/PageMeta"
import { ProductFilter } from "../../components/ProductFilter/ProductFilter"
import { ProductGrid } from "../../components/ProductGrid/ProductGrid"
import { products } from "../../catalog/products"
import type { ProductCategory } from "../../types/product"
import styles from "./products.module.scss"

const categoryDetails: Record<ProductCategory, { title: string; intro: string; items: string[] }> =
    {
        heaters: {
            title: "Отопители и топливные баки",
            intro: "Автономные отопители MULTEAT для нежилых помещений и комплектующие к ним.",
            items: [
                "Модели TEX 20 и NEXT 20P рассчитаны на помещения объёмом до 200 м³.",
                "Модели CUB 40 и BUC 40 рассчитаны на помещения объёмом до 800 м³.",
                "Для TEX 20 и NEXT 20P можно отдельно заказать топливный бак MULTEAT 20.",
            ],
        },
        fans: {
            title: "Вентиляторы",
            intro: "Вентиляторы помогают быстрее и равномернее прогревать воздух в помещении.",
            items: [
                "Навесной ВМУ 230-16 устанавливается непосредственно на отопитель.",
                "Потолочный ВП 300-34 направляет скопившийся под потолком тёплый воздух вниз.",
                "В больших помещениях можно установить несколько потолочных вентиляторов в холодных зонах.",
            ],
        },
        parts: {
            title: "Запчасти и дымоходы",
            intro: "Сменные детали для отопителей MULTEAT и элементы дымохода.",
            items: [
                "Для части запчастей перед добавлением в корзину нужно выбрать совместимую модель или деталь.",
                "При заказе седла, подвески, рычага или заслонки укажите модель отопителя и год выпуска в комментарии.",
                "Для дымохода указан материал AISI 430 толщиной 0,5 мм; состав и стоимость комплекта можно собрать в конструкторе.",
            ],
        },
    }

const Products: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [searchTerm, setSearchTerm] = useState("")

    const filteredProducts = useMemo(() => {
        const normalizedTerm = searchTerm.trim().toLocaleLowerCase("ru-RU")

        return products.filter((product) => {
            const matchesCategory =
                selectedCategory === "all" || product.category === selectedCategory
            if (!matchesCategory) return false
            if (!normalizedTerm) return true

            const searchableText = [
                product.name,
                product.description,
                product.fullDescription,
                ...Object.entries(product.specifications ?? {}).flat(),
            ]
                .join(" ")
                .toLocaleLowerCase("ru-RU")

            return searchableText.includes(normalizedTerm)
        })
    }, [selectedCategory, searchTerm])

    const categoryInfo =
        selectedCategory === "all"
            ? undefined
            : categoryDetails[selectedCategory as ProductCategory]

    return (
        <div className={styles.page}>
            <PageMeta
                title="MULTEAT — Каталог продукции"
                description="Каталог отопителей MULTEAT, вентиляторов, топливных баков, запчастей и дымоходов."
            />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Каталог</h1>
                </div>

                <ProductFilter
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />

                {categoryInfo && (
                    <section className={styles.categoryInfo} aria-label={categoryInfo.title}>
                        <div className={styles.categoryInfoText}>
                            <h2>{categoryInfo.title}</h2>
                            <p>{categoryInfo.intro}</p>
                            <ul>
                                {categoryInfo.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

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
