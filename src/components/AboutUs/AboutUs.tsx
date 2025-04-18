import { Container, Divider } from "@mui/material";
import styles from "./AboutUs.module.scss";

// import ReactPlayer from "react-player";

const AboutUs = () => {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>О нас</h2>
        <Divider sx={{ my: 2 }} />
        <div className={styles.content}>
          <div className={styles.textContent}>
            <p className={styles.description}>
              Автономные отопители MULTEAT, печи на отработанном масле, обеспечивают
              бездымное сгорание отработанного масла и других, схожих по вязкости и
              летучести нефтепродуктов. Мы занимаемся проектированием и
              производством отопителей, работающих на отработанном масле с 2001
              года. За это время было разработано и произведено много различных
              моделей с разными системами топливоподачи. Из них наиболее надежной
              показала себя черпаковая система топливоподачи. Основным недостатком
              являлся электропривод системы топливоподачи. В 2009 возникла новая
              концепция отопителей под брендом MULTEAT, не потребляющих
              электроэнергию. Механизм топливоподачи защищен патентом РФ. В течении
              всех лет происходил поиск материалов, позволивших создать надежную и
              легкую в эксплуатации конструкцию.
            </p>
          </div>
          <div className={styles.videoContainer}>
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
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutUs;
