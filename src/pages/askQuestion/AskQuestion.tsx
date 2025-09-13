// src/pages/ask/AskQuestion.tsx
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MessageSquare, Phone, User } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';

import styles from './AskQuestion.module.scss';

// Инициализируем EmailJS (один раз на странице)
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY');

const AskQuestion: React.FC = () => {
  const navigate = useNavigate();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleCaptcha = (token: string | null) => setCaptchaToken(token);

  // Назад: если есть история — идём -1, иначе — на главную
  const handleBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate('/');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.honeypot) return; // honeypot
    if (!captchaToken) {
      alert('Пожалуйста, подтвердите, что вы не робот.');
      return;
    }

    setIsSubmitting(true);
    try {
      const templateParams = {
        to_email: import.meta.env.VITE_CONTACT_TO_EMAIL || 'your@mail.com',
        from_name: form.name,
        from_email: form.email,
        from_phone: form.phone,
        subject: form.subject || 'Вопрос с сайта',
        message: form.message,
        captcha_token: captchaToken,
      };

      const res = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      );

      if (res.status === 200) {
        alert('Сообщение отправлено. Спасибо!');
        setForm({ name: '', email: '', phone: '', subject: '', message: '', honeypot: '' });
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
        navigate('/'); // куда вести после отправки — оставил на главную
      }
    } catch (err) {
      console.error('Email send error:', err);
      alert('Не удалось отправить сообщение. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.backButton}
          onClick={handleBack}
          aria-label="Назад"
        >
          <ArrowLeft size={20} />
          Назад
        </button>

        <div className={styles.card}>
          <h1 className={styles.title}>Задать вопрос</h1>

          <form onSubmit={submit} className={styles.form} noValidate>
            {/* honeypot */}
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={onChange}
              className={styles.honeypot}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className={styles.row}>
              <label htmlFor="name" className={styles.label}>
                <User size={18} />
                Имя*
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                className={styles.input}
                placeholder="Ваше имя"
                required
              />
            </div>

            <div className={styles.row}>
              <label htmlFor="email" className={styles.label}>
                <Mail size={18} />
                Email*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                className={styles.input}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className={styles.row}>
              <label htmlFor="phone" className={styles.label}>
                <Phone size={18} />
                Телефон
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={onChange}
                className={styles.input}
                placeholder="+7 900 000-00-00"
              />
            </div>

            <div className={styles.row}>
              <label htmlFor="subject" className={styles.label}>
                Тема
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={onChange}
                className={styles.input}
                placeholder="Коротко опишите вопрос"
              />
            </div>

            <div className={styles.row}>
              <label htmlFor="message" className={styles.label}>
                <MessageSquare size={18} />
                Сообщение*
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={onChange}
                className={styles.textarea}
                rows={6}
                required
                placeholder="Опишите ваш вопрос"
              />
            </div>

            <div className={styles.captcha}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || 'YOUR_RECAPTCHA_SITE_KEY'}
                onChange={handleCaptcha}
                theme="light"
              />
            </div>

            <button
              type="submit"
              className={styles.submit}
              disabled={isSubmitting || !captchaToken}
            >
              {isSubmitting ? 'Отправка…' : 'Отправить'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
