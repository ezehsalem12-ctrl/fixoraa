import { useEffect } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import HowItWorks from "../component/HowItWorks";

function HowItWorksPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <>
      <Navbar />
      <HowItWorks />
      <Footer />
    </>
  );
}

export default HowItWorksPage;
