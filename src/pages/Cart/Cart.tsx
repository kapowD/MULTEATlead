import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.scss';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, RussianRuble as Ruble } from 'lucide-react';


const Cart: React.FC = () => {
    const { state, updateQuantity, removeItem, clearCart } = useCart();
    const navigate = useNavigate();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU').format(price);
    };

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        if (newQuantity >= 1) {
            updateQuantity(productId, newQuantity);
        }
    };

    const handleCheckout = () => {
        navigate('/order');
    };

    if (state.items.length === 0) {
        return (
            <div className={styles.page}>
                <div className={styles.container}>
                    <Link to="/products" className={styles.backButton}>
                        <ArrowLeft size={20} />
                        Вернуться в магазин
                    </Link>

                    <div className={styles.emptyCart}>
                        <ShoppingBag size={80} className={styles.emptyIcon} />
                        <h2 className={styles.emptyTitle}>Корзина пуста</h2>
                        <p className={styles.emptyDescription}>
                            {/* Добавьте товары из каталога, чтобы оформить заказ */}
                        </p>
                        <Link to="/products" className={styles.shopButton}>
                            Перейти в каталог
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Link to="/products" className={styles.backButton}>
                    <ArrowLeft size={20} />
                    Вернуться в магазин
                </Link>

                <div className={styles.cartLayout}>
                    <div className={styles.cartItems}>
                        <div className={styles.cartHeader}>
                            <h1 className={styles.title}>Корзина</h1>
                            <button 
                                onClick={clearCart}
                                className={styles.clearButton}
                            >
                                <Trash2 size={18} />
                                Очистить корзину
                            </button>
                        </div>

                        <div className={styles.itemsList}>
                            {state.items.map((item) => (
                                <div key={item.product.id} className={styles.cartItem}>
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
                                        <div className={styles.itemPrice}>
                                            <Ruble size={18} />
                                            <span>{formatPrice(item.product.price)}</span>
                                        </div>
                                    </div>
                                    
                                    <div className={styles.itemControls}>
                                        <div className={styles.quantityControls}>
                                            <button
                                                onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                                className={styles.quantityButton}
                                                disabled={item.quantity <= 1}
                                                title="Уменьшить количество"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className={styles.quantity}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                                className={styles.quantityButton}
                                                title="Увеличить количество"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        
                                        <div className={styles.itemTotal}>
                                            <Ruble size={18} />
                                            <span>{formatPrice(item.product.price * item.quantity)}</span>
                                        </div>
                                        
                                        <button
                                            onClick={() => removeItem(item.product.id)}
                                            className={styles.removeButton}
                                            title="Удалить товар"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.cartSummary}>
                        <div className={styles.summaryCard}>
                            <h3 className={styles.summaryTitle}>Итого</h3>
                            
                            <div className={styles.summaryDetails}>
                                <div className={styles.summaryRow}>
                                    <span>Товаров:</span>
                                    <span>{state.itemCount} шт.</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Сумма:</span>
                                    <div className={styles.summaryPrice}>
                                        <Ruble size={18} />
                                        <span>{formatPrice(state.total)}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.summaryActions}>
                                <button 
                                    onClick={handleCheckout}
                                    className={styles.checkoutButton}
                                >
                                    Оформить заказ
                                </button>
                                <Link 
                                    to="/" 
                                    className={styles.continueButton}
                                >
                                    Продолжить покупки
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;