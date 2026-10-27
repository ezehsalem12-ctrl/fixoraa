import { NavLink } from "react-router-dom";
import {
  AlertCircle,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  MapPin,
  Play,
  RefreshCw,
  UserRound,
} from "lucide-react";

import { useProviderJobs } from "../../hooks/useProviderJobs";
import type { Job } from "../../types/job";
import type { JobAction } from "../../hooks/useProviderJobs";

interface ProviderJobsListProps {
  limit?: number;
  showViewAll?: boolean;
}

const formatStatus = (status: string | undefined) =>
  (status ?? "unknown").replace(/_/g, " ");

const ProviderJobsList = ({
  limit,
  showViewAll = false,
}: ProviderJobsListProps) => {
  const { jobs, isLoading, isError, error, refetch, actionMutation } =
    useProviderJobs();

  const displayedJobs: Job[] =
    typeof limit === "number" ? jobs.slice(0, limit) : jobs;

  const renderJobAction = (job: Job) => {
    let action: JobAction | null = null;
    let label = "";
    let Icon = Play;

    if (job.status === "requested") {
      action = "accept";
      label = "Accept Job";
      Icon = CheckCircle2;
    } else if (job.status === "accepted") {
      action = "start";
      label = "Start Job";
      Icon = Play;
    } else if (job.status === "in_progress") {
      action = "review";
      label = "Submit for Review";
      Icon = ClipboardCheck;
    }

    if (!action) return null;

    return (
      <button
        type="button"
        disabled={actionMutation.isPending}
        onClick={() => actionMutation.mutate({ jobId: job._id, action })}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <Icon size={17} />
        {actionMutation.isPending && actionMutation.variables?.jobId === job._id
          ? "Updating..."
          : label}
      </button>
    );
  };

  return (
    <section>
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-indigo-600">Your Work</p>

          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            My Jobs
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review your assigned jobs and update their progress.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 disabled:opacity-50 sm:self-auto"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
          Loading your jobs...
        </div>
      )}

      {isError && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-white p-6"
        >
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="mt-0.5 shrink-0 text-red-600" />

            <div>
              <h3 className="font-semibold text-red-700">
                We couldn't load your jobs.
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                {error instanceof Error ? error.message : "Please try again."}
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !isError && jobs.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <BriefcaseBusiness size={26} />
          </span>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            No assigned jobs yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Browse available requests and accept jobs that match your skills.
            Accepted jobs will appear here.
          </p>

          <NavLink
            to="/jobs"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <BriefcaseBusiness size={18} />
            Browse Available Jobs
          </NavLink>
        </div>
      )}

      {!isLoading && !isError && jobs.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {displayedJobs.map((job) => (
              <article
                key={job._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="wrap-break-word text-lg font-bold text-slate-900">
                      {job.service || "Service request"}
                    </h3>

                    <p className="mt-1 text-sm capitalize text-slate-500">
                      {job.category?.replace(/_/g, " ") ?? "other"}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold capitalize text-indigo-700">
                    {formatStatus(job.status)}
                  </span>
                </div>

                <p className="mt-4 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-slate-600">
                  {job.description || "No description provided."}
                </p>

                <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
                  <p className="flex items-start gap-2 text-slate-600">
                    <MapPin
                      size={17}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />

                    <span className="wrap-break-word">
                      {job.location || "Location not provided"}
                    </span>
                  </p>

                  <p className="flex items-start gap-2 text-slate-600">
                    <UserRound
                      size={17}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />

                    <span>
                      Customer:{" "}
                      <span className="font-medium text-slate-800">
                        {typeof job.customer === "string"
                          ? job.customer
                          : (job.customer?.name ?? "Customer")}
                      </span>
                    </span>
                  </p>
                </div>

                <div className="mt-5 flex flex-col justify-between gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Job Budget
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      ₦{(Number(job.price) || 0).toLocaleString("en-NG")}
                    </p>
                  </div>

                  <div className="w-full sm:w-auto">
                    {renderJobAction(job) ?? (
                      <p className="rounded-xl bg-slate-50 px-4 py-3 text-center text-sm font-medium capitalize text-slate-500">
                        {job.status === "awaiting_review"
                          ? "Waiting for customer review"
                          : job.status === "completed"
                            ? "Job completed"
                            : job.status === "cancelled"
                              ? "Job cancelled"
                              : "No action available"}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {showViewAll && jobs.length > (limit ?? jobs.length) && (
            <div className="mt-6 text-center">
              <NavLink
                to="/provider/jobs"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
              >
                View all jobs ({jobs.length})
              </NavLink>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ProviderJobsList;
