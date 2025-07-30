import React from 'react';
import { Plus, Minus } from 'lucide-react';
import styles from './QuantityControl.module.scss';

interface QuantityControlProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    min?: number;
    max?: number;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
    quantity,
    onIncrease,
    onDecrease,
    min = 1,
    max
}) => {
    return (
        <div className={styles.quantityControls}>
            <button
                onClick={onDecrease}
                className={styles.quantityButton}
                disabled={quantity <= min}
                title="Decrease quantity"
                aria-label="Decrease quantity"
            >
                <Minus size={16} />
            </button>
            <span className={styles.quantity}>
                {quantity}
            </span>
            <button
                onClick={onIncrease}
                className={styles.quantityButton}
                disabled={max ? quantity >= max : false}
                title="Increase quantity"
                aria-label="Increase quantity"
            >
                <Plus size={16} />
            </button>
        </div>
    );
};