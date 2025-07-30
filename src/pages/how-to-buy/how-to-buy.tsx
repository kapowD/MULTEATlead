import React from 'react';
import styles from './how-to-buy.module.scss';

const HowToBuy = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.title}>Как купить?</h1>
                <div className={styles.line} />
                <ol className={styles.steps}>
                    <li>Нажмите на кнопку Продукция.</li>
                    <li>Выберите нужную категорию.</li>
                    <li>Выберите продукцию и нажмите на кнопку "В корзину".</li>
                    <li>Проверьте корзину. Если заказ сформирован, нажмите "Оформить", либо вернитесь обратно, нажав кнопку "В магазин", для продолжения покупок.</li>
                    <li>Заполните заявку и отправьте её.</li>
                    <li>Вам будет выставлен счет, который можно оплатить в личном кабинете Вашего банка, либо в любом другом банке.</li>
                </ol>
                <div className={styles.notice}>
                    <b>* Возможна оплата наложенным платежом, при доставке груза компанией <span>СДЭК</span>.<br/>При этом стоимость товара увеличится на 3%.</b>
                </div>
                <div className={styles.deliveryInfo}>
                    <ul>
                        <li>- Отправка товара производится в течение двух рабочих дней с момента поступления денег.</li>
                        <li>- Доставка осуществляется транспортной компанией, по выбору покупателя.</li>
                        <li>- По умолчанию транспортная компания "Деловые линии", но Вы можете выбрать другую, удобную Вам, компанию.</li>
                        <li>- Доставка до терминала транспортной компании - бесплатно.</li>
                    </ul>
                </div>
            </div>
            <div className={styles.bottomBanner}>
                <div className={styles.bottomBannerContent}>
                    <div className={styles.bottomBannerTitle}>Остались вопросы?</div>
                    <div className={styles.bottomBannerSubtitle}>Напишите нам!</div>
                    <button className={styles.bottomBannerButton}>Задать вопрос</button>
                </div>
            </div>
        </div>
    );
};

export default HowToBuy;
