import { Package, RussianRuble as Ruble, Shield } from "lucide-react"
import React from "react"
import { Link, useNavigate } from "react-router-dom"

import { useCart } from "../../context/CartContext"
import { Product } from "../../types/product"
import styles from "./ProductCard.module.scss"

interface ProductCardProps {
    product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addItem, hasItem } = useCart()
    const navigate = useNavigate()
    const requiresConfiguration = product.constructorType === "chimney"
    const hasModelOptions = Boolean(product.modelOptions?.length)
    const inCart = hasItem(product.id)

    const formatPrice = (n: number) => new Intl.NumberFormat("ru-RU").format(n)

    const handleAddToCart = (e: React.MouseEvent) => {
        // т.к. карточка — это Link, гасим клик у кнопки
        e.preventDefault()
        e.stopPropagation()
        if (requiresConfiguration || hasModelOptions) {
            navigate(`/product/${product.id}`)
            return
        }
        if (inCart) return
        addItem(product)
    }

    return (
        <Link to={`/product/${product.id}`} className={styles.cardLink}>
            <div className={styles.card}>
                <div className={styles.imageWrapper}>
                    <img src={product.image} alt={product.name} className={styles.image} />
                    <div className={styles.statusBadge}>
                        <span
                            className={`${styles.badge} ${product.inStock ? styles.inStock : styles.outOfStock}`}
                        >
                            <Package size={14} />
                            {product.inStock ? "В наличии" : "Под заказ"}
                        </span>
                    </div>

                    {/* Оверлей */}
                    <div className={styles.overlay}>Подробнее</div>
                </div>

                <div className={styles.content}>
                    <h3 className={styles.title}>{product.name}</h3>
                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.details}>
                        <div className={styles.warranty}>
                            <Shield size={16} />
                            <span>Гарантия: {product.warranty}</span>
                        </div>
                        <div className={styles.price}>
                            {requiresConfiguration ? (
                                <span>Конструктор</span>
                            ) : (
                                <>
                                    {product.price > 0 && <Ruble size={18} />}
                                    <span>
                                        {product.price > 0
                                            ? formatPrice(product.price)
                                            : "Под заказ"}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button
                            className={styles.button}
                            onClick={handleAddToCart}
                            disabled={!requiresConfiguration && !hasModelOptions && inCart}
                        >
                            {requiresConfiguration
                                ? "Настроить"
                                : hasModelOptions
                                  ? "Выбрать модель"
                                  : inCart
                                    ? "В корзине"
                                    : "Добавить в корзину"}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}
