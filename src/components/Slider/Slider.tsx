import { Box, Container, IconButton, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import sliderImageTwo from "../../assets/images/as2_1-800x800-product_popup.jpg";
import sliderImageThree from "../../assets/images/mini1.jpg";
import sliderImageOne from "../../assets/images/slaid1.png";
import styles from "./Slider.module.scss";

interface Slide {
  image: string;
  title: string;
  description?: string;
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
    description: "8-913-928-79-84",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<number[]>([0]);

  const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
  const nextIndex = (currentSlide + 1) % slides.length;

  const visibleSlides = useMemo(
    () => new Set([currentSlide, prevIndex, nextIndex]),
    [currentSlide, prevIndex, nextIndex]
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLoadedSlides((prev) => {
      const next = new Set(prev);
      next.add(currentSlide);
      next.add(prevIndex);
      next.add(nextIndex);
      return Array.from(next);
    });
  }, [currentSlide, prevIndex, nextIndex]);

  return (
    <Box className={styles.slider}>
      {slides.map((slide, index) => (
        <Box
          key={index}
          className={styles.slide}
          sx={{
            transform: `translate3d(${(index - currentSlide) * 100}%, 0, 0)`,
            backgroundImage: loadedSlides.includes(index)
              ? `url(${slide.image})`
              : "none",
            opacity: visibleSlides.has(index) ? 1 : 0,
          }}
        >
          <Container className={styles.slideContent}>
            <Typography sx={{ fontWeight: "bold", fontSize: 22,  margin: 1}}>
              {slide.title}
            </Typography>
          </Container>
        </Box>
      ))}

      {/* Стрелки */}

      <IconButton
        className={`${styles.arrow} ${styles.left}`}
        onClick={prevSlide}
      >
        {/* <ChevronLeft color="deepskyblue" size={40} /> */}
      </IconButton>
      <IconButton
        className={`${styles.arrow} ${styles.right}`}
        onClick={nextSlide}
      >
        {/* <ChevronRight color="deepskyblue" size={40} /> */}
      </IconButton>
      {/* Точки */}
      <Box className={styles.dots}>
        {slides.map((_, index) => (
          <Box
            key={index}
            className={`${styles.dot} ${
              currentSlide === index ? styles.active : ""
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Slider;
