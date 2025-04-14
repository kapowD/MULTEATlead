import { Container, Button } from "@mui/material";
import { Phone, MapPin, CreditCard } from "lucide-react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          {/* Company Info & Contacts Section */}
          <div>
            <section className={styles.section}>
              <h3 className={styles.title}>
                <MapPin size={14} className={styles.icon} />
                ИП Сафронов Валентин Олегович
              </h3>
              <h4 className={styles.subtitle}>ОГРНИП: 304540229900079</h4>
              <h4 className={styles.subtitle}>ИНН: 540208839316</h4>
              <div className={styles.contactItem}>
                <div>г. Новосибирск, 630082, ул. Дачная, д. 18</div>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.title}>
                <Phone size={14} className={styles.icon} />
                Тел./WhatsApp:
              </h3>
              <div className={styles.contactItem}>
                <div>
                  <a href="tel:+79139287984" className={styles.link}>
                    8-913-928-79-84
                  </a>
                  <a href="tel:+79139137675" className={styles.link}>
                    8-913-913-76-75
                  </a>
                  <a href="mailto:multeat@mail.ru" className={styles.link}>
                    multeat@mail.ru, multeat@gmail.com
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* Bank Details Section */}
          <div>
            <section className={styles.section}>
              <h3 className={styles.title}>
                <CreditCard size={14} className={styles.icon} />
                Платежные реквизиты:
              </h3>
              <div className={styles.bankDetails}>
                Банк: Сибирский банк ПАО Сбербанк России, г. Новосибирск,
                <br />
                Красный проспект, 45,
                <br />
                т. (383)220-91-94, 220-99-01, 236-10-84
              </div>
              <div className={styles.bankInfo}>
                <div>Р/с: 40802810744050097370</div>
                <div>Кор./сч.: 30101810500000000641</div>
                <div>БИК: 045004641</div>
                <div>ИНН: 7707083893</div>
                <div>КПП: 540602002</div>
              </div>
            </section>
          </div>

          {/* Question Section */}
          <div>
            <section className={styles.section}>
              <h3 className={styles.questionText}>Остались вопросы?</h3>
              <Button
                variant="contained"
                size="small"
                className={styles.button}
              >
                Задать вопрос
              </Button>
            </section>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
