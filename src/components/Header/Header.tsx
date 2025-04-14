import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import logo from '../../assets/images/GalleryLogo.png';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <AppBar position="static" className={styles.header} elevation={0}>
      <Container className={styles.container}>
        <Toolbar className={styles.toolbar}>
          <img src={logo} alt='Logo' className={styles.logo} />
          <Typography className={styles.title}>
            супер печность
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;