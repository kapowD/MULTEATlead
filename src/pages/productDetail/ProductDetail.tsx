import { PageMeta } from "@shared/ui/PageMeta/PageMeta"
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    RussianRuble as Ruble,
    Shield,
} from "lucide-react"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"

import WinIcon from "../../assets/images/icons/rar.png"
import { products } from "../../catalog/products"
import { ChimneyConstructor } from "../../components/ChimneyConstructor/ChimneyConstructor"
import Modal from "../../components/Modal/Modal"
import { QuantityControl } from "../../components/QuantityControl/QuantityControl"
import { getCartItemKey, useCart } from "../../context/CartContext"
import { showCartAdded } from "../../shared/ui/CartAddedNotice/CartAddedNotice"
import { ProductVisual } from "../../shared/ui/ProductVisual/ProductVisual"
import { getCategoryLabel } from "../../utils/categoryLabels"
import { buildModelConfiguredProduct, getModelSelectLabel } from "../../utils/productOptions"
import styles from "./ProductDetail.module.scss"

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const { state, addItem, updateQuantity } = useCart()
    const [isWarrantyOpen, setWarrantyOpen] = useState(false)
    const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null)
    const [selectedModel, setSelectedModel] = useState("")
    const thumbnailsRef = useRef<HTMLDivElement>(null)
    const thumbnailButtonRefs = useRef<Array<HTMLButtonElement | null>>([])

    const product = products.find((p) => p.id === Number(id))
    useEffect(() => {
        setCurrentImageIndex(0)
        setExpandedImageIndex(null)
    }, [id])
    useEffect(() => {
        const track = thumbnailsRef.current
        const activeThumbnail = thumbnailButtonRefs.current[currentImageIndex]
        if (!track || !activeThumbnail) return

        const trackRect = track.getBoundingClientRect()
        const thumbnailRect = activeThumbnail.getBoundingClientRect()
        if (thumbnailRect.left < trackRect.left) {
            track.scrollBy({ left: thumbnailRect.left - trackRect.left - 8, behavior: "smooth" })
        } else if (thumbnailRect.right > trackRect.right) {
            track.scrollBy({ left: thumbnailRect.right - trackRect.right + 8, behavior: "smooth" })
        }
    }, [currentImageIndex])

    const hasModelOptions = Boolean(product?.modelOptions?.length)
    const configuredProduct =
        product && hasModelOptions && selectedModel
            ? buildModelConfiguredProduct(product, selectedModel)
            : product
    const configuredProductKey = configuredProduct ? getCartItemKey(configuredProduct) : ""

    const cartItem = useMemo(
        () =>
            hasModelOptions
                ? state.items.find((i) => getCartItemKey(i.product) === configuredProductKey)
                : state.items.find((i) => i.product.id === Number(id)),
        [configuredProductKey, hasModelOptions, id, state.items]
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
        product.imageDescriptions?.[currentImageIndex] ??
        `${product.name}: фото ${currentImageIndex + 1}`
    const currentImageProduct = {
        ...product,
        image: product.images[currentImageIndex] ?? product.image,
    }
    const expandedImageDescription =
        expandedImageIndex === null
            ? ""
            : (product.imageDescriptions?.[expandedImageIndex] ??
              `${product.name}: фото ${expandedImageIndex + 1}`)

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
    }
    const moveExpandedImage = (direction: -1 | 1) => {
        if (expandedImageIndex === null || product.images.length < 2) return
        const nextIndex =
            (expandedImageIndex + direction + product.images.length) % product.images.length
        setExpandedImageIndex(nextIndex)
        setCurrentImageIndex(nextIndex)
    }

    const increase = () => {
        if (inCart) updateQuantity(configuredProductKey, cartItem!.quantity + 1)
        else setLocalQty((q) => q + 1)
    }

    const decrease = () => {
        if (inCart) updateQuantity(configuredProductKey, Math.max(1, cartItem!.quantity - 1))
        else setLocalQty((q) => Math.max(1, q - 1))
    }

    const handleAddToCart = () => {
        if (!configuredProduct) return
        if (hasModelOptions && !selectedModel) return
        if (inCart) return
        addItem(configuredProduct)
        if (localQty > 1) updateQuantity(getCartItemKey(configuredProduct), localQty)
        showCartAdded(configuredProduct.name, localQty)
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

                <div
                    className={`${styles.productLayout} ${
                        product.constructorType === "chimney" ? styles.configuratorLayout : ""
                    }`}
                >
                    {product.constructorType !== "chimney" && (
                        <div className={styles.imageSection}>
                            <div className={styles.mainImageWrapper}>
                                <button
                                    type="button"
                                    className={styles.mainImageButton}
                                    onClick={() => setExpandedImageIndex(currentImageIndex)}
                                    aria-label="Открыть изображение крупнее"
                                >
                                    <ProductVisual
                                        product={currentImageProduct}
                                        alt={currentImageDescription}
                                        imageClassName={styles.mainImage}
                                        variant="detail"
                                        loading="eager"
                                    />
                                </button>

                                {product.images.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            className={`${styles.navButton} ${styles.prevButton}`}
                                            onClick={prevImage}
                                            title="Предыдущее изображение"
                                            aria-label="Предыдущее изображение"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            type="button"
                                            className={`${styles.navButton} ${styles.nextButton}`}
                                            onClick={nextImage}
                                            title="Следующее изображение"
                                            aria-label="Следующее изображение"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </>
                                )}

                            </div>

                            <p className={styles.imageCaption}>{currentImageDescription}</p>

                            {product.images.length > 1 && (
                                <div className={styles.thumbnails} ref={thumbnailsRef}>
                                    {product.images.map((image, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            ref={(element) => {
                                                thumbnailButtonRefs.current[index] = element
                                            }}
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
                                            <ProductVisual
                                                product={{ ...product, image }}
                                                alt={
                                                    product.imageDescriptions?.[index] ??
                                                    `${product.name} ${index + 1}`
                                                }
                                                variant="thumbnail"
                                                loading={index < 5 ? "eager" : "lazy"}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className={styles.infoSection}>
                        <h1 className={styles.title}>{product.name}</h1>
                        {product.category && (
                            <p className={styles.category}>
                                {/* <span>Категория</span> */}
                                {getCategoryLabel(product.category)}
                            </p>
                        )}
                        {product.constructorType !== "chimney" && (
                            <div className={styles.priceSection}>
                                <div className={styles.price}>
                                    {product.price > 0 && <Ruble size={24} />}
                                    <span>
                                        {product.price > 0
                                            ? formatPrice(product.price)
                                            : "Под заказ"}
                                    </span>
                                </div>
                                {product.warranty && (
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
                                )}

                                {hasModelOptions && (
                                    <label className={styles.modelSelectWrap}>
                                        <span className={styles.modelSelectLabel}>
                                            {getModelSelectLabel(product)}
                                        </span>
                                        <span className={styles.modelSelectShell}>
                                            <select
                                                value={selectedModel}
                                                onChange={(event) =>
                                                    setSelectedModel(event.target.value)
                                                }
                                                className={styles.modelSelect}
                                            >
                                                <option value="">Не выбрана</option>
                                                {product.modelOptions?.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </span>
                                    </label>
                                )}

                                <div className={styles.buyRow}>
                                    <div className={styles.quantityWrap}>
                                        <QuantityControl
                                            quantity={displayQty}
                                            onIncrease={increase}
                                            onDecrease={decrease}
                                            min={1}
                                        />
                                    </div>
                                    {inCart ? (
                                        <Link to="/cart" className={`${styles.addToCartButton} ${styles.cartLink}`}>
                                            Перейти в корзину
                                        </Link>
                                    ) : (
                                        <button
                                            type="button"
                                            className={styles.addToCartButton}
                                            onClick={handleAddToCart}
                                            disabled={hasModelOptions && !selectedModel}
                                        >
                                            {hasModelOptions && !selectedModel
                                                ? getModelSelectLabel(product)
                                                : "Добавить в корзину"}
                                        </button>
                                    )}
                                </div>
                                {inCart && <p className={styles.cartQuantityHint}>Товар в корзине. Количество можно изменить здесь.</p>}
                            </div>
                        )}

                        <div className={styles.description}>
                            {product.constructorType !== "chimney" && <h3>Описание</h3>}
                            {product.fullDescription.split(/\n\s*\n/).map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
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

                    {product.constructorType === "chimney" && (
                        <ChimneyConstructor product={product} addItem={addItem} />
                    )}

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

            {expandedImageIndex !== null && product.constructorType !== "chimney" && (
                <Modal
                    open
                    onClose={() => setExpandedImageIndex(null)}
                    label="Просмотр изображения товара"
                    onPrev={product.images.length > 1 ? () => moveExpandedImage(-1) : undefined}
                    onNext={product.images.length > 1 ? () => moveExpandedImage(1) : undefined}
                >
                    <div className={styles.imageModalContent}>
                        <ProductVisual
                            product={{
                                ...product,
                                image: product.images[expandedImageIndex] ?? product.image,
                            }}
                            alt={expandedImageDescription}
                            imageClassName={styles.expandedImage}
                            loading="eager"
                        />
                        <p className={styles.expandedImageCaption}>{expandedImageDescription}</p>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default ProductDetail
