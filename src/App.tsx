import { useRef } from "react";
import theme from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Products, HowToBuy, Videos } from '@/pages';

function App() {
  const footerRef = useRef<HTMLDivElement | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Navigation scrollToFooter={() => footerRef.current?.scrollIntoView({ behavior: "smooth" })} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/how-to-buy" element={<HowToBuy />} />
          <Route path="/videos" element={<Videos />} />
        </Routes>
        <div ref={footerRef}>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
