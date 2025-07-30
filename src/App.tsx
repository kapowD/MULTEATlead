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
import Cart from "./pages/Cart/Cart";
import ProductDetail from "./pages/productDetail/ProductDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import OrderForm from "./pages/Order/OrderForm";
import ScrollToTop from "./shared/ui/ScrollToTop";
function App() {
  const footerRef = useRef<HTMLDivElement | null>(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        <CartProvider>
          <Header />
          <Navigation scrollToFooter={scrollToFooter} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/how-to-buy" element={<HowToBuy />} />
            <Route path="/video" element={<VideoSection />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/order" element={<OrderForm />} />
          </Routes>
          <div ref={footerRef}>
            <Footer />
          </div>
        </CartProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
