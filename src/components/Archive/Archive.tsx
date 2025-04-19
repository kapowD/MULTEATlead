import { Container, Typography, Box, Button } from "@mui/material";
import { Archive as ArchiveIcon } from "lucide-react";
import styles from "./Archive.module.scss";

const Archive = () => {
  return (
    <Box className={styles.archive}>
      <Container>
        <Typography className={styles.title} component="p">
          Все паспорта отопителей, Вы можете найти у нас в архиве.
        </Typography>
        <Button
          className={styles.button}
          variant="contained"
          size="large"
          startIcon={<ArchiveIcon className={styles.icon} />}
        >
          Перейти в архив
        </Button>
      </Container>
    </Box>
  );
};

export default Archive;