import { Link } from "react-router-dom";
import { MapPin, Wallet, ArrowUpRight } from "lucide-react";
import type { Job } from "../types/job";

interface JobCardProps {
  job: Job;
}

const statusStyles: Record<string, string> = {
  requested: "bg-emerald-50 text-emerald-700",
  accepted: "bg-blue-50 text-blue-700",
  in_progress: "bg-amber-50 text-amber-700",
  awaiting_review: "bg-violet-50 text-violet-700",
  review: "bg-violet-50 text-violet-700",
  completed: "bg-slate-100 text-slate-600",
  cancelled: "bg-red-50 text-red-700",
};

const statusLabels: Record<string, string> = {
  requested: "Requested",
  accepted: "Accepted",
  in_progress: "In Progress",
  awaiting_review: "Awaiting Review",
  review: "Under Review",
  completed: "Completed",
  cancelled: "Cancelled",
};

const JobCard = ({ job }: JobCardProps) => {
  const isAvailable = job.status === "requested";

  const formattedPrice = Number(job.price).toLocaleString("en-NG", {
    maximumFractionDigits: 2,
  });

  return (
    <article className="flex h-full min-w-0 flex-col rounded-lg border border-slate-200 bg-white p-3.5 transition-colors hover:border-slate-300 sm:p-4">
      {/* Category and status */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-medium capitalize text-slate-500">
          {job.category?.replace(/_/g, " ") || "General service"}
        </span>

        <span
          className={`rounded px-2 py-1 text-[11px] font-medium ${
            statusStyles[job.status] ?? "bg-slate-100 text-slate-600"
          }`}
        >
          {statusLabels[job.status] ??
            job.status?.replace(/_/g, " ") ??
            "Unknown"}
        </span>
      </div>

      {/* Job title and description */}
      <div className="mt-3">
        <h3 className="wrap-break-word text-[15px] font-semibold leading-5 text-slate-900">
          {job.service || "Untitled job"}
        </h3>

        <p className="mt-1.5 line-clamp-2 wrap-break-word text-sm leading-5 text-slate-600">
          {job.description || "No description provided."}
        </p>
      </div>

      {/* Location */}
      <div className="mt-3 flex min-w-0 items-start gap-2 border-t border-slate-100 pt-3">
        <MapPin
          size={15}
          className="mt-0.5 shrink-0 text-slate-400"
          aria-hidden="true"
        />

        <p className="min-w-0 wrap-break-word text-sm text-slate-600">
          {job.location || "Location unavailable"}
        </p>
      </div>

      {/* Budget */}
      <div className="mt-3 flex min-w-0 items-center justify-between gap-2">
        <span className="text-xs text-slate-500">Budget</span>

        <span className="flex min-w-0 items-center gap-1.5 text-sm font-semibold text-slate-900">
          <Wallet
            size={14}
            className="shrink-0 text-slate-400"
            aria-hidden="true"
          />
          <span className="wrap-break-word">₦{formattedPrice}</span>
        </span>
      </div>

      {/* Action */}
      <div className="mt-auto pt-3.5">
        <Link
          to={`/jobs/${job._id}`}
          className="inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          {isAvailable ? "View job & apply" : "View job details"}

          <ArrowUpRight size={15} className="shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

export default JobCard;
