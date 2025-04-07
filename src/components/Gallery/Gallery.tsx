import { useState } from 'react';
import { Container, Typography, Box, ImageList, ImageListItem } from '@mui/material';
import Modal from '../Modal/Modal';

const images = [
  'https://images.unsplash.com/photo-1575336127377-71c59240154f',
  'https://images.unsplash.com/photo-1617974940637-563073d54857',
  'https://images.unsplash.com/photo-1542628682-88321d2a4828',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f',
  'https://images.unsplash.com/photo-1519834022362-0f0a2ff0a6b2',
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Box py={6}>
      <Container>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Gallery
        </Typography>
        <ImageList variant="masonry" cols={3} gap={8}>
          {images.map((image, index) => (
            <ImageListItem key={index} onClick={() => setSelectedImage(image)}>
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
                style={{ cursor: 'pointer' }}
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Modal
          open={!!selectedImage}
          onClose={() => setSelectedImage(null)}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected gallery image"
              style={{ maxWidth: '100%', maxHeight: '90vh' }}
            />
          )}
        </Modal>
      </Container>
    </Box>
  );
};

export default Gallery;