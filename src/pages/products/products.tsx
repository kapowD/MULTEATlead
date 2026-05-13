import React, { useMemo, useState } from "react"
import heatSchemeOpen from "../../assets/images/1tep.jpg"
import heatSchemeClosed from "../../assets/images/2tep.jpg"
import { ProductFilter } from "../../components/ProductFilter/ProductFilter"
import { ProductGrid } from "../../components/ProductGrid/ProductGrid"
import { products } from "../../data/products"
import { PageMeta } from "@shared/ui/PageMeta/PageMeta" // ✅ добавлено
import styles from "./products.module.scss"

const categoryDetails = {
    fans: {
        title: "Вентиляторы",
        intro: "Вентиляторы предназначены для быстрого и равномерного прогрева воздуха в помещении.",
        items: [
            "Навесные вентиляторы располагаются непосредственно на отопителе и направленно подают разогретый воздух в помещение.",
            "Потолочные вентиляторы устанавливаются в верхней части помещения на потолке и направляют самый горячий воздух сверху вниз.",
            "В больших помещениях целесообразно ставить несколько потолочных вентиляторов, в самых холодных местах.",
        ],
    },
    Теплообменники: {
        title: "Жаротрубные теплообменники",
        intro: "Теплообменники предназначены для передачи части тепла от выхлопных газов теплогенератора к теплоносителю.",
        items: [
            "В качестве теплогенератора может быть любая печь на любом виде топлива. В качестве теплоносителя используется вода или антифриз.",
            "Универсальные теплообменники МЖТТ-20 и МЖТТ-40 адаптированы к автономным отопителям MULTEAT, но могут применяться и с другими устройствами.",
            "У теплообменников два основных режима работы: при открытой шиберной заслонке газы проходят к выходу почти полностью, при закрытой проходят через жаровые трубы.",
        ],
        schemes: true,
    },
    parts: {
        title: "Запчасти",
        intro: "Раздел запчастей будет содержать отдельные страницы для простых товаров и комплектующих.",
        items: [
            "Сюда будут вынесены тарелки, дефлекторы и другие сменные элементы.",
            "Для части позиций позже появится выбор модели или конфигурации перед добавлением в корзину.",
        ],
    },
}

const Products: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [expandedScheme, setExpandedScheme] = useState<"open" | "closed" | null>(null)

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
    const categoryInfo = categoryDetails[selectedCategory as keyof typeof categoryDetails]

    return (
        <div className={styles.page}>
            {/* ✅ Мета-теги */}
            <PageMeta
                title="MULTEAT — Продукция"
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

                        {"schemes" in categoryInfo && categoryInfo.schemes && (
                            <div
                                className={styles.schemes}
                                aria-label="Схемы работы теплообменника"
                            >
                                <button
                                    type="button"
                                    className={styles.schemeCard}
                                    onClick={() => setExpandedScheme("open")}
                                >
                                    <span className={styles.schemeTitle}>Открытая заслонка</span>
                                    <img
                                        src={heatSchemeOpen}
                                        alt="Схема теплообменника с открытой шиберной заслонкой"
                                        className={styles.schemeImage}
                                    />
                                </button>
                                <button
                                    type="button"
                                    className={styles.schemeCard}
                                    onClick={() => setExpandedScheme("closed")}
                                >
                                    <span className={styles.schemeTitle}>Закрытая заслонка</span>
                                    <img
                                        src={heatSchemeClosed}
                                        alt="Схема теплообменника с закрытой шиберной заслонкой"
                                        className={styles.schemeImage}
                                    />
                                </button>
                            </div>
                        )}
                    </section>
                )}

                <div className={styles.results}>
                    <h2 className={styles.resultCount}>
                        Найдено товаров: {filteredProducts.length}
                    </h2>

                    <ProductGrid products={filteredProducts} />
                </div>
            </div>

            {expandedScheme && (
                <button
                    type="button"
                    className={styles.schemeOverlay}
                    onClick={() => setExpandedScheme(null)}
                    aria-label="Закрыть схему"
                >
                    <span className={styles.schemeModal}>
                        <span className={styles.schemeModalTitle}>
                            {expandedScheme === "open"
                                ? "Открытая шиберная заслонка"
                                : "Закрытая шиберная заслонка"}
                        </span>
                        <img
                            src={expandedScheme === "open" ? heatSchemeOpen : heatSchemeClosed}
                            alt={
                                expandedScheme === "open"
                                    ? "Схема теплообменника с открытой шиберной заслонкой"
                                    : "Схема теплообменника с закрытой шиберной заслонкой"
                            }
                            className={styles.schemeImageLarge}
                        />
                        <span className={styles.schemeHint}>Нажмите, чтобы закрыть</span>
                    </span>
                </button>
            )}
        </div>
    )
}

export default Products
