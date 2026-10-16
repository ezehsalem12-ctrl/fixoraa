import { Link } from "react-router-dom";
import type { Job } from "../types/job";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const statusStyles: Record<string, string> = {
    requested: "bg-emerald-50 text-emerald-700",
    accepted: "bg-blue-50 text-blue-700",
    in_progress: "bg-amber-50 text-amber-700",
    awaiting_review: "bg-violet-50 text-violet-700",
    review: "bg-violet-50 text-violet-700",
    completed: "bg-slate-100 text-slate-600",
    cancelled: "bg-red-50 text-red-700",
  };

  const isAvailable = job.status === "requested";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-950/5">
      <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-violet-500 to-indigo-300" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="inline-flex max-w-full items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold capitalize text-indigo-700">
              <span className="mr-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span className="truncate">
                {job.category || "General service"}
              </span>
            </span>

            <h3 className="mt-3 break-words text-xl font-bold capitalize leading-snug text-slate-900 transition group-hover:text-indigo-700">
              {job.service}
            </h3>
          </div>

          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${
              statusStyles[job.status] ?? "bg-slate-100 text-slate-600"
            }`}
          >
            {job.status.replace(/_/g, " ")}
          </span>
        </div>

        <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-600">
          {job.description}
        </p>

        <div className="mb-5 space-y-4 border-t border-slate-100 pt-4">
          <div className="flex items-start gap-3">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-base"
              aria-hidden="true"
            >
              📍
            </span>

            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500">Location</p>
              <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                {job.location}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-4">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Customer's budget
              </p>
              <p className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">
                ₦{Number(job.price).toLocaleString("en-NG")}
              </p>
            </div>

            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl"
              aria-hidden="true"
            >
              💰
            </span>
          </div>
        </div>

        <div className="mt-auto pt-1">
          <Link
            to={`/jobs/${job._id}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:bg-slate-900 sm:hover:bg-indigo-600"
          >
            {isAvailable ? "View Job & Apply" : "View Job Details"}
            <span
              aria-hidden="true"
              className="transition-transform duration-200 sm:group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
