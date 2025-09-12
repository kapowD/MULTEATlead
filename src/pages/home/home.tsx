import React from "react";

import AboutUs from "../../components/AboutUs/AboutUs";
import Archive from "../../components/Archive/Archive";
import Footer from "../../components/Footer/Footer";
import FuelSystem from "../../components/FuelSystem/FuelSystem";
import Gallery from "../../components/Gallery/Gallery";
import Banner from "../../components/PhoneBanner/Banner";
import Properties from "../../components/Properties/Properties";
import Slider from "../../components/Slider/Slider";

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
      
    </>
  );
};

export default Home;
