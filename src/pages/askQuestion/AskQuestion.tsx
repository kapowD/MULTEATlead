import { ArrowLeft, Mail, MessageSquare, Phone, User, Upload } from "lucide-react"
import { Link } from "react-router-dom"
import React, { useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { PageMeta } from "@shared/ui/PageMeta/PageMeta" // ✅ мета-теги
import styles from "../Order/OrderForm.module.scss"

const AskQuestion: React.FC = () => {
    const navigate = useNavigate()
    const recaptchaRef = useRef<ReCAPTCHA>(null)

    const [formData, setFormData] = useState({
        contactName: "",
        phone: "",
        email: "",
        subject: "",
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
    type FieldName = "contactName" | "phone" | "email"

    const scrollToFieldWithError = (fieldName: FieldName) => {
        const field = document.querySelector<HTMLElement>(`[name="${fieldName}"]`)
        if (!field) return

        field.scrollIntoView({ behavior: "smooth", block: "center" })
        field.focus({ preventScroll: true })
    }

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

    // --- Обработчики ввода ---
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setFormData((prev) => ({ ...prev, file }))
    }

    const handleCaptchaChange = (token: string | null) => setCaptchaToken(token)

    const handleBack = () => {
        if (window.history.length > 2) navigate(-1)
        else navigate("/")
    }

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
        if (formData.phone && !phoneRegex.test(formData.phone.trim())) {
            newErrors.phone = "Введите корректный номер телефона (например, +7 (999) 123-45-67)"
        }

        setErrors(newErrors)
        const firstErrorField = (["contactName", "phone", "email"] as FieldName[]).find(
            (field) => Boolean(newErrors[field])
        )
        if (firstErrorField) scrollToFieldWithError(firstErrorField)

        return Object.keys(newErrors).length === 0
    }

    // --- Отправка формы ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.honeypot) return // антиспам
        if (!validateFields()) return
        if (!captchaToken) {
            toast.warning("⚠️ Подтвердите, что вы не робот")
            return
        }

        setIsSubmitting(true)
        try {
            const formDataToSend = new FormData()
            formDataToSend.append("name", formData.contactName)
            formDataToSend.append("phone", formData.phone.trim() ? formData.phone : "Не указан")
            formDataToSend.append("email", formData.email)
            formDataToSend.append(
                "message",
                `Вопрос MULTEAT\n\nИмя: ${formData.contactName}\nТелефон: ${formData.phone}\nEmail: ${formData.email}\nТема: ${formData.subject}\n\nСообщение:\n${formData.message}\n\nДата: ${new Date().toLocaleString(
                    "ru-RU"
                )}`
            )
            if (formData.file) formDataToSend.append("file", formData.file)

            const response = await fetch("https://cr17192.rinethost.ru/send.php", {
                method: "POST",
                body: formDataToSend,
            })

            const result = await response.text()

            if (result.trim() === "ok") {
                recaptchaRef.current?.reset()
                setCaptchaToken(null)
                toast.success("Вопрос успешно отправлен!")
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

    return (
        <div className={styles.page}>
            {/* ✅ Мета-теги */}
            <PageMeta
                title="MULTEAT — Задать вопрос"
                description="Форма для обратной связи и вопросов."
            />

            <div className={styles.container}>
                <Link to="/" className={styles.backButton} aria-label="Назад">
                    <ArrowLeft size={20} />
                    Назад
                </Link>

                <div className={styles.formSection}>
                    <div className={styles.formCard}>
                        <h1 className={styles.title}>Задать вопрос</h1>
                        <p className={styles.subtitle}>
                            Поля, отмеченные «*», обязательны для заполнения.
                        </p>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            {/* honeypot */}
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
                                    <User size={18} /> Имя*
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
                                    <p className={styles.errorText}>{errors.contactName}</p>
                                )}
                            </div>

                            {/* Телефон */}
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    <Phone size={18} /> Телефон
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
                                />
                                {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
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
                                {errors.email && <p className={styles.errorText}>{errors.email}</p>}
                            </div>

                            {/* Тема */}
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Тема</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    placeholder="Коротко опишите вопрос"
                                />
                            </div>

                            {/* Сообщение */}
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    <MessageSquare size={18} /> Сообщение*
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className={styles.textarea}
                                    rows={6}
                                    required
                                    placeholder="Опишите ваш вопрос"
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
            </div>
        </div>
    )
}

export default AskQuestion
