import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Container>
        <Toolbar disableGutters>
          <img src="../../../../assets/GalleryLogo.png" alt='НИХУЯ НЕ РАБОТАЕТ ' style={{ height: 50, marginRight: 16 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            супер печность
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;