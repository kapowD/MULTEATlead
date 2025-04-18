import { useState } from "react";
import { Container, Typography, Box, Grid, Divider } from "@mui/material";
import Modal from "../Modal/Modal";
import fuelSystemImage from "../../assets/images/MULTEAT_klapanKME.png";
import styles from "./FuelSystem.module.scss";

const FuelSystem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box className={styles.fuelSystem}>
      <Container>
        <Box className={styles.title}>Система топливоподачи</Box>
        <Divider sx={{ my: 2 }} />

        <Grid container spacing={4} alignItems="flex-start">
          {/* ТЕКСТ */}
          <Grid item xs={12} md={7}>
            <Typography variant="body1" paragraph>
              Система подачи топлива в всех обогревателях основана на одном
              принципе: поддержание массы пластины вместе с топливом на заданном
              значении (половина пластины).
            </Typography>
            <Typography variant="body1" paragraph>
              При пустой тарелке, клапан КМЕ полностью открыт и топливо
              поступает в тарелку. По достижению установочной массы клапан
              закрывается. По мере сгорания топлива, масса уменьшается и клапан
              открывается. Процесс цикличен.
            </Typography>
            <Typography variant="body1">
              Клапан КМЕ расположен в удобном для обслуживания месте. Легко
              промывается, очищается, позволяет производить слив отстоя при
              работающем отопителе. Достаточно вывернуть на два оборота нижний
              винт. Срок жизни не ограничен.
            </Typography>
          </Grid>

          {/* ИЗОБРАЖЕНИЕ */}
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src={fuelSystemImage}
              alt="Fuel System Diagram"
              className={styles.image}
              onClick={() => setIsModalOpen(true)}
              sx={{
                display: "flex",
                marginX: "auto", // центрирование
              }}
            />
          </Grid>
        </Grid>

        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <img
            src={fuelSystemImage}
            alt="Fuel System Diagram"
            className={styles.modalImage}
          />
        </Modal>
      </Container>
    </Box>
  );
};

export default FuelSystem;
