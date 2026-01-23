export type Product = {
    id: number
    name: string
    category: "all" | "отопители" | "fans" | "heat-exchangers" | "parts"
    image: string
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
