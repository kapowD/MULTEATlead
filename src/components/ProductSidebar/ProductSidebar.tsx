import React from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import styles from './ProductSidebar.module.scss';

type Category = {
    id: string;
    label: string;
    value: 'all' | 'heaters' | 'fans' | 'heat-exchangers' | 'spare-parts';
};

const categories: Category[] = [
    { id: 'all', label: 'Все товары', value: 'all' },
    { id: 'heaters', label: 'Отопители', value: 'heaters' },
    { id: 'fans', label: 'Вентиляторы', value: 'fans' },
    { id: 'heat-exchangers', label: 'Теплообменники', value: 'heat-exchangers' },
    { id: 'spare-parts', label: 'Запчасти', value: 'spare-parts' },
];

interface ProductSidebarProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({ selectedCategory, onCategoryChange }) => {
    return (
        <div className={styles.sidebar}>
            <List>
                {categories.map((category) => (
                    <ListItem key={category.id} disablePadding>
                        <ListItemButton
                            selected={selectedCategory === category.value}
                            onClick={() => onCategoryChange(category.value)}
                        >
                            <ListItemText primary={category.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default ProductSidebar; 