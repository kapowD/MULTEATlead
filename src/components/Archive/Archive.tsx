import { Container, Typography, Box, Button } from '@mui/material';
import { Archive as ArchiveIcon } from 'lucide-react';

const Archive = () => {
  return (
    <Box py={6} bgcolor="background.paper">
      <Container>
        <Typography variant="h4" component="h2" gutterBottom>
          Archive
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<ArchiveIcon />}
          sx={{
            fontSize: '1.2rem',
            padding: '12px 24px',
          }}
        >
          View Archive
        </Button>
      </Container>
    </Box>
  );
};

export default Archive;