import React, { useState } from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { Product } from '../../data/products';
import Modal from '../Modal/Modal';
import styles from './ProductGrid.module.scss';

interface ProductGridProps {
    products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

    return (
        <div className={styles.grid}>
            {products.map((product) => (
                <Card key={product.id} className={styles.card}>
                    <div 
                        className={styles.imageContainer}
                        onClick={() => setSelectedImage({ src: product.image, alt: product.name })}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className={styles.image}
                        />
                    </div>
                    <CardContent>
                        <Typography variant="h6" component="h2" className={styles.title}>
                            {product.name}
                        </Typography>
                        <Box className={styles.details}>
                            <Chip
                                label={product.inStock ? "В наличии" : "Нет в наличии"}
                                color={product.inStock ? "success" : "error"}
                                size="small"
                            />
                            <Typography variant="body2" color="text.secondary">
                                Гарантия: {product.warranty}
                            </Typography>
                            <Typography variant="h6" color="primary" className={styles.price}>
                                {product.price.toLocaleString('ru-RU')} ₽
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            ))}

            <Modal
                open={!!selectedImage}
                onClose={() => setSelectedImage(null)}
            >
                {selectedImage && (
                    <img
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
                    />
                )}
            </Modal>
        </div>
    );
};

export default ProductGrid; 