import { Minus,Plus } from 'lucide-react';
import React from 'react';

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
  const handleDecClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDecrease();
  };

  const handleIncClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onIncrease();
  };

  return (
    <div className={styles.quantityControls}>
      <button
        onClick={handleDecClick}
        className={styles.quantityButton}
        disabled={quantity <= min}
        title="Decrease quantity"
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <span className={styles.quantity}>{quantity}</span>
      <button
        onClick={handleIncClick}
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
