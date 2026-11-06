import { RussianRuble as Ruble, Shield } from "lucide-react"
import React from "react"
import { Link, useNavigate } from "react-router-dom"

import { useCart } from "../../context/CartContext"
import { ProductVisual } from "../../shared/ui/ProductVisual/ProductVisual"
import { Product } from "../../types/product"
import styles from "./ProductCard.module.scss"

interface ProductCardProps {
    product: Product
    imageLoading?: "eager" | "lazy"
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, imageLoading = "lazy" }) => {
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
        <div className={styles.cardLink}>
            <div className={styles.card}>
                <Link
                    to={`/product/${product.id}`}
                    className={styles.imageWrapper}
                    aria-label={`Подробнее: ${product.name}`}
                >
                    <ProductVisual
                        product={product}
                        imageClassName={styles.image}
                        iconClassName={styles.configIcon}
                        variant="card"
                        loading={imageLoading}
                    />

                    {/* Оверлей */}
                    <div className={styles.overlay}>Подробнее</div>
                </Link>

                <div className={styles.content}>
                    <h3 className={styles.title}>
                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <p className={styles.description}>{product.description}</p>

                    {product.specifications?.["Тепловая мощность"] && (
                        <p className={styles.specification}>
                            Мощность: <strong>{product.specifications["Тепловая мощность"]}</strong>
                        </p>
                    )}

                    <div className={styles.details}>
                        {product.warranty && (
                            <div className={styles.warranty}>
                                <Shield size={16} />
                                <span>Гарантия: {product.warranty}</span>
                            </div>
                        )}
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
                                  ? (product.modelSelectLabel?.replace(
                                        /^Выберите\s*/i,
                                        "Выбрать "
                                    ) ?? "Выбрать модель")
                                  : inCart
                                    ? "В корзине"
                                    : "Добавить в корзину"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
