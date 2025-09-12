import { Trash2 } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { CartItem as CartItemType } from '../../context/CartContext';
import { Price } from '../Price/Price';
import { QuantityControl } from '../QuantityControl/QuantityControl';
import styles from './CartItem.module.scss';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
    item,
    onUpdateQuantity,
    onRemove
}) => {
    const handleQuantityIncrease = () => {
        onUpdateQuantity(item.product.id, item.quantity + 1);
    };

    const handleQuantityDecrease = () => {
        if (item.quantity > 1) {
            onUpdateQuantity(item.product.id, item.quantity - 1);
        }
    };

    const handleRemove = () => {
        onRemove(item.product.id);
    };

    return (
        <div className={styles.cartItem}>
            <div className={styles.itemImage}>
                <img 
                    src={item.product.image} 
                    alt={item.product.name}
                />
            </div>
            
            <div className={styles.itemInfo}>
                <Link 
                    to={`/product/${item.product.id}`}
                    className={styles.itemName}
                >
                    {item.product.name}
                </Link>
                <p className={styles.itemDescription}>
                    {item.product.description}
                </p>
                <Price amount={item.product.price} size="medium" />
            </div>
            
            <div className={styles.itemControls}>
                <QuantityControl
                    quantity={item.quantity}
                    onIncrease={handleQuantityIncrease}
                    onDecrease={handleQuantityDecrease}
                />
                
                <Price 
                    amount={item.product.price * item.quantity}
                    size="large"
                    className={styles.itemTotal}
                />
                
                <button
                    onClick={handleRemove}
                    className={styles.removeButton}
                    title="Remove item"
                    aria-label="Remove item"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};