import { Button, Container } from "@mui/material";
import { Flame, Home, Menu, MessageCircleQuestion, Phone, ShoppingCart,Video } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import styles from "./Navigation.module.scss";

const Navigation = ({ scrollToFooter }: { scrollToFooter: () => void }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { state } = useCart();
  const count = state.itemCount;

  const buttons = [
    { icon: <Home className={styles.buttonIcon} />, label: "О нас", link: "/" },
    { icon: <Flame className={styles.buttonIcon} />, label: "Продукция", link: "/products" },
    { icon: <MessageCircleQuestion className={styles.buttonIcon} />, label: "Как купить?", link: "/how-to-buy" },
    { icon: <Video className={styles.buttonIcon} />, label: "Видео", link: "/video" },
    { icon: <Phone className={styles.buttonIcon} />, label: "Контакты", onClick: scrollToFooter },
  ];

  return (
    <div className={styles.navigation}>
      <Container sx={{ position: "relative" }}>
        {/* Бургер — только мобилка */}
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

        {/* Кнопка корзины справа */}
        <Link to="/cart" className={styles.cartButtonWrapper} aria-label="Корзина">
          <Button
            variant="outlined"
            className={`${styles.cartButton} ${count > 0 ? styles.cartButtonHasItems : ""}`}
            startIcon={<ShoppingCart />}
          >
            Корзина
            {count > 0 && (
              <span className={styles.cartBadge} aria-live="polite">
                {count}
              </span>
            )}
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default Navigation;
