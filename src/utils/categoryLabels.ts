export const categoryLabels: Record<string, string> = {
    all: "Все товары",
    отопители: "Отопители",
    Вентиляторы: "Вентиляторы",
    Теплообменники: "Теплообменники",
    parts: "Запчасти",
}

export const getCategoryLabel = (category: string) => categoryLabels[category] ?? category
