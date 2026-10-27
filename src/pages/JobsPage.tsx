import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import JobCard from "../component/JobCard";
import { getAvailableJobsPage } from "../services/jobService";

const PAGE_SIZE = 8;

const JobsPage = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["available-jobs", "all-page", page],
    queryFn: async () => {
      const response = await getAvailableJobsPage(page, PAGE_SIZE);
      return response;
    },
  });

  const jobs = data?.jobs ?? [];
  const totalJobs = data?.pagination?.totalJobs ?? jobs.length;
  const totalPages = Math.max(1, Math.ceil(totalJobs / PAGE_SIZE));

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
          >
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <div className="mb-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-indigo-600">
              Fixora opportunities
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              All available jobs
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Browse service requests and find jobs that match your skills.
              Anyone can browse; only authorized providers can accept jobs.
            </p>
          </div>

          {isPending && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }, (_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="mb-5 h-5 w-2/3 rounded bg-slate-200" />
                  <div className="mb-3 h-4 rounded bg-slate-100" />
                  <div className="mb-6 h-4 w-3/4 rounded bg-slate-100" />
                  <div className="h-10 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div
              role="alert"
              className="rounded-2xl border border-red-200 bg-red-50 p-6"
            >
              <h2 className="font-bold text-red-800">
                Unable to load available jobs
              </h2>
              <p className="mt-2 text-sm text-red-700">
                {error instanceof Error
                  ? error.message
                  : "Please try again later."}
              </p>
            </div>
          )}

          {!isPending && !isError && jobs.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <h2 className="text-xl font-bold text-slate-900">
                No available jobs yet
              </h2>
              <p className="mt-2 text-slate-600">
                New jobs will appear here when customers post service requests.
              </p>
            </div>
          )}

          {!isPending && !isError && jobs.length > 0 && (
            <>
              <p className="mb-6 text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {(page - 1) * PAGE_SIZE + 1}
                  {"–"}
                  {(page - 1) * PAGE_SIZE + jobs.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-900">
                  {totalJobs}
                </span>{" "}
                jobs
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  aria-label="Jobs pagination"
                  className="mt-10 flex flex-wrap items-center justify-center gap-3"
                >
                  <button
                    type="button"
                    onClick={() => setPage((current) => current - 1)}
                    disabled={page === 1}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={18} />
                    Previous
                  </button>

                  <span className="px-2 text-sm font-medium text-slate-600">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() => setPage((current) => current + 1)}
                    disabled={page >= totalPages}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight size={18} />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default JobsPage;
