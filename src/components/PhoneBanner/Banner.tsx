import { Phone } from "lucide-react"

import styles from "./Banner.module.scss"

const Banner = () => {
    return (
        <div className={styles.oilPurchase}>
            <p className={styles.oilPurchase__text}>
                Покупаем отработанное масло в Новосибирске{" "}
                <span className={styles.oilPurchase__phone}>8-913-928-79-84</span>
            </p>
            <Phone size={14} className={styles.oilPurchase__icon} fill="#9acd32" />
        </div>
    )
}

export default Banner
