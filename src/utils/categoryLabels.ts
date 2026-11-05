import type { ProductCategory } from "../types/product"

const categoryLabels: Record<ProductCategory | "all", string> = {
    all: "Все товары",
    heaters: "Отопители и баки",
    fans: "Вентиляторы",
    parts: "Запчасти и дымоходы",
}

export const getCategoryLabel = (category: ProductCategory | "all") => categoryLabels[category]
