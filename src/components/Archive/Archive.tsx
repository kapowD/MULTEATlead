import { Box, Button, Container, Typography } from "@mui/material"
import { Archive as ArchiveIcon } from "lucide-react"
import { Link as RouterLink } from "react-router-dom"

import styles from "./Archive.module.scss"

const ArchiveCta = () => {
    return (
        <Box className={styles.archive}>
            <Container>
                <Typography className={styles.title} component="p">
                    Все паспорта отопителей вы найдёте в нашем архиве.
                </Typography>

                <Button
                    style={{ fontWeight: 600 }}
                    className={styles.button}
                    variant="contained"
                    size="large"
                    startIcon={<ArchiveIcon className={styles.icon} />}
                    component={RouterLink}
                    to="/archive"
                    aria-label="Перейти в архив"
                >
                    Перейти в архив
                </Button>
            </Container>
        </Box>
    )
}

export default ArchiveCta
