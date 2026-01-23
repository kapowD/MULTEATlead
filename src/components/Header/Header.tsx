import { AppBar, Container, Toolbar, Typography } from "@mui/material"

import logo from "../../assets/images/GalleryLogo.png"
import styles from "./Header.module.scss"
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()

    const goHome = () => {
        navigate("/")
    }

    return (
        <AppBar position="static" className={styles.header} elevation={0}>
            <Container className={styles.container}>
                <Toolbar className={styles.toolbar}>
                    <img src={logo} alt="Logo" className={styles.logo} onClick={goHome} />
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
