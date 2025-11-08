import { Button, Container, Menu as MuiMenu, MenuItem, useMediaQuery, Fade } from "@mui/material"
import {
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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const isMobile = useMediaQuery("(max-width:1199px)")
    const { state } = useCart()
    const count = state.itemCount

    const buttons = [
        { icon: <Home />, label: "О нас", link: "/" },
        { icon: <Flame />, label: "Продукция", link: "/products" },
        { icon: <MessageCircleQuestion />, label: "Как купить?", link: "/how-to-buy" },
        { icon: <Video />, label: "Видео", link: "/video" },
        { icon: <Phone />, label: "Контакты", onClick: scrollToFooter },
    ]

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (anchorEl) {
            // если меню уже открыто — просто закрываем
            setAnchorEl(null)
        } else {
            setAnchorEl(event.currentTarget)
        }
    }

    const handleClose = () => setAnchorEl(null)
    const open = Boolean(anchorEl)

    return (
        <div className={styles.navigation}>
            <Container className={styles.container}>
                {/* === Центр: меню или бургер === */}
                <div className={styles.centerBlock}>
                    {isMobile ? (
                        <>
                            <Button
                                startIcon={open ? <X /> : <Menu />} // 👈 меняем иконку
                                onClick={handleOpen}
                                className={styles.burger}
                                aria-controls={open ? "nav-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                            >
                                {open ? "Закрыть" : "Меню"}{" "}
                                {/* 👈 можно оставить просто иконку, если хочешь */}
                            </Button>

                            <MuiMenu
                                id="nav-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                                PaperProps={{
                                    sx: {
                                        background: "linear-gradient(145deg, #1a1a1a, #2a2a2a)",
                                        borderRadius: 2,
                                        boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
                                        minWidth: 360,
                                    },
                                }}
                            >
                                {buttons.map((btn) =>
                                    btn.link ? (
                                        <MenuItem
                                            key={btn.label}
                                            onClick={handleClose}
                                            component={Link}
                                            to={btn.link}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                color: "#d8b000",
                                            }}
                                        >
                                            {btn.icon}
                                            {btn.label}
                                        </MenuItem>
                                    ) : (
                                        <MenuItem
                                            key={btn.label}
                                            onClick={() => {
                                                btn.onClick?.()
                                                handleClose()
                                            }}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                color: "#d8b000",
                                            }}
                                        >
                                            {btn.icon}
                                            {btn.label}
                                        </MenuItem>
                                    )
                                )}
                            </MuiMenu>
                        </>
                    ) : (
                        <nav className={styles.menu}>
                            {buttons.map((btn) =>
                                btn.link ? (
                                    <Link to={btn.link} key={btn.label}>
                                        <Button
                                            variant="contained"
                                            className={styles.button}
                                            startIcon={btn.icon}
                                        >
                                            {btn.label}
                                        </Button>
                                    </Link>
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

                {/* === Справа: корзина === */}
                <Link to="/cart" className={styles.cartButtonWrapper}>
                    <Button
                        variant="outlined"
                        className={`${styles.cartButton} ${
                            count > 0 ? styles.cartButtonHasItems : ""
                        }`}
                        startIcon={<ShoppingCart />}
                    >
                        Корзина
                        {count > 0 && <span className={styles.cartBadge}>{count}</span>}
                    </Button>
                </Link>
            </Container>
        </div>
    )
}

export default Navigation
