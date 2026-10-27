import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetails from "./pages/JobDetails";
import CreateJobForm from "./component/CreateJobForm";
import ProtectedRoute from "./component/ProtectedRoute";
import CustomerDashBoard from "./component/CustomerDashBoard";
import ProviderDashBoard from "./component/ProviderDashBoard";
import HowItWorksPage from "./component/HowItWorksPage";
import CustomerJobsPage from "./component/customer/CustomerJobsPage";
import ProviderJobsPage from "./component/provider/ProviderJobsPage";
import ProfilePage from "./component/ProfilePage";
import JobsPage from "./pages/JobsPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* Customer routes */}
        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="/customer" element={<CustomerDashBoard />} />

          <Route path="/customer/jobs" element={<CustomerJobsPage />} />

          <Route
            path="/customer/create-job"
            element={
              <CustomerDashBoard>
                <CreateJobForm />
              </CustomerDashBoard>
            }
          />

          <Route
            path="/customer/profile"
            element={
              <CustomerDashBoard>
                <ProfilePage />
              </CustomerDashBoard>
            }
          />
        </Route>

        {/* Provider routes */}
        <Route element={<ProtectedRoute allowedRoles={["provider"]} />}>
          <Route path="/provider" element={<ProviderDashBoard />} />

          <Route
            path="/provider/jobs"
            element={
              <ProviderDashBoard>
                <ProviderJobsPage />
              </ProviderDashBoard>
            }
          />

          <Route
            path="/provider/profile"
            element={
              <ProviderDashBoard>
                <ProfilePage />
              </ProviderDashBoard>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
