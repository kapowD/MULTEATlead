# Настройка отправки email заказов

## 1. Настройка EmailJS

### Шаг 1: Регистрация на EmailJS
1. Перейдите на [emailjs.com](https://www.emailjs.com/)
2. Зарегистрируйтесь и создайте аккаунт
3. Подтвердите email

### Шаг 2: Настройка Email Service
1. В панели управления перейдите в "Email Services"
2. Нажмите "Add New Service"
3. Выберите ваш email провайдер (Gmail, Outlook, etc.)
4. Подключите ваш email аккаунт
5. Скопируйте **Service ID** (например: `service_abc123`)

### Шаг 3: Создание Email Template
1. Перейдите в "Email Templates"
2. Нажмите "Create New Template"
3. Настройте шаблон:

**Тема письма:**
```
Новый заказ от {{from_name}}
```

**Содержимое:**
```html
<h2>Новый заказ</h2>

<h3>Контактная информация:</h3>
<p><strong>Имя:</strong> {{from_name}}</p>
<p><strong>Телефон:</strong> {{from_phone}}</p>
<p><strong>Email:</strong> {{from_email}}</p>

<h3>Детали заказа:</h3>
<div style="white-space: pre-line;">{{message}}</div>

<p><em>Дата заказа: {{date}}</em></p>
```

4. Сохраните шаблон и скопируйте **Template ID** (например: `template_xyz789`)

### Шаг 4: Получение Public Key
1. Перейдите в "Account" → "API Keys"
2. Скопируйте **Public Key** (например: `user_def456`)

## 2. Настройка Google reCAPTCHA

### Шаг 1: Регистрация reCAPTCHA
1. Перейдите на [google.com/recaptcha](https://www.google.com/recaptcha/)
2. Нажмите "Get reCAPTCHA"
3. Войдите в Google аккаунт

### Шаг 2: Создание сайта
1. Введите домен вашего сайта
2. Выберите reCAPTCHA v2 "I'm not a robot" Checkbox
3. Примите условия
4. Скопируйте **Site Key** и **Secret Key**

## 3. Обновление кода

Замените в файле `src/pages/Order/OrderForm.tsx` следующие значения:

```typescript
// Строка 95: EmailJS Service ID
'YOUR_SERVICE_ID' → 'service_abc123'

// Строка 96: EmailJS Template ID  
'YOUR_TEMPLATE_ID' → 'template_xyz789'

// Строка 97: EmailJS Public Key
'YOUR_PUBLIC_KEY' → 'user_def456'

// Строка 175: reCAPTCHA Site Key
'YOUR_RECAPTCHA_SITE_KEY' → '6Lc...'
```

## 4. Переменные окружения (опционально)

Создайте файл `.env` в корне проекта:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=user_def456
VITE_RECAPTCHA_SITE_KEY=6Lc...
```

Тогда в коде используйте:
```typescript
import.meta.env.VITE_EMAILJS_SERVICE_ID
import.meta.env.VITE_EMAILJS_TEMPLATE_ID
import.meta.env.VITE_EMAILJS_PUBLIC_KEY
import.meta.env.VITE_RECAPTCHA_SITE_KEY
```

## 5. Тестирование

1. Запустите проект: `npm run dev`
2. Добавьте товары в корзину
3. Перейдите к оформлению заказа
4. Заполните форму и отправьте
5. Проверьте получение email

## 6. Безопасность

### Защита от спама:
- ✅ **Honeypot поле** - скрытое поле для ботов
- ✅ **reCAPTCHA** - защита от автоматических отправок
- ✅ **Rate limiting** - ограничение количества отправок (настроено в EmailJS)

### Дополнительные меры:
- Ограничьте API ключи по доменам в EmailJS
- Используйте HTTPS в продакшене
- Мониторьте логи отправок

## 7. Альтернативные решения

Если EmailJS не подходит, рассмотрите:
- **Formspree** - простые формы
- **Netlify Forms** - если хостите на Netlify
- **Getform** - альтернатива EmailJS
- **Web3Forms** - бесплатный сервис

## 8. Стоимость

**EmailJS:**
- Бесплатно: 200 писем/месяц
- Платно: от $15/месяц за 1000 писем

**reCAPTCHA:**
- Бесплатно для всех планов 