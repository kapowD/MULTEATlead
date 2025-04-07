import { Container, Typography, Box } from "@mui/material";
// import ReactPlayer from "react-player";

const AboutUs = () => {
  return (
    <Box py={6} bgcolor="background.paper">
      <Container>
        <Typography variant="h4" component="h2" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          We are passionate about providing high-quality heating solutions for
          your home. With years of experience in the industry, we understand the
          importance of reliable and efficient heating systems.
        </Typography>
        <Box my={4}>
          {/* <ReactPlayer
            url="https://www.youtube.com/watch?v=example"
            width="100%"
            height="400px"
            controls
          /> */}
          <iframe
            width="720"
            height="405"
            src="https://rutube.ru/play/embed/562e82f7a2bb045f1870d323378c5680/"
            frameBorder="0"
            allow="clipboard-write; autoplay"
            webkitAllowFullScreen
            mozallowfullscreen
            allowFullScreen
          ></iframe>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
