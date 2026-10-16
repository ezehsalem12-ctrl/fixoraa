import AvailableJobs from "../component/AvailableJobs";
import CreateJobForm from "../component/CreateJobForm";
import Hero from "../component/Hero";
import Navbar from "../component/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <AvailableJobs />
      <CreateJobForm />
    </div>
  );
}

export default Home;
