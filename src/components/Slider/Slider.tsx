import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Container } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1542628682-88321d2a4828',
    title: 'Modern Heating Solutions',
    description: 'Experience comfort with our state-of-the-art heating stoves',
  },
  {
    image: 'https://images.unsplash.com/photo-1575336127377-71c59240154f',
    title: 'Eco-Friendly Design',
    description: 'Sustainable heating solutions for your home',
  },
  {
    image: 'https://images.unsplash.com/photo-1617974940637-563073d54857',
    title: 'Premium Quality',
    description: 'Built to last with premium materials',
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <Box position="relative" height="500px" overflow="hidden">
      {slides.map((slide, index) => (
        <Box
          key={index}
          position="absolute"
          width="100%"
          height="100%"
          sx={{
            opacity: currentSlide === index ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Container
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            <Typography variant="h3" component="h2" gutterBottom>
              {slide.title}
            </Typography>
            <Typography variant="h6">{slide.description}</Typography>
          </Container>
        </Box>
      ))}
      <IconButton
        sx={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)' }}
        onClick={handlePrevSlide}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        sx={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)' }}
        onClick={handleNextSlide}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
};

export default Slider;