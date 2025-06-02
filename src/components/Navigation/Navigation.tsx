import { useState } from "react";
import { Button, Container } from "@mui/material";
import { Menu, Home, Flame, Video, Phone, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";

const Navigation = ({ scrollToFooter }: { scrollToFooter: () => void }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const buttons = [
    {
      icon: <Home className={styles.buttonIcon} />,
      label: "О нас",
      link: "/", // Перенаправление на главную страницу
    },
    {
      icon: <Flame className={styles.buttonIcon} />,
      label: "Продукция",
      link: "/products",
    },
    {
      icon: <ShoppingCart className={styles.buttonIcon} />,
      label: "Купить",
      link: "/how-to-buy", // Вернул кнопку "Купить"
    },
    {
      icon: <Video className={styles.buttonIcon} />,
      label: "Видео",
      link: "/video",
    },
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
          {buttons.map((button) =>
            button.link ? (
              <Link to={button.link} key={button.label} className={styles.link}>
                <Button
                  variant="contained"
                  className={styles.button}
                  startIcon={button.icon}
                  fullWidth
                >
                  {button.label}
                </Button>
              </Link>
            ) : (
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
            )
          )}
        </div>
      </Container>
    </div>
  );
};

export default Navigation;
