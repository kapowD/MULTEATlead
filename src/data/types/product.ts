export type Product = {
    id: number
    name: string
    category: "all" | "отопители" | "Вентиляторы" | "Теплообменники" | "parts"
    image: string
    images: string[]
    imageDescriptions?: string[]
    inStock: boolean
    warranty: string
    price: number
    description: string
    fullDescription: string
    specifications?: Record<string, string>
    archiveUrl?: string
    constructorType?: "chimney"
    modelOptions?: string[]
    modelSelectLabel?: string
    cartKey?: string
    configuration?: ProductConfiguration
}

export type ProductConfiguration = {
    type: "chimney" | "model"
    title: string
    details: {
        name: string
        value: string
    }[]
}

export type ProductCategory = {
    id: string
    name: string
    count: number
}
