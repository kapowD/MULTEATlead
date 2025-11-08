import React from "react"
import { useNavigate } from "react-router-dom"
import { PageMeta } from "@shared/ui/PageMeta/PageMeta" // ✅ добавлено
import styles from "./how-to-buy.module.scss"

const HowToBuy = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.wrapper}>
            {/* ✅ Мета-теги */}
            <PageMeta
                title="MULTEAT — Как купить"
                description="Инструкция по покупке и оплате продукции MULTEAT. Доставка, условия и способы оплаты."
            />

            <div className={styles.container}>
                <h1 className={styles.title}>Как купить?</h1>
                <div className={styles.line} />

                <ol className={styles.steps}>
                    <li>Нажмите на кнопку «Продукция».</li>
                    <li>Выберите нужную категорию.</li>
                    <li>Выберите товар и нажмите кнопку «В корзину».</li>
                    <li>
                        Проверьте корзину. Если заказ сформирован — нажмите «Оформить», либо
                        вернитесь обратно для продолжения покупок.
                    </li>
                    <li>Заполните заявку и отправьте её.</li>
                    <li>
                        После этого вам будет выставлен счёт, который можно оплатить в личном
                        кабинете банка или в любом отделении.
                    </li>
                </ol>

                <div className={styles.notice}>
                    <b>
                        * Возможна оплата наложенным платежом при доставке компанией{" "}
                        <span>СДЭК</span>.
                        <br />
                        При этом стоимость товара увеличится на 3%.
                    </b>
                </div>

                <div className={styles.deliveryInfo}>
                    <ul>
                        <li>
                            – Отправка товара производится в течение двух рабочих дней с момента
                            поступления оплаты.
                        </li>
                        <li>
                            – Доставка осуществляется транспортной компанией по выбору покупателя.
                        </li>
                        <li>
                            – По умолчанию используется компания «Деловые линии», но вы можете
                            выбрать другую.
                        </li>
                        <li>– Доставка до терминала транспортной компании — бесплатно.</li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottomBanner}>
                <div className={styles.bottomBannerContent}>
                    <div className={styles.bottomBannerTitle}>Остались вопросы?</div>
                    <div className={styles.bottomBannerSubtitle}>Напишите нам!</div>
                    <button
                        type="button"
                        className={styles.bottomBannerButton}
                        onClick={() => navigate("/ask")}
                        aria-label="Перейти на страницу «Задать вопрос»"
                    >
                        Задать вопрос
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HowToBuy
