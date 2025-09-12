import { Package, RussianRuble as Ruble,Shield } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../../context/CartContext';
import { Product } from '../../types/product';
import { QuantityControl } from '../QuantityControl/QuantityControl';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { state, addItem, updateQuantity, hasItem } = useCart();

  const cartItem = useMemo(
    () => state.items.find(i => i.product.id === product.id),
    [state.items, product.id]
  );
  const inCart = hasItem(product.id);

  // локальное кол-во, пока товара нет в корзине
  const [localQty, setLocalQty] = useState<number>(1);

  const formatPrice = (n: number) => new Intl.NumberFormat('ru-RU').format(n);

  // Хендлеры БЕЗ аргументов — под типы QuantityControl
  const increase = () => {
    if (inCart) {
      updateQuantity(product.id, (cartItem?.quantity ?? 1) + 1);
    } else {
      setLocalQty(q => q + 1);
    }
  };

  const decrease = () => {
    if (inCart) {
      const next = Math.max(1, (cartItem?.quantity ?? 1) - 1);
      updateQuantity(product.id, next);
    } else {
      setLocalQty(q => Math.max(1, q - 1));
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    // т.к. карточка — это Link, гасим клик у кнопки
    e.preventDefault();
    e.stopPropagation();
    if (inCart) return;
    addItem(product);
    if (localQty > 1) {
      updateQuantity(product.id, localQty);
    }
  };

  const displayQty = inCart ? (cartItem?.quantity ?? 1) : localQty;

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

  {/* Оверлей */}
  <div className={styles.overlay}>Подробнее</div>
</div>

        <div className={styles.content}>
          <h3 className={styles.title}>{product.name}</h3>
          <p className={styles.description}>{product.description}</p>

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

          <div className={styles.actions}>
            <QuantityControl
              quantity={displayQty}
              onIncrease={increase}
              onDecrease={decrease}
              min={1}
            />

            <button
              className={styles.button}
              onClick={handleAddToCart}
              disabled={inCart}
             
            >
              {inCart ? 'В корзине' : (product.inStock ? 'Добавить в корзину' : 'Заказать')}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
