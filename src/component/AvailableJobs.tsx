import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAvailableJobs } from "../services/jobService";
import JobCard from "./JobCard";

const AvailableJobs = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["available-jobs"],
    queryFn: getAvailableJobs,
  });

  const jobs = data?.jobs ?? [];

  return (
    <section id="services" className="bg-white px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
              <span className="h-2 w-2 rounded-full bg-indigo-600" />
              OPPORTUNITIES AROUND YOU
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Explore available jobs
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Find service requests, discover new opportunities, and connect
              with customers who need your skills.
            </p>
          </div>

          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:border-indigo-600 hover:text-indigo-600 sm:self-auto"
          >
            See all jobs
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Loading state */}
        {isPending && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-slate-200 p-6"
              >
                <div className="mb-5 h-12 w-12 rounded-xl bg-slate-200" />
                <div className="mb-3 h-5 w-3/4 rounded bg-slate-200" />
                <div className="mb-2 h-4 w-full rounded bg-slate-100" />
                <div className="mb-6 h-4 w-2/3 rounded bg-slate-100" />
                <div className="h-10 rounded-lg bg-slate-200" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div
            role="alert"
            className="rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center"
          >
            <p className="text-lg font-bold text-red-800">
              Unable to load available jobs
            </p>
            <p className="mt-2 text-sm text-red-700">
              {error instanceof Error
                ? error.message
                : "Something went wrong. Please try again later."}
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isPending && !isError && jobs.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
              🛠️
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No jobs available just yet
            </h3>

            <p className="mx-auto mt-2 max-w-md leading-7 text-slate-600">
              New service requests will appear here when customers post jobs.
              Check back soon.
            </p>
          </div>
        )}

        {/* Available job cards */}
        {!isPending && !isError && jobs.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-900">
                  {Math.min(jobs.length, 8)}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-900">{jobs.length}</span>{" "}
                available jobs
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {jobs.slice(0, 8).map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>

            {jobs.length > 8 && (
              <div className="mt-10 text-center">
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 font-semibold text-white transition hover:bg-indigo-700"
                >
                  Explore all jobs
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AvailableJobs;
