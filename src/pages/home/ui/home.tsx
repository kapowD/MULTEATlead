import React from "react";
import Footer from "../../../components/Footer/Footer";
// ...другие импорты...

const Home = ({ footerRef }: { footerRef: React.RefObject<HTMLDivElement> }) => {
  return (
    <>
      {/* ...другие компоненты... */}
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
};

export default Home;