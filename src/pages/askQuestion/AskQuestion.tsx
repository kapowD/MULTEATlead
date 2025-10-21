import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, MessageSquare, Phone, User } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

import styles from "./AskQuestion.module.scss";

const AskQuestion: React.FC = () => {
  const navigate = useNavigate();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCaptcha = (token: string | null) => setCaptchaToken(token);

  const handleBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate("/");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.honeypot) return; // honeypot
    if (!captchaToken) {
      alert("Пожалуйста, подтвердите, что вы не робот.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append(
        "message",
        `Вопрос  MULTЕAT\n\nИмя: ${form.name}\nEmail: ${form.email}\nТелефон: ${form.phone}\nТема: ${form.subject}\n\nСообщение:\n${form.message}`
      );

      const res = await fetch("https://cr17192.rinethost.ru/send.php", {
        method: "POST",
        body: formData,
      });

      const result = await res.text();

      if (result.trim() === "ok") {
        alert("✅ Сообщение успешно отправлено!");
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          honeypot: "",
        });
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
        navigate("/");
      } else {
        console.error("Server response:", result);
        alert("❌ Ошибка при отправке: " + result);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("❌ Ошибка соединения с сервером");
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
                <User size={18} /> Имя*
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
                <Mail size={18} /> Email*
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
                <Phone size={18} /> Телефон
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
                <MessageSquare size={18} /> Сообщение*
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
                sitekey={
                  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
                  "YOUR_RECAPTCHA_SITE_KEY"
                }
                onChange={handleCaptcha}
                theme="light"
              />
            </div>

            <button
              type="submit"
              className={styles.submit}
              disabled={isSubmitting || !captchaToken}
            >
              {isSubmitting ? "Отправка…" : "Отправить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
