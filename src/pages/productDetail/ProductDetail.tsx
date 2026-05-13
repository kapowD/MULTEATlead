import {
    Archive,
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Package,
    RussianRuble as Ruble,
    Shield,
} from "lucide-react"
import WinIcon from "../../assets/images/icons/rar.png"
import React, { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { QuantityControl } from "../../components/QuantityControl/QuantityControl"
import { useCart } from "../../context/CartContext"
import { products } from "../../data/products"
import { PageMeta } from "@shared/ui/PageMeta/PageMeta"
import styles from "./ProductDetail.module.scss"

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const { state, addItem, updateQuantity } = useCart()
    const [isWarrantyOpen, setWarrantyOpen] = useState(false)
    const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null)

    const product = products.find((p) => p.id === Number(id))

    const cartItem = useMemo(
        () => state.items.find((i) => i.product.id === Number(id)),
        [state.items, id]
    )
    const inCart = !!cartItem
    const [localQty, setLocalQty] = useState<number>(1)
    const displayQty = inCart ? cartItem!.quantity : localQty

    if (!product) {
        return (
            <div className={styles.notFound}>
                <PageMeta
                    title="Товар не найден — MULTEAT"
                    description="К сожалению, товар не найден. Перейдите в каталог продукции MULTEAT, чтобы выбрать другой товар."
                />
                <h1>Товар не найден</h1>
                <Link to="/products" className={styles.backLink}>
                    <ArrowLeft size={20} />
                    Вернуться к каталогу
                </Link>
            </div>
        )
    }

    const formatPrice = (price: number) => new Intl.NumberFormat("ru-RU").format(price)
    const isPdfLink = (url: string) => /\.pdf($|\?)/i.test(url)
    const currentImageDescription =
        product.imageDescriptions?.[currentImageIndex] ?? `${product.name}: фото ${currentImageIndex + 1}`
    const expandedImageDescription =
        expandedImageIndex === null
            ? ""
            : product.imageDescriptions?.[expandedImageIndex] ??
              `${product.name}: фото ${expandedImageIndex + 1}`

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
    }

    const increase = () => {
        if (inCart) updateQuantity(product.id, cartItem!.quantity + 1)
        else setLocalQty((q) => q + 1)
    }

    const decrease = () => {
        if (inCart) updateQuantity(product.id, Math.max(1, cartItem!.quantity - 1))
        else setLocalQty((q) => Math.max(1, q - 1))
    }

    const handleAddToCart = () => {
        if (inCart) return
        addItem(product)
        if (localQty > 1) updateQuantity(product.id, localQty)
    }

    return (
        <div className={styles.page}>
            {/* ✅ Мета-теги с динамическими данными */}
            <PageMeta
                title={`MULTEAT — ${product.name}`}
                description={`Подробная информация о товаре ${product.name}. Цена: ${formatPrice(
                    product.price
                )} ₽. ${product.warranty ? "Гарантия: " + product.warranty : ""}`}
            />

            <div className={styles.container}>
                <Link to="/products" className={styles.backButton}>
                    <ArrowLeft size={20} />
                    Вернуться к каталогу
                </Link>

                <div className={styles.productLayout}>
                    <div className={styles.imageSection}>
                        <div className={styles.mainImageWrapper}>
                            <button
                                type="button"
                                className={styles.mainImageButton}
                                onClick={() => setExpandedImageIndex(currentImageIndex)}
                                aria-label="Открыть изображение крупнее"
                            >
                                <img
                                    src={product.images[currentImageIndex]}
                                    alt={currentImageDescription}
                                    className={styles.mainImage}
                                />
                            </button>

                            {product.images.length > 1 && (
                                <>
                                    <button
                                        className={`${styles.navButton} ${styles.prevButton}`}
                                        onClick={prevImage}
                                        title="Предыдущее изображение"
                                        aria-label="Предыдущее изображение"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        className={`${styles.navButton} ${styles.nextButton}`}
                                        onClick={nextImage}
                                        title="Следующее изображение"
                                        aria-label="Следующее изображение"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}

                            <div className={styles.statusBadge}>
                                <span
                                    className={`${styles.badge} ${
                                        product.inStock ? styles.inStock : styles.outOfStock
                                    }`}
                                >
                                    <Package size={16} />
                                    {product.inStock ? "В наличии" : "Под заказ"}
                                </span>
                            </div>
                        </div>

                        <p className={styles.imageCaption}>{currentImageDescription}</p>

                        {product.images.length > 1 && (
                            <div className={styles.thumbnails}>
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.thumbnail} ${
                                            index === currentImageIndex
                                                ? styles.activeThumbnail
                                                : ""
                                        }`}
                                        onClick={() => setCurrentImageIndex(index)}
                                        aria-label={
                                            product.imageDescriptions?.[index] ??
                                            `${product.name}: фото ${index + 1}`
                                        }
                                    >
                                        <img
                                            src={image}
                                            alt={
                                                product.imageDescriptions?.[index] ??
                                                `${product.name} ${index + 1}`
                                            }
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.infoSection}>
                        <h1 className={styles.title}>{product.name}</h1>
                        {product.category && (
                            <p className={styles.category}>Категория: {product.category}</p>
                        )}
                        <div className={styles.priceSection}>
                            <div className={styles.price}>
                                {product.price > 0 && <Ruble size={24} />}
                                <span>
                                    {product.price > 0 ? formatPrice(product.price) : "Под заказ"}
                                </span>
                            </div>
                            <div className={styles.warrantyWrapper}>
                                <button
                                    className={styles.warranty}
                                    onClick={() => setWarrantyOpen((prev) => !prev)}
                                    aria-expanded={isWarrantyOpen}
                                    aria-controls="warranty-info"
                                >
                                    <Shield size={18} />
                                    <span>Гарантия: {product.warranty}</span>
                                </button>

                                {isWarrantyOpen && (
                                    <div id="warranty-info" className={styles.warrantyDropdown}>
                                        <h4>Гарантийные обязательства</h4>
                                        <p>
                                            Производитель гарантирует работу прибора в течение
                                            указанного срока со дня приобретения. Гарантийное
                                            обслуживание осуществляется при условии правильной
                                            установки и эксплуатации устройства, а также отсутствия
                                            внешних повреждений.
                                        </p>
                                        <p className={styles.warning}>
                                            На тарелки и дефлектор гарантия не распространяется!
                                            Тарелку и дефлектор всегда можно заказать на сайте:
                                            <a
                                                href="https://www.multeat.ru"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                www.multeat.ru
                                            </a>
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className={styles.buyRow}>
                                <div className={styles.quantityWrap}>
                                    <QuantityControl
                                        quantity={displayQty}
                                        onIncrease={increase}
                                        onDecrease={decrease}
                                        min={1}
                                    />
                                </div>
                                <button
                                    className={styles.addToCartButton}
                                    onClick={handleAddToCart}
                                    disabled={inCart}
                                    aria-pressed={inCart}
                                    aria-label={
                                        inCart ? "Товар уже в корзине" : "Добавить в корзину"
                                    }
                                >
                                    {inCart
                                        ? "В корзине"
                                        : product.inStock
                                          ? "Добавить в корзину"
                                          : "Заказать"}
                                </button>
                            </div>
                        </div>

                        <div className={styles.description}>
                            <h3>Описание</h3>
                            <p>{product.fullDescription}</p>
                        </div>

                        {product.archiveUrl &&
                            (isPdfLink(product.archiveUrl) ? (
                                <a
                                    href={product.archiveUrl}
                                    className={styles.downloadButton}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Открыть PDF-инструкцию"
                                >
                                    PDF-инструкция {product.name}
                                    <img
                                        src={WinIcon}
                                        alt="WinRAR"
                                        width={20}
                                        height={20}
                                        className={styles.pdfIcon}
                                    />
                                </a>
                            ) : (
                                <Link
                                    to={product.archiveUrl}
                                    className={styles.downloadButton}
                                    title="Перейти в архив документов PDF"
                                >
                                    Перейти в архив PDF
                                    <img
                                        src={WinIcon}
                                        alt="WinRAR"
                                        width={20}
                                        height={20}
                                        className={styles.pdfIcon}
                                    />
                                </Link>
                            ))}

                    </div>

                    {product.specifications && (
                        <div className={styles.specifications}>
                            <h3>Технические характеристики</h3>
                            <div className={styles.specGrid}>
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className={styles.specItem}>
                                        <span className={styles.specKey}>{key}:</span>
                                        <span className={styles.specValue}>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {expandedImageIndex !== null && (
                <div
                    className={styles.imageOverlay}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Просмотр изображения товара"
                    onClick={() => setExpandedImageIndex(null)}
                >
                    <div className={styles.imageModal} onClick={(event) => event.stopPropagation()}>
                        <button
                            type="button"
                            className={styles.imageModalClose}
                            onClick={() => setExpandedImageIndex(null)}
                            aria-label="Закрыть изображение"
                        >
                            ×
                        </button>
                        <img
                            src={product.images[expandedImageIndex]}
                            alt={expandedImageDescription}
                            className={styles.expandedImage}
                        />
                        <p className={styles.expandedImageCaption}>{expandedImageDescription}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetail
