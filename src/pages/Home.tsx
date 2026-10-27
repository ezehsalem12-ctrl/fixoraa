import AvailableJobs from "../component/AvailableJobs";
import Footer from "../component/Footer";
import Hero from "../component/Hero";
import Navbar from "../component/Navbar";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.logoutSuccess) return;

    // Remove the logout state to prevent the message from showing again.
    navigate("/", {
      replace: true,
      state: null,
    });

    toast.success("You have logged out successfully.", {
      toastId: "logout-success",
    });
  }, [location.state, navigate]);
  return (
    <>
      <Navbar />
      <Hero />
      <AvailableJobs />
      <Footer />
    </>
  );
}

export default Home;
