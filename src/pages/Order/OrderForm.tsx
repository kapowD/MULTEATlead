import {
    ArrowLeft,
    Mail,
    Package,
    Phone,
    RussianRuble as Ruble,
    Upload,
    User,
} from "lucide-react"
import React, { useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { PageMeta } from "@shared/ui/PageMeta/PageMeta" // ✅ добавили
import styles from "./OrderForm.module.scss"
import { toast } from "sonner"

const OrderForm: React.FC = () => {
    const { state, clearCart } = useCart()
    const navigate = useNavigate()
    const recaptchaRef = useRef<ReCAPTCHA>(null)

    const [formData, setFormData] = useState({
        contactName: "",
        phone: "",
        email: "",
        message: "",
        file: null as File | null,
        honeypot: "",
    })

    const [errors, setErrors] = useState<{
        email?: string
        phone?: string
        contactName?: string
    }>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("ru-RU").format(price)

    // --- Форматирование телефона ---
    const formatPhoneNumber = (value: string): string => {
        const digits = value.replace(/\D/g, "").substring(0, 11)
        if (!digits) return ""

        const normalized = digits[0] === "8" ? "7" + digits.slice(1) : digits
        let formatted = "+7"

        if (normalized.length > 1) formatted += " (" + normalized.slice(1, 4)
        if (normalized.length >= 5) formatted += ") " + normalized.slice(4, 7)
        if (normalized.length >= 8) formatted += "-" + normalized.slice(7, 9)
        if (normalized.length >= 10) formatted += "-" + normalized.slice(9, 11)

        return formatted
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setFormData((prev) => ({ ...prev, file }))
    }

    const handleCaptchaChange = (token: string | null) => setCaptchaToken(token)

    // --- Валидация ---
    const validateFields = (): boolean => {
        const newErrors: { email?: string; phone?: string; contactName?: string } = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/
        const nameRegex = /^[А-Яа-яA-Za-zЁё\s'-]{2,}$/

        if (!nameRegex.test(formData.contactName.trim())) {
            newErrors.contactName = "Введите корректное имя (только буквы)"
        }
        if (!emailRegex.test(formData.email.trim())) {
            newErrors.email = "Введите корректный email (например, example@mail.ru)"
        }
        if (!phoneRegex.test(formData.phone.trim())) {
            newErrors.phone =
                "Введите корректный номер телефона (например, +7 (999) 123-45-67)"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // --- Генерация текста заказа ---
    const generateOrderMessage = () => {
        let message = `НОВЫЙ ЗАКАЗ\n\n`
        message += `Контактная информация:\n`
        message += `Имя: ${formData.contactName}\n`
        message += `Телефон: ${formData.phone}\n`
        message += `Email: ${formData.email}\n\n`

        message += `Заказанные товары:\n`
        state.items.forEach((item, index) => {
            message += `${index + 1}. ${item.product.name}\n`
            message += `   Количество: ${item.quantity} шт.\n`
            message += `   Цена за единицу: ${formatPrice(item.product.price)} ₽\n`
            message += `   Сумма: ${formatPrice(
                item.product.price * item.quantity
            )} ₽\n\n`
        })

        message += `ИТОГО:\nТоваров: ${state.itemCount} шт.\nОбщая сумма: ${formatPrice(
            state.total
        )} ₽\n\n`

        if (formData.message) {
            message += `Комментарий:\n${formData.message}\n\n`
        }

        message += `Дата заказа: ${new Date().toLocaleString("ru-RU")}`
        return message
    }

    // --- Отправка формы ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.honeypot) return
        if (!validateFields()) return

        if (!captchaToken) {
            toast.warning("⚠️ Подтвердите, что вы не робот")
            return
        }

        setIsSubmitting(true)
        try {
            const formDataToSend = new FormData()
            formDataToSend.append("name", formData.contactName)
            formDataToSend.append("phone", formData.phone)
            formDataToSend.append("email", formData.email)
            formDataToSend.append("message", generateOrderMessage())
            if (formData.file) formDataToSend.append("file", formData.file)

            const response = await fetch("https://cr17192.rinethost.ru/send.php", {
                method: "POST",
                body: formDataToSend,
            })

            const result = await response.text()

            if (result.trim() === "ok") {
                clearCart()
                recaptchaRef.current?.reset()
                setCaptchaToken(null)
                toast.success("✅ Заказ успешно отправлен!")
                navigate("/")
            } else {
                console.error("Server response:", result)
                toast.error("❌ Ошибка при отправке: " + result)
            }
        } catch (error) {
            console.error("Fetch error:", error)
            toast.error("❌ Ошибка соединения с сервером")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (state.items.length === 0) {
        navigate("/products")
        return null
    }

    return (
        <div className={styles.page}>
            {/* ✅ Мета-теги */}
            <PageMeta
                title="MULTEAT — Оформление заказа"
                description="Страница оформления заказа в магазине MULTEAT. Заполните контактные данные и отправьте заявку."
            />

            <div className={styles.container}>
                <Link to="/cart" className={styles.backButton}>
                    <ArrowLeft size={20} /> Вернуться в корзину
                </Link>

                <div className={styles.formLayout}>
                    <div className={styles.formSection}>
                        <div className={styles.formCard}>
                            <h1 className={styles.title}>Заявка</h1>

                            <form onSubmit={handleSubmit} className={styles.form}>
                                <input
                                    type="text"
                                    name="honeypot"
                                    value={formData.honeypot}
                                    onChange={handleInputChange}
                                    style={{ display: "none" }}
                                />

                                {/* Имя */}
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        <User size={18} /> Контактное лицо*
                                    </label>
                                    <input
                                        type="text"
                                        name="contactName"
                                        value={formData.contactName}
                                        onChange={handleInputChange}
                                        placeholder="Иван Иванов"
                                        className={`${styles.input} ${
                                            errors.contactName ? styles.inputError : ""
                                        }`}
                                        required
                                    />
                                    {errors.contactName && (
                                        <p className={styles.errorText}>
                                            {errors.contactName}
                                        </p>
                                    )}
                                </div>

                                {/* Телефон */}
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        <Phone size={18} /> Телефон*
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={(e) => {
                                            const formatted = formatPhoneNumber(e.target.value)
                                            setFormData((prev) => ({
                                                ...prev,
                                                phone: formatted,
                                            }))
                                            setErrors((prev) => ({ ...prev, phone: undefined }))
                                        }}
                                        placeholder="+7 (999) 000-00-00"
                                        className={`${styles.input} ${
                                            errors.phone ? styles.inputError : ""
                                        }`}
                                        required
                                    />
                                    {errors.phone && (
                                        <p className={styles.errorText}>{errors.phone}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        <Mail size={18} /> Email*
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="example@mail.ru"
                                        className={`${styles.input} ${
                                            errors.email ? styles.inputError : ""
                                        }`}
                                        required
                                    />
                                    {errors.email && (
                                        <p className={styles.errorText}>{errors.email}</p>
                                    )}
                                </div>

                                {/* Сообщение */}
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Сообщение*</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className={styles.textarea}
                                        rows={6}
                                        required
                                        placeholder="Введите сообщение"
                                    />
                                </div>

                                {/* Файл */}
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        <Upload size={18} /> Прикрепить файл
                                    </label>
                                    <div className={styles.fileUpload}>
                                        <input
                                            type="file"
                                            id="file"
                                            onChange={handleFileChange}
                                            className={styles.fileInput}
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                        />
                                        <label htmlFor="file" className={styles.fileButton}>
                                            Выбрать файл...
                                        </label>
                                        {formData.file && (
                                            <span className={styles.fileName}>
                                                {formData.file.name}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* reCAPTCHA */}
                                <div className={styles.captchaContainer}>
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey={
                                            import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
                                            "YOUR_RECAPTCHA_SITE_KEY"
                                        }
                                        onChange={handleCaptchaChange}
                                        theme="light"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                    disabled={isSubmitting || !captchaToken}
                                >
                                    {isSubmitting ? "ОТПРАВЛЯЕТСЯ..." : "ОТПРАВИТЬ"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Сводка заказа */}
                    <div className={styles.orderSummary}>
                        <div className={styles.summaryCard}>
                            <h3 className={styles.summaryTitle}>
                                <Package size={24} /> Ваш заказ
                            </h3>

                            <div className={styles.orderItems}>
                                {state.items.map((item) => (
                                    <div key={item.product.id} className={styles.orderItem}>
                                        <div className={styles.itemImage}>
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                            />
                                        </div>
                                        <div className={styles.itemDetails}>
                                            <h4 className={styles.itemName}>
                                                {item.product.name}
                                            </h4>
                                            <div className={styles.itemQuantity}>
                                                {item.quantity} шт. ×{" "}
                                                {formatPrice(item.product.price)} ₽
                                            </div>
                                            <div className={styles.itemTotal}>
                                                <Ruble size={16} />
                                                {formatPrice(
                                                    item.product.price * item.quantity
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderForm
