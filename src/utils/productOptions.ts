import { Product } from "../types/product"

const normalizeOptionKey = (value: string) =>
    value
        .trim()
        .toLowerCase()
        .replace(/[^a-zа-яё0-9]+/gi, "-")
        .replace(/^-+|-+$/g, "")

export const getModelSelectLabel = (product: Product) =>
    product.modelSelectLabel ?? "Выбрать модель"

export const buildModelConfiguredProduct = (product: Product, model: string): Product => ({
    ...product,
    cartKey: `${product.id}-model-${normalizeOptionKey(model)}`,
    configuration: {
        type: "model",
        title: "Параметры запчасти",
        details: [{ name: "Модель", value: model }],
    },
})
