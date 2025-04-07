import { useState } from 'react';
import { Container, Typography, Box, Grid, Divider } from '@mui/material';
import Modal from '../Modal/Modal';

const FuelSystem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box py={6} bgcolor="background.paper">
      <Container>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          textAlign="center"
        >
          Fuel Supply System
        </Typography>
        <Divider sx={{ my: 4 }} />
        
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="body1" paragraph>
              The fuel supply system in all heaters is based on one principle: keeping the mass of the plate, together with the fuel, at the set value (half-filled plate).
            </Typography>
            <Typography variant="body1" paragraph>
              When the plate is empty, the CME valve is fully open and fuel flows into the plate. When the set mass is reached, the valve closes. As the fuel burns, the mass decreases and the valve opens. The process is cyclic.
            </Typography>
            <Typography variant="body1">
              The CME valve is located in a convenient location for maintenance. It can be easily washed, cleaned and allows draining the sludge when the heater is running. It is enough to unscrew the bottom screw by two turns. Lifetime is unlimited.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837"
              alt="Fuel System Diagram"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
              onClick={() => setIsModalOpen(true)}
            />
          </Grid>
        </Grid>

        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <img
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837"
            alt="Fuel System Diagram"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
            }}
          />
        </Modal>
      </Container>
    </Box>
  );
};

export default FuelSystem;