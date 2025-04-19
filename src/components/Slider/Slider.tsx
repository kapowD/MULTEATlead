import { useState, useEffect } from "react";
import { Box, Typography, IconButton, Container } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Slider.module.scss";

import sliderImageOne from "../../assets/images/slaid1.png";
import sliderImageTwo from "../../assets/images/as2_1-800x800-product_popup.jpg";
import sliderImageThree from "../../assets/images/mini1.jpg";

interface Slide {
  image: string;
  title: string;
  description?: string; // Optional object
}

const slides: Slide[] = [
  {
    image: sliderImageOne,
    title:
      "Проектирование и производство теплогенераторов, работающих на отработанном масле",
    description: "sample text",
  },
  {
    image: sliderImageTwo,
    title: "Техподдержка всех выпущенных моделей",
    description: "sample text",
  },
  {
    image: sliderImageThree,
    title: "Покупаем отработанное масло в Новосибирске",
    description: " 8-913-928-79-84",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box className={styles.slider}>
      <Box
        className={styles.slide}
        sx={{
          backgroundImage: `url(${slides[currentSlide].image})`,
        }}
      >
        <Container className={styles.slideContent}>
          <Typography
            gutterBottom
            sx={{ fontWeight: "bold", fontSize: 22 }} // addcustom styles here
          >
            {slides[currentSlide].title}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Slider;