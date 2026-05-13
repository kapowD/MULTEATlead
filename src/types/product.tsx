export type Product = {
    id: number
    name: string
    category: "all" | "отопители" | "Вентиляторы" | "Теплообменники" | "parts"
    image: string
    images?: string[]
    imageDescriptions?: string[]
    inStock: boolean
    warranty: string
    price: number
    description: string
}

export type ProductCategory = {
    id: string
    name: string
    count: number
}
