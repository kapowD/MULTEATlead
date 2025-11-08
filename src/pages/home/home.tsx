import React from "react"
import { PageMeta } from "@shared/ui/PageMeta/PageMeta" // ✅ мета-теги

import AboutUs from "../../components/AboutUs/AboutUs"
import Archive from "../../components/Archive/Archive"
import Footer from "../../components/Footer/Footer"
import FuelSystem from "../../components/FuelSystem/FuelSystem"
import Gallery from "../../components/Gallery/Gallery"
import Banner from "../../components/PhoneBanner/Banner"
import Properties from "../../components/Properties/Properties"
import Slider from "../../components/Slider/Slider"

const Home = () => {
    return (
        <>
            {/* ✅ Мета-теги для главной страницы */}
            <PageMeta
                title="MULTEAT — О нас"
                description="Главная страница магазина MULTEAT: продукция, философия и контакты компании."
            />

            <Slider />
            <Banner />
            <AboutUs />
            <Gallery />
            <Properties />
            <FuelSystem />
            <Archive />
            {/* <Footer /> */}
        </>
    )
}

export default Home
