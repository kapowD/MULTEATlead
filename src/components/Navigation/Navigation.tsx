import { useState } from "react";
import { Button, Container } from "@mui/material";
import { Menu, Home, Flame, ShoppingCart, Video, Phone } from "lucide-react";
import styles from "./Navigation.module.scss";

const Navigation = ({ scrollToFooter }: { scrollToFooter: () => void }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const buttons = [
    { icon: <Home className={styles.buttonIcon} />, label: "О нас" },
    { icon: <Flame className={styles.buttonIcon} />, label: "Продукция" },
    { icon: <ShoppingCart className={styles.buttonIcon} />, label: "Купить" },
    { icon: <Video className={styles.buttonIcon} />, label: "Видео" },
    {
      icon: <Phone className={styles.buttonIcon} />,
      label: "Контакты",
      onClick: scrollToFooter,
    },
  ];

  return (
    <div className={styles.navigation}>
      <Container sx={{ position: "relative" }}>
        {/* Бургер-кнопка — только на мобилке */}
        <button
          className={styles.burger}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Меню"
        >
          <Menu className={styles.burgerIcon} size={28} />
          <span className={styles.burgerLabel}>Меню</span>
        </button>

        {/* Меню */}
        <div className={`${styles.grid} ${menuOpen ? styles.open : ""}`}>
          {buttons.map((button) => (
            <Button
              key={button.label}
              variant="contained"
              className={styles.button}
              startIcon={button.icon}
              onClick={button.onClick}
              fullWidth
            >
              {button.label}
            </Button>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Navigation;
