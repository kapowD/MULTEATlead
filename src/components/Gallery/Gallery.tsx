import { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import Modal from "../Modal/Modal";
import styles from "./Gallery.module.scss";

// folder documents
import rekvizitiipsafronov from "../../assets/documents/index_rekvizitiipsafronov.jpg";
import aboutsertification from "../../assets/documents/index_aboutsertification.jpg";
import pat93498 from "../../assets/documents/index_pat93498.jpg";
import inn from "../../assets/documents/index_inn.jpg";
import svidetelstvo from "../../assets/documents/index_svidetelstvo.jpg";

const documents = [
  {
    id: 1,
    image: svidetelstvo,
  },
  {
    id: 2,
    image: inn,
  },
  {
    id: 3,
    image: pat93498,
  },
  {
    id: 4,
    image: aboutsertification,
  },
  {
    id: 5,
    image: rekvizitiipsafronov,
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<{ image: string } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const openModal = (index: number) => {
    setSelectedImage({ image: documents[index].image });
    setCurrentImageIndex(index);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % documents.length);
    setSelectedImage({ image: documents[(currentImageIndex + 1) % documents.length].image });
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + documents.length) % documents.length);
    setSelectedImage({ image: documents[(currentImageIndex - 1 + documents.length) % documents.length].image });
  };

  // Обработчик нажатий клавиш стрелок
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      nextImage();
    } else if (event.key === "ArrowLeft") {
      prevImage();
    }
  };

  // Добавление и удаление слушателя события
  useEffect(() => {
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, currentImageIndex]);

  return (
    <Box className={styles.gallery}>
      <Container>
        <Typography variant="h6" component="h2" className={styles.title}>
          Регистрационные документы
        </Typography>
        <div className={styles.grid}>
          {documents.map((doc, index) => (
            <div
              key={doc.id}
              className={styles.documentItem}
              onClick={() => openModal(index)}
            >
              <img
                src={doc.image}
                alt="Документ"
                loading="lazy"
                className={styles.image}
              />
            </div>
          ))}
        </div>
        <Modal open={!!selectedImage} onClose={() => setSelectedImage(null)}>
          {selectedImage && (
            <div className={styles.modalContent}>
              <img
                src={selectedImage.image}
                alt="Документ"
                className={styles.modalImage}
              />
            </div>
          )}
        </Modal>
      </Container>
    </Box>
  );
};

export default Gallery;
