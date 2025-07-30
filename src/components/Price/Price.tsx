import React from 'react';
import { RussianRuble as Ruble } from 'lucide-react';
import styles from './Price.module.scss';

interface PriceProps {
    amount: number;
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export const Price: React.FC<PriceProps> = ({
    amount,
    size = 'medium',
    className = ''
}) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU').format(price);
    };

    const priceClass = [
        styles.price,
        styles[size],
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={priceClass}>
            <Ruble size={size === 'small' ? 16 : size === 'large' ? 24 : 18} />
            <span>{formatPrice(amount)}</span>
        </div>
    );
};