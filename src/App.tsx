import { useRef } from "react";
import theme from './theme';

import { ThemeProvider, CssBaseline } from '@mui/material';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Slider from './components/Slider/Slider';
import AboutUs from './components/AboutUs/AboutUs';
import Gallery from './components/Gallery/Gallery';
import Properties from './components/Properties/Properties';
import FuelSystem from './components/FuelSystem/FuelSystem';
import Archive from './components/Archive/Archive';
import Footer from './components/Footer/Footer';
import './styles/variables/_index.scss';
import Banner from './components/PhoneBanner/Banner';

function App() {
  const footerRef = useRef<HTMLDivElement | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Navigation scrollToFooter={() => footerRef.current?.scrollIntoView({ behavior: "smooth" })} />
      <Slider />
      <Banner />
      <AboutUs />
      <Gallery />
      <Properties />
      <FuelSystem />
      <Archive />
      <div ref={footerRef}>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
