import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { 
  Factory, 
  Zap, 
  Settings, 
  Shield, 
  Droplet, 
  Star, 
  ScrollText, 
  Maximize, 
  Sliders, 
  Clock, 
  AlertTriangle, 
  Power 
} from 'lucide-react';

const properties = [
  { icon: <Factory />, text: "Used for heating industrial premises, garages, service stations, cabins, warehouses, greenhouses, etc. by convection method." },
  { icon: <Zap />, text: "Do not consume electricity." },
  { icon: <Settings />, text: "Characterized by high reliability, ease of installation and operation." },
  { icon: <Shield />, text: "Combustion chamber made of heat-resistant stainless steel." },
  { icon: <Droplet />, text: "No additional fuel cleaning and preparation is required." },
  { icon: <Star />, text: "No analogs in the world." },
  { icon: <ScrollText />, text: "Original fuel supply system protected by the patent of the Russian Federation № 93498." },
  { icon: <Maximize />, text: "Mirror stainless steel screens and small dimensions allow use in small rooms." },
  { icon: <Sliders />, text: "Smooth power regulation by means of the draught regulator (included)." },
  { icon: <Clock />, text: "Cleaning once a day (7 minutes)." },
  { icon: <AlertTriangle />, text: "Fuel supply system automatically stops when unburnable sludge level reaches above norm." },
  { icon: <Power />, text: "Emergency shutdown system is available." },
];

const Properties = () => {
  return (
    <Box py={6} bgcolor="background.default">
      <Container>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          textAlign="center"
          mb={6}
        >
          Properties of Our Heaters
        </Typography>
        <Grid container spacing={3}>
          {properties.map((property, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box
                  sx={{
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1,
                    borderRadius: 1,
                    bgcolor: 'primary.light',
                    opacity: 0.8,
                  }}
                >
                  {property.icon}
                </Box>
                <Typography variant="body1">
                  {property.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Properties;