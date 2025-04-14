import { useState } from "react";
import { Container, Typography, Box, Grid, Divider } from "@mui/material";
import Modal from "../Modal/Modal";
import fuelSystemImage from "../../assets/images/MULTEAT_klapanKME.png";

const FuelSystem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box py={6} bgcolor="background.paper">
      <Container>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Система топливоподачи
        </Typography>
        <Divider sx={{ my: 4 }} />

        <Grid container spacing={4} alignItems="center">
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
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src={fuelSystemImage}
              alt="Fuel System Diagram"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
              onClick={() => setIsModalOpen(true)}
            />
          </Grid>
        </Grid>

        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <img
            src={fuelSystemImage}
            alt="Fuel System Diagram"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
            }}
          />
        </Modal>
      </Container>
    </Box>
  );
};

export default FuelSystem;
