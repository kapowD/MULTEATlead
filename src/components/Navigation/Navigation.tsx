import { Button, Container } from '@mui/material';
import { Flame, Home, Info, Phone, Settings, ShoppingCart, Video } from 'lucide-react';
import styles from './Navigation.module.scss';

const Navigation = () => {
  const buttons = [
    { icon: <Home className={styles.buttonIcon} />, label: 'О нас' },
    { icon: <Flame className={styles.buttonIcon} />, label: 'Продукция' },
    // { icon: <Info className={styles.buttonIcon} />, label: 'Информация' },
    { icon: <ShoppingCart className={styles.buttonIcon} />, label: 'Купить' },
    { icon: <Video className={styles.buttonIcon} />, label: 'Видео' },
    { icon: <Phone className={styles.buttonIcon} />, label: 'Контакты' },
  ];

  return (
    <div className={styles.navigation}>
      <Container>
        <div className={styles.grid}>
          {buttons.map((button) => (
            <Button
              key={button.label}
              variant="contained"
              className={styles.button}
              startIcon={button.icon}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Navigation;