import React from 'react';
import { Package, Shield, RussianRuble as Ruble } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addItem } = useCart();
    
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU').format(price);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
    };

    return (
        <Link to={`/product/${product.id}`} className={styles.cardLink}>
            <div className={styles.card}>
                <div className={styles.imageWrapper}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className={styles.image}
                    />
                    <div className={styles.statusBadge}>
                        <span className={`${styles.badge} ${product.inStock ? styles.inStock : styles.outOfStock}`}>
                            <Package size={14} />
                            {product.inStock ? 'В наличии' : 'Под заказ'}
                        </span>
                    </div>
                </div>
                
                <div className={styles.content}>
                    <h3 className={styles.title}>
                        {product.name}
                    </h3>
                    
                    <p className={styles.description}>
                        {product.description}
                    </p>
                    
                    <div className={styles.details}>
                        <div className={styles.warranty}>
                            <Shield size={16} />
                            <span>Гарантия: {product.warranty}</span>
                        </div>
                        
                        <div className={styles.price}>
                            <Ruble size={18} />
                            <span>{formatPrice(product.price)}</span>
                        </div>
                    </div>
                    
                    <button 
                        className={styles.button}
                        onClick={handleAddToCart}
                    >
                        {product.inStock ? 'Добавить в корзину' : 'Заказать'}
                    </button>
                </div>
            </div>
        </Link>
    );
};