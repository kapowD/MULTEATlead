import { Check, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import React, { useMemo, useState } from "react"
import { Product } from "../../types/product"
import styles from "./ChimneyConstructor.module.scss"

type Diameter = 120 | 140

type ChimneyPart = {
    id: string
    name: string
    prices: Record<Diameter, number>
}

type SelectedPart = {
    id: string
    name: string
    diameter: Diameter
    quantity: number
    price: number
}

const DIAMETERS: Diameter[] = [120, 140]

const CHIMNEY_PARTS: ChimneyPart[] = [
    { id: "pipe-500", name: "Труба, L(500мм)", prices: { 120: 540, 140: 660 } },
    { id: "pipe-1000", name: "Труба, L(1000мм)", prices: { 120: 900, 140: 1100 } },
    { id: "angle-135", name: "Угол 135°", prices: { 120: 590, 140: 780 } },
    { id: "angle-90", name: "Угол 90°", prices: { 120: 650, 140: 815 } },
    { id: "tee", name: "Тройник (без стакана)", prices: { 120: 1120, 140: 1300 } },
    { id: "cup", name: "Стакан", prices: { 120: 300, 140: 370 } },
    { id: "cap", name: "Зонт", prices: { 120: 600, 140: 800 } },
    { id: "clamp", name: "Хомут усил.", prices: { 120: 180, 140: 180 } },
]

interface ChimneyConstructorProps {
    product: Product
    addItem: (product: Product) => void
}

const formatPrice = (price: number) => new Intl.NumberFormat("ru-RU").format(price)

export const ChimneyConstructor: React.FC<ChimneyConstructorProps> = ({ product, addItem }) => {
    const [diameter, setDiameter] = useState<Diameter>(120)
    const [selectedPartId, setSelectedPartId] = useState(CHIMNEY_PARTS[0].id)
    const [quantity, setQuantity] = useState(1)
    const [selectedParts, setSelectedParts] = useState<SelectedPart[]>([])

    const selectedPart = useMemo(
        () => CHIMNEY_PARTS.find((part) => part.id === selectedPartId) ?? CHIMNEY_PARTS[0],
        [selectedPartId]
    )

    const selectedPrice = selectedPart.prices[diameter]
    const selectedTotal = selectedPrice * quantity
    const total = selectedParts.reduce((sum, part) => sum + part.price * part.quantity, 0)

    const addToList = () => {
        const itemKey = `${selectedPart.id}-${diameter}`
        setSelectedParts((items) => {
            const existing = items.find((item) => item.id === itemKey)

            if (existing) {
                return items.map((item) =>
                    item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
                )
            }

            return [
                ...items,
                {
                    id: itemKey,
                    name: selectedPart.name,
                    diameter,
                    quantity,
                    price: selectedPrice,
                },
            ]
        })
        setQuantity(1)
    }

    const removeFromList = (id: string) => {
        setSelectedParts((items) => items.filter((item) => item.id !== id))
    }

    const sendToCart = () => {
        selectedParts.forEach((item) => {
            const configuredProduct: Product = {
                ...product,
                name: `Дымоход: ${item.name}, ${item.diameter} мм`,
                price: item.price,
                description: "Элемент дымохода из конструктора",
                cartKey: `${product.id}-chimney-${item.id}`,
                configuration: {
                    type: "chimney",
                    title: "Конфигурация дымохода",
                    details: [
                        { name: "Элемент", value: item.name },
                        { name: "Диаметр", value: `${item.diameter} мм` },
                    ],
                },
            }

            addItem(configuredProduct)
            for (let index = 1; index < item.quantity; index += 1) {
                addItem(configuredProduct)
            }
        })
        setSelectedParts([])
    }

    return (
        <section className={styles.constructor} aria-label="Конструктор дымохода">
            <div className={styles.configPanel}>
                <div className={styles.header}>
                    <div>
                        <h2>Конструктор дымохода</h2>
                        <p>Сначала выберите диаметр, затем элемент по таблице цен.</p>
                    </div>
                </div>

                <div className={styles.topControls}>
                    <div className={styles.controlBlock}>
                        <span className={styles.controlLabel}>1. Диаметр</span>
                        <div className={styles.diameterButtons} aria-label="Диаметр дымохода">
                            {DIAMETERS.map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    className={`${styles.diameterButton} ${
                                        diameter === value ? styles.active : ""
                                    }`}
                                    onClick={() => setDiameter(value)}
                                >
                                    {value} мм
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.currentChoice}>
                        <span>Выбрано</span>
                        <strong>{selectedPart.name}</strong>
                        <em>
                            {diameter} мм · {quantity} шт. · {formatPrice(selectedTotal)} ₽
                        </em>
                    </div>
                </div>

                <div className={styles.tableCaption}>
                    <span>2. Элемент</span>
                    <strong>Цена, руб. за 1 шт.</strong>
                </div>
                <div className={styles.priceTableWrap}>
                    <table className={styles.priceTable}>
                        <thead>
                            <tr>
                                <th>Наименование</th>
                                {DIAMETERS.map((value) => (
                                    <th key={value}>{value} мм</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {CHIMNEY_PARTS.map((part) => (
                                <tr key={part.id}>
                                    <td>
                                        <button
                                            type="button"
                                            className={`${styles.partButton} ${
                                                selectedPartId === part.id ? styles.active : ""
                                            }`}
                                            onClick={() => setSelectedPartId(part.id)}
                                        >
                                            {selectedPartId === part.id && <Check size={16} />}
                                            {part.name}
                                        </button>
                                    </td>
                                    {DIAMETERS.map((value) => (
                                        <td key={value}>
                                            <button
                                                type="button"
                                                className={`${styles.priceCellButton} ${
                                                    selectedPartId === part.id && diameter === value
                                                        ? styles.active
                                                        : ""
                                                }`}
                                                onClick={() => {
                                                    setSelectedPartId(part.id)
                                                    setDiameter(value)
                                                }}
                                            >
                                                {formatPrice(part.prices[value])}
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={styles.controlsRow}>
                    <div className={styles.quantityControl}>
                        <span className={styles.controlLabel}>3. Количество</span>
                        <button
                            type="button"
                            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                            disabled={quantity <= 1}
                            aria-label="Уменьшить количество"
                        >
                            <Minus size={16} />
                        </button>
                        <strong>{quantity}</strong>
                        <button
                            type="button"
                            onClick={() => setQuantity((value) => value + 1)}
                            aria-label="Увеличить количество"
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                    <button type="button" className={styles.addButton} onClick={addToList}>
                        Добавить позицию · {formatPrice(selectedTotal)} ₽
                    </button>
                </div>
            </div>

            <div className={styles.summaryPanel}>
                <div className={styles.header}>
                    <div>
                        <h2>Список</h2>
                        <p>Проверьте позиции перед добавлением в корзину.</p>
                    </div>
                </div>

                <div className={styles.summaryList}>
                    <div className={styles.summaryHead}>
                        <span>Наименование</span>
                        <span>Параметры</span>
                        <span>Сумма</span>
                    </div>

                    {selectedParts.length === 0 ? (
                        <div className={styles.emptyCell}>Список пока пуст</div>
                    ) : (
                        selectedParts.map((item) => (
                            <div key={item.id} className={styles.summaryItem}>
                                <div className={styles.summaryName}>{item.name}</div>
                                <div className={styles.summaryMeta}>
                                    <span>{item.diameter} мм</span>
                                    <span>{item.quantity} шт.</span>
                                    <span>{formatPrice(item.price)} ₽/шт.</span>
                                </div>
                                <div className={styles.summaryPrice}>
                                    {formatPrice(item.price * item.quantity)} ₽
                                </div>
                                <button
                                    type="button"
                                    className={styles.removeButton}
                                    onClick={() => removeFromList(item.id)}
                                    aria-label="Удалить позицию"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.summaryFooter}>
                    <strong>Итого: {formatPrice(total)} ₽</strong>
                    <button
                        type="button"
                        className={styles.cartButton}
                        onClick={sendToCart}
                        disabled={selectedParts.length === 0}
                    >
                        <ShoppingCart size={18} />В корзину
                    </button>
                </div>
            </div>
        </section>
    )
}
