import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Upload, RussianRuble as Ruble, Package, User, Phone, Mail } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import styles from './OrderForm.module.scss';

const OrderForm: React.FC = () => {
    const { state, clearCart } = useCart();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        contactName: '',
        phone: '',
        email: '',
        message: '',
        file: null as File | null
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU').format(price);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({
            ...prev,
            file
        }));
    };

    const generateOrderMessage = () => {
        let message = `НОВЫЙ ЗАКАЗ\n\n`;
        message += `Контактная информация:\n`;
        message += `Имя: ${formData.contactName}\n`;
        message += `Телефон: ${formData.phone}\n`;
        message += `Email: ${formData.email}\n\n`;
        
        message += `Заказанные товары:\n`;
        state.items.forEach((item, index) => {
            message += `${index + 1}. ${item.product.name}\n`;
            message += `   Количество: ${item.quantity} шт.\n`;
            message += `   Цена за единицу: ${formatPrice(item.product.price)} ₽\n`;
            message += `   Сумма: ${formatPrice(item.product.price * item.quantity)} ₽\n\n`;
        });
        
        message += `ИТОГО:\n`;
        message += `Товаров: ${state.itemCount} шт.\n`;
        message += `Общая сумма: ${formatPrice(state.total)} ₽\n\n`;
        
        if (formData.message) {
            message += `Дополнительная информация:\n${formData.message}\n\n`;
        }
        
        message += `Дата заказа: ${new Date().toLocaleString('ru-RU')}`;
        
        return message;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            //  логика отправки email
            // пока  симулируем отправку
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // чистим корзину
            clearCart();
            
            // успезх
            alert('ЗАКАЗ ОТПРАВЛЕН.');
            
            // Перенаправляем в каталог
            navigate('/');
            
        } catch (error) {
            alert('ЗАКАЗ НЕ ОТПРАВЛЕН. ОШИБКА');
        } finally {
            setIsSubmitting(false);
        }
    };

    //  перенаправляем в каталог при пустой корзинке
    if (state.items.length === 0) {
        navigate('/products');
        return null;
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Link to="/cart" className={styles.backButton}>
                    <ArrowLeft size={20} />
                    Вернуться в корзину
                </Link>

                <div className={styles.formLayout}>
                    <div className={styles.formSection}>
                        <div className={styles.formCard}>
                            <h1 className={styles.title}>Заявка</h1>
                            
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        <User size={18} />
                                        Контактное лицо*
                                    </label>
                                    <input
                                        type="text"
                                        name="contactName"
                                        value={formData.contactName}
                                        onChange={handleInputChange}
                                        placeholder="Varg Vikernes"
                                        className={styles.input}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        <Phone size={18} />
                                        Телефон*
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="0000000000"
                                        className={styles.input}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        <Mail size={18} />
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Почта"
                                        className={styles.input}
                                        required
                                    />
                                </div>

                                <div className={styles.infoBlock}>
                                    <p className={styles.infoTitle}>В окне "сообщение" укажите:</p>
                                    <ul className={styles.infoList}>
                                        <li>- Необходимые Вам размеры.</li>
                                        <li>- Для частного лица: Ф.И.О., адрес доставки, № паспорта (для транспортной компании)</li>
                                        <li>- Для юридического лица: реквизиты организации (можно прикрепить файлом).</li>
                                    </ul>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        Сообщение*
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className={styles.textarea}
                                        rows={6}
                                        required
                                        placeholder="Введите сообщение"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        <Upload size={18} />
                                        Прикрепить файл
                                    </label>
                                    <div className={styles.fileUpload}>
                                        <input
                                            type="file"
                                            id="file"
                                            onChange={handleFileChange}
                                            className={styles.fileInput}
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                        />
                                        <label htmlFor="file" className={styles.fileButton}>
                                            Выбрать файл...
                                        </label>
                                        {formData.file && (
                                            <span className={styles.fileName}>
                                                {formData.file.name}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.paymentInfo}>
                                    <p>Вам будет выставлен счет, который можно оплатить в личном кабинете Вашего банка, либо в любом другом банке.</p>
                                </div>

                                <div className={styles.deliveryInfo}>
                                    <ul>
                                        <li>• Отправка товара производится в течении двух рабочих дней с момента поступления денег.</li>
                                        <li>• Доставка осуществляется транспортной компанией за счет покупателя.</li>
                                        <li>• По умолчанию транспортная компания "Деловые линии", либо другая удобная Вам.</li>
                                        <li>• Доставка до терминала транспортной компании - бесплатна.</li>
                                    </ul>
                                </div>

                                <button 
                                    type="submit" 
                                    className={styles.submitButton}
                                    disabled={isSubmitting}
                                >
                                    {/* <Send size={20} /> */}
                                    {isSubmitting ? 'ОТПРАВЛЯЕТСЯ...' : 'ОТПРАВИТЬ'}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className={styles.orderSummary}>
                        <div className={styles.summaryCard}>
                            <h3 className={styles.summaryTitle}>
                                <Package size={24} />
                                Ваш заказ
                            </h3>
                            
                            <div className={styles.orderItems}>
                                {state.items.map((item) => (
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
                                            <div className={styles.itemTotal}>
                                                <Ruble size={16} />
                                                {formatPrice(item.product.price * item.quantity)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className={styles.summaryTotal}>
                                <div className={styles.totalRow}>
                                    <span>Товаров:</span>
                                    <span>{state.itemCount} шт.</span>
                                </div>
                                <div className={styles.totalRow}>
                                    <span>Итого:</span>
                                    <div className={styles.totalPrice}>
                                        <Ruble size={20} />
                                        <span>{formatPrice(state.total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderForm;