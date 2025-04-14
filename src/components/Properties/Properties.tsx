import { Container, Paper, Divider } from "@mui/material";

import {
  Factory,
  Zap,
  Settings,
  Shield,
  Droplet,
  Star,
  ScrollText,
  Maximize,
  Sliders,
  Clock,
  AlertTriangle,
  Power,
} from "lucide-react";
import styles from "./Properties.module.scss";

const properties = [
  {
    icon: <Factory />,
    text: "Используются для отопления производственных помещений, гаражей, СТО, бытовок, складов, теплиц и т. д. конвекционным методом.",
  },
  {
    icon: <Zap />,
    text: "Система топливоподачи автоматически прекратит работу при достижении уровня несгораемого осадка выше нормы.",
  },
  {
    icon: <Settings />,
    text: "Отличаются высокой надёжностью, простотой в установке и эксплуатации.",
  },
  {
    icon: <Shield />,
    text: "Камера сгорания из жаропрочной нержавеющей стали.",
  },
  {
    icon: <Droplet />,
    text: "Не требуется дополнительная очистка и подготовка топлива.",
  },
  { icon: <Star />, text: "Отсутствие мировых аналогов." },
  {
    icon: <ScrollText />,
    text: "Оригинальная система топливоподачи защищена патентом РФ № 93498.",
  },
  {
    icon: <Maximize />,
    text: "Наличие экранов из зеркальной нержавеющей стали, и малые габариты позволяют использование в небольших помещениях.",
  },
  {
    icon: <Sliders />,
    text: "Плавная регулировка мощности с помощью регулятора тяги (прилагается).",
  },
  { icon: <Clock />, text: "Очистка 1 раз в сутки (7 минут)." },
  {
    icon: <AlertTriangle />,
    text: "Не потребляют электроэнергии.",
  },
  { icon: <Power />, text: "Наличие системы аварийного отключения." },
];

const Properties = () => {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>Свойства отопителей</h2>
        <Divider sx={{ my: 4}} />
        <div className={styles.grid}>
          {properties.map((property, index) => (
            <Paper key={index} className={styles.card} elevation={3}>
              <div className={styles.iconWrapper}>{property.icon}</div>
              <p className={styles.text}>{property.text}</p>
            </Paper>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Properties;
