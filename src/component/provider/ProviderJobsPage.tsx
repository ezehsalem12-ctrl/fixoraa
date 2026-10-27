import { NavLink } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import ProviderJobsList from "./ProviderJobsList";

const ProviderJobsPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <NavLink
        to="/provider"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-indigo-700"
      >
        <ArrowLeft size={17} />
        Back to Dashboard
      </NavLink>

      <ProviderJobsList />
    </div>
  );
};

export default ProviderJobsPage;
