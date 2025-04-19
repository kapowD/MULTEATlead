import styles from "./Banner.module.scss";
import { Phone } from "lucide-react";
import { Section } from "@mui/material";

const Banner = () => {
  return (
    <div className={styles.oilPurchase}>
      <p className={styles.oilPurchase__text}>
        Покупаем отработанное масло в Новосибирске 8-913-928-79-84
      </p>
      <Phone size={14} className={styles.oilPurchase__icon} />
    </div>
  );
};

export default Banner;
