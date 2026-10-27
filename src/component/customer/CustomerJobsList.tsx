import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import {
  BriefcaseBusiness,
  PlusCircle,
  MapPin,
  CalendarDays,
  RefreshCw,
  ArrowUpRight,
  XCircle,
  CheckCircle2,
} from "lucide-react";

import {
  getCustomerJobs,
  cancelJob,
  completeJob,
} from "../../services/jobService";
import type { Job, JobStatus } from "../../types/job";

const statusStyles: Record<JobStatus, string> = {
  requested: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  accepted: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  in_progress: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
  awaiting_review: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
  completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  cancelled: "bg-red-50 text-red-700 ring-1 ring-red-200",
};

const statusLabels: Record<JobStatus, string> = {
  requested: "Requested",
  accepted: "Accepted",
  in_progress: "In Progress",
  awaiting_review: "Awaiting Review",
  completed: "Completed",
  cancelled: "Cancelled",
};

const formatDate = (date?: string) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const CustomerJobsList = () => {
  const queryClient = useQueryClient();

  const {
    data: customerJobsResponse,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["customer-jobs"],
    queryFn: getCustomerJobs,
    enabled: Boolean(localStorage.getItem("token")),
  });

  const customerActionMutation = useMutation({
    mutationFn: ({
      jobId,
      action,
    }: {
      jobId: string;
      action: "cancel" | "complete";
    }) => (action === "cancel" ? cancelJob(jobId) : completeJob(jobId)),

    onSuccess: async (_response, variables) => {
      toast.success(
        variables.action === "cancel"
          ? "Job cancelled successfully."
          : "Job marked as completed successfully.",
      );

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["customer-jobs"] }),
        queryClient.invalidateQueries({ queryKey: ["available-jobs"] }),
        queryClient.invalidateQueries({ queryKey: ["provider-jobs"] }),
      ]);
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update the job. Please try again.",
      );
    },
  });

  const jobs: Job[] = customerJobsResponse?.jobs ?? [];

  const recentJobs = [...jobs]
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      return dateB - dateA;
    })
    .slice(0, 3);

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
      {/* Section heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
            Your Jobs
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {jobs.length > 0
              ? `You have ${jobs.length} job${jobs.length === 1 ? "" : "s"} posted.`
              : "View and manage your service requests."}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw size={15} className={isFetching ? "animate-spin" : ""} />
            Refresh
          </button>

          <NavLink
            to="/customer/jobs"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
          >
            View all jobs
            <ArrowUpRight size={16} />
          </NavLink>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="py-12 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
          <p className="mt-4 text-sm text-slate-500">Loading your jobs...</p>
        </div>
      )}

      {/* Error state */}
      {!isLoading && isError && (
        <div className="py-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <BriefcaseBusiness size={22} />
          </div>

          <p className="mt-4 font-semibold text-slate-800">
            We couldn't load your jobs.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Please check your connection and try again.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && jobs.length === 0 && (
        <div className="py-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <BriefcaseBusiness size={25} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            No jobs posted yet
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Your posted jobs will appear here. Create your first request to get
            started.
          </p>

          <NavLink
            to="/customer/create-job"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <PlusCircle size={17} />
            Create your first job
          </NavLink>
        </div>
      )}

      {/* Responsive job grid */}
      {!isLoading && !isError && recentJobs.length > 0 && (
        <div className="mt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {recentJobs.map((job) => {
              const isUpdating =
                customerActionMutation.isPending &&
                customerActionMutation.variables?.jobId === job._id;

              return (
                <article
                  key={job._id}
                  className="group flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-4 transition duration-200 hover:border-indigo-300 hover:shadow-md"
                >
                  {/* Card heading */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <BriefcaseBusiness size={19} />
                    </div>

                    <span
                      className={`max-w-full rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        statusStyles[job.status] ??
                        "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {statusLabels[job.status] ?? job.status ?? "Requested"}
                    </span>
                  </div>

                  {/* Job details */}
                  <div className="mt-4 min-w-0 flex-1">
                    <h3 className="wrap-break-word text-sm font-bold leading-5 text-slate-900">
                      {job.service || "Untitled job"}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-600">
                      {job.description || "No description provided."}
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="flex min-w-0 items-start gap-2 text-xs text-slate-500">
                        <MapPin
                          size={14}
                          className="mt-0.5 shrink-0 text-slate-400"
                        />
                        <span className="wrap-break-word">
                          {job.location || "Location unavailable"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <CalendarDays
                          size={14}
                          className="shrink-0 text-slate-400"
                        />
                        <span>{formatDate(job.createdAt)}</span>
                      </div>
                    </div>

                    <p className="mt-3 wrap-break-word text-xs font-medium capitalize text-slate-500">
                      {job.category?.replace(/_/g, " ") || "Other"}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <p className="text-[11px] font-medium text-slate-500">
                      Job price
                    </p>

                    <p className="mt-1 wrap-break-word text-lg font-bold text-slate-900">
                      ₦
                      {(Number(job.price) || 0).toLocaleString("en-NG", {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  {/* Customer actions */}
                  {(job.status === "requested" ||
                    job.status === "awaiting_review") && (
                    <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-3">
                      {job.status === "requested" && (
                        <button
                          type="button"
                          onClick={() =>
                            customerActionMutation.mutate({
                              jobId: job._id,
                              action: "cancel",
                            })
                          }
                          disabled={customerActionMutation.isPending}
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <XCircle size={15} />
                          {isUpdating ? "Cancelling..." : "Cancel Job"}
                        </button>
                      )}

                      {job.status === "awaiting_review" && (
                        <button
                          type="button"
                          onClick={() =>
                            customerActionMutation.mutate({
                              jobId: job._id,
                              action: "complete",
                            })
                          }
                          disabled={customerActionMutation.isPending}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <CheckCircle2 size={15} />
                          {isUpdating ? "Completing..." : "Mark as Completed"}
                        </button>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* View all jobs */}
          {jobs.length > 3 && (
            <div className="mt-6 flex justify-center border-t border-slate-100 pt-5">
              <NavLink
                to="/customer/jobs"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
              >
                View all {jobs.length} jobs
                <ArrowUpRight size={16} />
              </NavLink>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default CustomerJobsList;
