import { RouteObject } from "react-router-dom"

import Archive from "../pages/archive/Archive"
import AskQuestion from "../pages/askQuestion/AskQuestion"
import Cart from "../pages/Cart/Cart"
// Импорты страниц
import Home from "../pages/home/home"
import HowToBuy from "../pages/how-to-buy/how-to-buy"
import OrderForm from "../pages/Order/OrderForm"
import ProductDetail from "../pages/productDetail/ProductDetail"
import Products from "../pages/products/products"
import VideoSection from "../pages/videos/ui/videos"

// Тип маршрута с метаданными
export type AppRoute = RouteObject & {
    title: string
    description?: string
}

export const routes: AppRoute[] = [
    {
        path: "/",
        element: <Home />,
        title: "MULTEAT – О нас",
        description: "Главная страница магазина MULTEAT.",
    },
    {
        path: "/products",
        element: <Products />,
        title: "MULTEAT – Продукция",
        description: "Просмотр всех товаров и категорий.",
    },
    {
        path: "/product/:id",
        element: <ProductDetail />,
        title: "MULTEAT — Страница товара",
        description: "Детальная страница товара.",
    },
    {
        path: "/how-to-buy",
        element: <HowToBuy />,
        title: "MULTEAT — Как купить",
        description: "Информация о способах оплаты и доставки.",
    },
    {
        path: "/video",
        element: <VideoSection />,
        title: "MULTEAT — Видео",
        description: "Видеообзоры и инструкции по продукции.",
    },
    {
        path: "/archive",
        element: <Archive />,
        title: "MULTEAT — Архив",
        description: "Архив старых коллекций и материалов.",
    },
    {
        path: "/ask",
        element: <AskQuestion />,
        title: "MULTEAT — Задать вопрос",
        description: "Форма для обратной связи и вопросов.",
    },
    {
        path: "/cart",
        element: <Cart />,
        title: "MULTEAT — Корзина",
        description: "Просмотр и редактирование корзины покупок.",
    },
    {
        path: "/order",
        element: <OrderForm />,
        title: "MULTEAT — Оформление заказа",
        description: "Форма оформления заказа и контактных данных.",
    },
]
