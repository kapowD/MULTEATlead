import { Button, Container, useMediaQuery } from "@mui/material"
import {
    Archive as ArchiveIcon,
    Flame,
    Home,
    Menu,
    MessageCircleQuestion,
    Phone,
    ShoppingCart,
    Video,
    X,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import styles from "./Navigation.module.scss"

const Navigation = ({ scrollToFooter }: { scrollToFooter: () => void }) => {
    const [open, setOpen] = useState(false)
    const isMobile = useMediaQuery("(max-width:1199px)")
    const { state } = useCart()
    const count = state.itemCount

    const buttons = [
        { icon: <Home />, label: "О нас", link: "/" },
        { icon: <Flame />, label: "Продукция", link: "/products" },
        { icon: <MessageCircleQuestion />, label: "Как купить?", link: "/how-to-buy" },
        { icon: <Video />, label: "Видео", link: "/video" },
        { icon: <Phone />, label: "Контакты", onClick: scrollToFooter },
        { icon: <ArchiveIcon />, label: "Архив", link: "/archive" },
    ]

    const handleToggle = () => setOpen((prev) => !prev)
    const handleClose = () => setOpen(false)

    return (
        <div className={styles.navigation}>
            <Container maxWidth={false} className={styles.container}>
                {/* === Центр === */}
                <div className={styles.centerBlock}>
                    {isMobile ? (
                        <Button
                            startIcon={open ? <X /> : <Menu />}
                            onClick={handleToggle}
                            className={styles.navButton}
                            aria-expanded={open}
                            aria-controls="mobile-navigation"
                        >
                            {open ? "Закрыть" : "Меню"}
                        </Button>
                    ) : (
                        <nav className={styles.menu}>
                            {buttons.map((btn) =>
                                btn.link ? (
                                    <Button
                                        component={Link}
                                        to={btn.link}
                                        key={btn.label}
                                        variant="contained"
                                        className={styles.button}
                                        startIcon={btn.icon}
                                    >
                                        {btn.label}
                                    </Button>
                                ) : (
                                    <Button
                                        key={btn.label}
                                        variant="contained"
                                        className={styles.button}
                                        startIcon={btn.icon}
                                        onClick={btn.onClick}
                                    >
                                        {btn.label}
                                    </Button>
                                )
                            )}
                        </nav>
                    )}
                </div>

                {/* === Корзина === */}
                <Button
                    component={Link}
                    to="/cart"
                    variant="outlined"
                    className={`${styles.cartButtonWrapper} ${styles.navButton} ${
                        count > 0 ? styles.cartButtonHasItems : ""
                    }`}
                    startIcon={<ShoppingCart />}
                >
                    Корзина
                    {count > 0 && <span className={styles.cartBadge}>{count}</span>}
                </Button>
            </Container>

            {/* === МОБИЛЬНАЯ ШТОРКА === */}
            {isMobile && open && (
                <nav
                    id="mobile-navigation"
                    aria-label="Основная навигация"
                    className={`${styles.mobileMenu} ${styles.open}`}
                >
                    {buttons.map((btn) =>
                        btn.link ? (
                            <Link
                                key={btn.label}
                                to={btn.link}
                                onClick={handleClose}
                                className={styles.mobileItem}
                            >
                                {btn.icon}
                                {btn.label}
                            </Link>
                        ) : (
                            <button
                                key={btn.label}
                                onClick={() => {
                                    btn.onClick?.()
                                    handleClose()
                                }}
                                className={styles.mobileItem}
                            >
                                {btn.icon}
                                {btn.label}
                            </button>
                        )
                    )}
                </nav>
            )}
        </div>
    )
}

export default Navigation
