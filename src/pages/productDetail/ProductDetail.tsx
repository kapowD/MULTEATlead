import { ArrowLeft, ChevronLeft, ChevronRight,Package, RussianRuble as Ruble, Shield } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Link,useParams } from 'react-router-dom';

import { QuantityControl } from '../../components/QuantityControl/QuantityControl';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import styles from './ProductDetail.module.scss';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { state, addItem, updateQuantity, hasItem } = useCart();

  const product = products.find(p => p.id === Number(id));

  const formatPrice = (price: number) => new Intl.NumberFormat('ru-RU').format(price);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Товар не найден</h1>
        <Link to="/products" className={styles.backLink}>
          <ArrowLeft size={20} />
          Вернуться к каталогу
        </Link>
      </div>
    );
  }

  const cartItem = useMemo(
    () => state.items.find(i => i.product.id === product.id),
    [state.items, product.id]
  );
  const inCart = hasItem(product.id);

  // Локальное количество — пока товара нет в корзине
  const [localQty, setLocalQty] = useState<number>(1);

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

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

  const handleAddToCart = () => {
    if (inCart) return;
    addItem(product);
    if (localQty > 1) {
      updateQuantity(product.id, localQty);
    }
  };

  const displayQty = inCart ? (cartItem?.quantity ?? 1) : localQty;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/products" className={styles.backButton}>
          <ArrowLeft size={20} />
          Вернуться к каталогу
        </Link>

        <div className={styles.productLayout}>
          <div className={styles.imageSection}>
            <div className={styles.mainImageWrapper}>
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className={styles.mainImage}
              />
              
              {product.images.length > 1 && (
                <>
                  <button
                    className={`${styles.navButton} ${styles.prevButton}`}
                    onClick={prevImage}
                    title="Предыдущее изображение"
                    aria-label="Предыдущее изображение"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    className={`${styles.navButton} ${styles.nextButton}`}
                    onClick={nextImage}
                    title="Следующее изображение"
                    aria-label="Следующее изображение"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              <div className={styles.statusBadge}>
                <span className={`${styles.badge} ${product.inStock ? styles.inStock : styles.outOfStock}`}>
                  <Package size={16} />
                  {product.inStock ? 'В наличии' : 'Под заказ'}
                </span>
              </div>
            </div>

            {product.images.length > 1 && (
              <div className={styles.thumbnails}>
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.infoSection}>
            <h1 className={styles.title}>{product.name}</h1>
            <div className={styles.actions}>
              <QuantityControl
                quantity={displayQty}
                onIncrease={increase}
                onDecrease={decrease}
                min={1}
              />

              <button
                className={styles.addToCartButton}
                onClick={handleAddToCart}
                disabled={inCart}  // «Под заказ» тоже можно — не блокируем по inStock
                aria-pressed={inCart}
                aria-label={inCart ? 'Товар уже в корзине' : 'Добавить выбранное количество в корзину'}
              >
                {inCart ? 'В корзине' : 'Добавить в корзину'}
              </button>
            </div>
            <div className={styles.priceSection}>
              <div className={styles.price}>
                <Ruble size={24} />
                <span>{formatPrice(product.price)}</span>
              </div>
              <div className={styles.warranty}>
                <Shield size={18} />
                <span>Гарантия: {product.warranty}</span>
              </div>
            </div>

            <div className={styles.description}>
              <h3>Описание</h3>
              <p>{product.fullDescription}</p>
            </div>

            {product.archiveUrl && (
              <a
                href={product.archiveUrl}
                className={styles.downloadButton}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Скачать архив
              </a>
            )}

            <div className={styles.specifications}>
              <h3>Технические характеристики</h3>
              <div className={styles.specGrid}>
                {Object.entries(product.specifications ?? {}).map(([key, value]) => (
                  <div key={key} className={styles.specItem}>
                    <span className={styles.specKey}>{key}:</span>
                    <span className={styles.specValue}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Количество + кнопка */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
