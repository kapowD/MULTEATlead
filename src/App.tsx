import "./styles/variables/_index.scss"

import { CssBaseline, ThemeProvider } from "@mui/material"
import { BrowserRouter as Router } from "react-router-dom"
import { Toaster } from "sonner"
import { useRef } from "react"

import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import Navigation from "./components/Navigation/Navigation"
import { CartProvider } from "./context/CartContext"
import ScrollToTop from "./shared/ui/ScrollToTop/ScrollToTop"
import theme from "./theme"
import { AppRouter } from "./AppRouter"
import { HelmetProvider } from "react-helmet-async"

function App() {
    const footerRef = useRef<HTMLDivElement | null>(null)

    const scrollToFooter = () => {
        footerRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HelmetProvider>
                <Router>
                    <ScrollToTop />
                    <CartProvider>
                        <Header />
                        <Navigation scrollToFooter={scrollToFooter} />
                        <AppRouter />
                        <div ref={footerRef}>
                            <Footer />
                        </div>
                        <Toaster position="top-center" richColors />
                    </CartProvider>
                </Router>
            </HelmetProvider>
        </ThemeProvider>
    )
}

export default App
