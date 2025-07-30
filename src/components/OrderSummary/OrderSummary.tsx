import React from 'react';
import { Package } from 'lucide-react';
import { CartItem } from '../../context/CartContext';
import { Price } from '../Price/Price';
import styles from './OrderSummary.module.scss';

interface OrderSummaryProps {
    items: CartItem[];
    total: number;
    itemCount: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    items,
    total,
    itemCount
}) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU').format(price);
    };

    return (
        <div className={styles.orderSummary}>
            <div className={styles.summaryCard}>
                <h3 className={styles.summaryTitle}>
                    <Package size={24} />
                    Ваш заказ
                </h3>
                
                <div className={styles.orderItems}>
                    {items.map((item) => (
                        <div key={item.product.id} className={styles.orderItem}>
                            <div className={styles.itemImage}>
                                <img 
                                    src={item.product.image} 
                                    alt={item.product.name}
                                />
                            </div>
                            <div className={styles.itemDetails}>
                                <h4 className={styles.itemName}>
                                    {item.product.name}
                                </h4>
                                <div className={styles.itemQuantity}>
                                    {item.quantity} шт. × {formatPrice(item.product.price)} ₽
                                </div>
                                <Price 
                                    amount={item.product.price * item.quantity}
                                    size="small"
                                    className={styles.itemTotal}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className={styles.summaryTotal}>
                    <div className={styles.totalRow}>
                        <span>Товаров:</span>
                        <span>{itemCount} шт.</span>
                    </div>
                    <div className={styles.totalRow}>
                        <span>Итого:</span>
                        <Price amount={total} size="medium" />
                    </div>
                </div>
            </div>
        </div>
    );
};