import { useRef } from "react";
import theme from "./theme";

import { ThemeProvider, CssBaseline } from "@mui/material";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import "./styles/variables/_index.scss";
import Products from "./pages/products/products";
import HowToBuy from "./pages/how-to-buy/how-to-buy";
import Home from "./pages/home/home";
import VideoSection from "./pages/videos/ui/videos";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const footerRef = useRef<HTMLDivElement | null>(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Navigation scrollToFooter={scrollToFooter} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/how-to-buy" element={<HowToBuy />} />
          <Route path="/video" element={<VideoSection />} />
        </Routes>
        <div ref={footerRef}>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
