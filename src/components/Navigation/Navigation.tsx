import { Box, Button, Container, Grid } from '@mui/material';
import { Flame, Home, Info, Phone, Settings, ShoppingCart } from 'lucide-react';

const Navigation = () => {
  const buttons = [
    { icon: <Home />, label: 'Home' },
    { icon: <Flame />, label: 'Products' },
    { icon: <Info />, label: 'About' },
    { icon: <Settings />, label: 'Services' },
    { icon: <ShoppingCart />, label: 'Shop' },
    { icon: <Phone />, label: 'Contact' },
  ];

  return (
    <Box py={3} bgcolor="background.paper">
      <Container>
        <Grid container spacing={2}>
          {buttons.map((button) => (
            <Grid item xs={6} sm={4} md={2} key={button.label}>
              <Button
                variant="contained"
                fullWidth
                startIcon={button.icon}
                sx={{ height: '100%' }}
              >
                {button.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Navigation;