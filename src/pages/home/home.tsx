import React from "react";
import Slider from "../../components/Slider/Slider";
import Banner from "../../components/PhoneBanner/Banner";
import AboutUs from "../../components/AboutUs/AboutUs";
import Gallery from "../../components/Gallery/Gallery";
import Properties from "../../components/Properties/Properties";
import FuelSystem from "../../components/FuelSystem/FuelSystem";
import Archive from "../../components/Archive/Archive";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Slider />
      <Banner />
      <AboutUs />
      <Gallery />
      <Properties />
      <FuelSystem />
      <Archive />
      <Footer />
    </>
  );
};

export default Home;
