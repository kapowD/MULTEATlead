export type ProductCategory = "heaters" | "fans" | "parts"

export type Product = {
    id: number
    name: string
    category: ProductCategory
    image: string
    images: string[]
    imageDescriptions?: string[]
    warranty?: string
    price: number
    description: string
    fullDescription: string
    specifications?: Record<string, string>
    archiveUrl?: string
    constructorType?: "chimney"
    modelOptions?: string[]
    modelSelectLabel?: string
    modelOptionLabel?: string
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

export type ProductCategoryOption = {
    id: ProductCategory | "all"
    name: string
    count: number
}
