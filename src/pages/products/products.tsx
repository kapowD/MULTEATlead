import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import ProductSidebar from '../../components/ProductSidebar/ProductSidebar';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import { products } from '../../data/products';
import styles from './products.module.scss';

const Products = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
        <Container maxWidth="xl" className={styles.container}>
            <Box className={styles.content}>
                <ProductSidebar
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
                <Box className={styles.gridContainer}>
                    <ProductGrid products={filteredProducts} />
                </Box>
            </Box>
        </Container>
    );
};

export default Products;
