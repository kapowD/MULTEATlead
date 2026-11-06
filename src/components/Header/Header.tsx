import { AppBar, Container, Toolbar } from "@mui/material"

import logo from "../../assets/images/GalleryLogo.png"
import styles from "./Header.module.scss"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <AppBar position="static" className={styles.header} elevation={0}>
            <Container className={styles.container}>
                <Toolbar className={styles.toolbar}>
                    <Link to="/" aria-label="MULTEAT — на главную">
                        <img src={logo} alt="" className={styles.logo} />
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
