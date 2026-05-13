export type Product = {
    id: number
    name: string
    category: "all" | "отопители" | "fans" | "Теплообменники" | "parts"
    image: string
    images: string[]
    imageDescriptions?: string[]
    inStock: boolean
    warranty: string
    price: number
    description: string
    fullDescription: string
    specifications?: Record<string, string>
    archiveUrl?: string // ссылка на архив или undefined
}

export type ProductCategory = {
    id: string
    name: string
    count: number
}
