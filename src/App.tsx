import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Slider from './components/Slider/Slider';
import AboutUs from './components/AboutUs/AboutUs';
import Gallery from './components/Gallery/Gallery';
import Properties from './components/Properties/Properties';
import FuelSystem from './components/FuelSystem/FuelSystem';
import Archive from './components/Archive/Archive';
import Footer from './components/Footer/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD700',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Navigation />
      <Slider />
      <AboutUs />
      <Gallery />
      <Properties />
      <FuelSystem />
      <Archive />
      <Footer />
    </ThemeProvider>
  );
}

export default App;