export type Product = {
    id: number;
    name: string;
    category: 'all' | 'heaters' | 'fans' | 'heat-exchangers' | 'spare-parts';
    image: string;
    inStock: boolean;
    warranty: string;
    price: number;
    description: string;
};

export const products: Product[] = [
    {
        id: 1,
        name: "Отопитель Мультитоп 35D",
        category: "heaters",
        image: "/images/products/heater-35d.jpg",
        inStock: true,
        warranty: "24 месяца",
        price: 45000,
        description: "Мощный отопитель для коммерческого транспорта"
    },
    {
        id: 2,
        name: "Вентилятор ВК-12",
        category: "fans",
        image: "/images/products/fan-vk12.jpg",
        inStock: true,
        warranty: "12 месяцев",
        price: 12000,
        description: "Высокопроизводительный вентилятор"
    },
    {
        id: 3,
        name: "Теплообменник ТО-200",
        category: "heat-exchangers",
        image: "/images/products/heat-exchanger-200.jpg",
        inStock: false,
        warranty: "18 месяцев",
        price: 28000,
        description: "Эффективный теплообменник для систем отопления"
    },
    {
        id: 4,
        name: "Комплект фильтров",
        category: "spare-parts",
        image: "/images/products/filters.jpg",
        inStock: true,
        warranty: "6 месяцев",
        price: 3500,
        description: "Комплект фильтров для отопителей"
    }
]; 