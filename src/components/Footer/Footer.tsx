import { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Link,
  Divider,
} from '@mui/material';
import { Mail, Phone, MapPin, MessageSquare, CreditCard } from 'lucide-react';

const Footer = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenSnackbar(true);
    setMessage('');
    setEmail('');
  };

  return (
    <Box component="footer" sx={{ bgcolor: '#FFD700', color: 'white', py: 6 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              INFORMACIYA
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              IPValentinValentin
            </Typography>
            <Typography variant="body2" paragraph>
              OGRNIP:
              <br />
              TIN:
            </Typography>
            
            <Box display="flex" alignItems="flex-start" mb={2}>
              <MapPin size={20} style={{ marginRight: 8, marginTop: 4 }} />
              <Typography>
                Russia
                <br />
                630082, 18 Dachnaya St.
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Nashi contacti
            </Typography>
            
            <Box display="flex" alignItems="center" mb={2}>
              <Phone size={20} style={{ marginRight: 8 }} />
              <Box>
                <Link 
                  href="tel:+79139287984" 
                  color="inherit" 
                  sx={{ display: 'block', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  +7-913-928-79-84
                </Link>
                <Link 
                  href="tel:+79139137675" 
                  color="inherit" 
                  sx={{ display: 'block', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  +7-913-913-76-75
                </Link>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" mb={2}>
              <MessageSquare size={20} style={{ marginRight: 8 }} />
              <Box>
                <Link 
                  href="https://wa.me/79139287984" 
                  target="_blank" 
                  color="inherit" 
                  sx={{ display: 'block', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  WhatsApp: +7-
                </Link>
                <Link 
                  href="https://wa.me/79139137675" 
                  target="_blank" 
                  color="inherit" 
                  sx={{ display: 'block', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  WhatsApp: +7-913-
                </Link>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" mb={4}>
              <Mail size={20} style={{ marginRight: 8 }} />
              <Box>
                <Link 
                  href="mailto:multeat@mail.ru" 
                  color="inherit" 
                  sx={{ display: 'block', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  multeat@mail.ru
                </Link>
                <Link 
                  href="mailto:multeat@gmail.com" 
                  color="inherit" 
                  sx={{ display: 'block', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  multeat@gmail.com
                </Link>
              </Box>
            </Box>

            <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.12)' }} />

            <Box>
              <Typography variant="h6" gutterBottom display="flex" alignItems="center">
                <CreditCard size={20} style={{ marginRight: 8 }} />
                Pay
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Bank: Bank
                <br />
                Address: Krasny Prospektdd
                <br />
                Phone: (381231231284)
              </Typography>
              <Typography variant="body2" component="div" sx={{ 
                '& > div': { mb: 0.5 },
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>R/s: 4213123123127370</div>
                <div>Cor./account: 30101232131230641</div>
                <div>BIK: 04123123641</div>
                <div>TIN: 77021331231293</div>
                <div>KPP: 5406231231202002</div>
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Send us a message
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{ 
                      bgcolor: 'white',
                      borderRadius: 1,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'secondary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    sx={{ 
                      bgcolor: 'white',
                      borderRadius: 1,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'secondary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        transition: 'transform 0.2s',
                      },
                    }}
                  >
                    Остались вопросы?
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Message sent successfully!"
      />
    </Box>
  );
};

export default Footer;