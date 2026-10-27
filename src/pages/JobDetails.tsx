import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Wallet,
  AlertCircle,
} from "lucide-react";

import { acceptJob, getJobById } from "../services/jobService";

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["job", id],
    queryFn: () => getJobById(id!),
    enabled: Boolean(id),
  });

  const job = data?.jobs;

  const acceptMutation = useMutation({
    mutationFn: () => acceptJob(job!._id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["job", id] });
      await queryClient.invalidateQueries();
    },
  });

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
          <p className="text-sm font-medium text-slate-600">
            Loading job details...
          </p>
        </div>
      </main>
    );
  }

  if (isError || !job) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <AlertCircle size={28} />
          </span>

          <h1 className="mt-5 text-xl font-bold text-slate-900 sm:text-2xl">
            Job not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            We couldn't load this job. It may no longer be available.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
          >
            <ArrowLeft size={17} />
            Back to available jobs
          </Link>
        </div>
      </main>
    );
  }

  const statusStyles: Record<string, string> = {
    requested: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    accepted: "bg-blue-50 text-blue-700 ring-blue-200",
    in_progress: "bg-amber-50 text-amber-700 ring-amber-200",
    awaiting_review: "bg-violet-50 text-violet-700 ring-violet-200",
    review: "bg-violet-50 text-violet-700 ring-violet-200",
    completed: "bg-slate-100 text-slate-600 ring-slate-200",
    cancelled: "bg-red-50 text-red-700 ring-red-200",
  };

  const isAvailable = job.status === "requested";

  return (
    <main className="min-h-screen overflow-x-clip bg-slate-50 px-3 py-5 sm:px-6 sm:py-8 lg:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <Link
          to="/"
          className="mb-5 inline-flex max-w-full items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600 sm:mb-7"
        >
          <ArrowLeft size={17} className="shrink-0" />
          <span>Back to available jobs</span>
        </Link>

        <div className="grid min-w-0 grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* Main job details */}
          <article className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
            <header className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-800 px-5 py-7 text-white sm:px-8 sm:py-9 lg:px-9 lg:py-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-white/5 sm:h-52 sm:w-52"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 right-16 h-36 w-36 rounded-full bg-indigo-400/10 sm:right-24 sm:h-44 sm:w-44"
              />

              <div className="relative min-w-0">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                  Fixora · Job details
                </p>

                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="max-w-full break-words rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold capitalize text-indigo-100">
                    {job.category || "General service"}
                  </span>

                  <span
                    className={`max-w-full break-words rounded-full px-3 py-1.5 text-xs font-bold capitalize ring-1 ring-inset ${
                      statusStyles[job.status] ??
                      "bg-slate-100 text-slate-600 ring-slate-200"
                    }`}
                  >
                    {job.status.replace(/_/g, " ")}
                  </span>
                </div>

                <h1 className="break-words text-2xl font-extrabold capitalize leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                  {job.service || "Service request"}
                </h1>

                <div className="mt-5 flex min-w-0 items-start gap-2 text-sm leading-6 text-indigo-100">
                  <MapPin size={18} className="mt-1 shrink-0" />
                  <span className="min-w-0 break-words">
                    {job.location || "Location not provided"}
                  </span>
                </div>
              </div>
            </header>

            <div className="p-5 sm:p-7 lg:p-9">
              <section>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  About this job
                </h2>

                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600 sm:text-base">
                  {job.description || "No description provided."}
                </p>
              </section>

              <div className="my-6 border-t border-slate-100 sm:my-8" />

              <section>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Job information
                </h2>

                <div className="mt-4 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:rounded-2xl sm:p-5">
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                      <MapPin size={20} />
                    </span>

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Location
                    </p>

                    <p className="mt-2 break-words text-sm font-semibold leading-6 text-slate-900">
                      {job.location || "Location not provided"}
                    </p>
                  </div>

                  <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:rounded-2xl sm:p-5">
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <BriefcaseBusiness size={20} />
                    </span>

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Service category
                    </p>

                    <p className="mt-2 break-words text-sm font-semibold capitalize leading-6 text-slate-900">
                      {job.category || "General service"}
                    </p>
                  </div>
                </div>
              </section>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50 p-4 sm:mt-8 sm:rounded-2xl sm:p-5">
                <ShieldCheck
                  size={21}
                  className="mt-0.5 shrink-0 text-indigo-700"
                />

                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-indigo-950">
                    Before accepting
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-indigo-800">
                    Review the job description, location, and budget carefully
                    before committing to the customer's request.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Budget and action panel */}
          <aside className="min-w-0 lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
              <div className="border-b border-slate-100 p-5 sm:p-6">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <Wallet size={17} />
                  Customer's budget
                </div>

                <p className="mt-3 break-words text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                  ₦{Number(job.price).toLocaleString("en-NG")}
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Budget provided by the customer for this job.
                </p>
              </div>

              <div className="space-y-4 p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm text-slate-500">Availability</span>

                  <span
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold ${
                      isAvailable ? "text-emerald-700" : "text-slate-500"
                    }`}
                  >
                    {isAvailable ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Clock3 size={16} />
                    )}

                    {isAvailable ? "Open for providers" : "Not available"}
                  </span>
                </div>

                {isAvailable ? (
                  <button
                    type="button"
                    onClick={() => acceptMutation.mutate()}
                    disabled={acceptMutation.isPending}
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {acceptMutation.isPending
                      ? "Accepting job..."
                      : "Apply for Job"}

                    {!acceptMutation.isPending && <ArrowRight size={18} />}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="min-h-12 w-full cursor-not-allowed rounded-xl bg-slate-100 px-4 py-3.5 text-sm font-semibold text-slate-400"
                  >
                    Job unavailable
                  </button>
                )}

                {acceptMutation.isSuccess && (
                  <p
                    role="status"
                    className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm leading-6 text-emerald-800"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                    <span>Job accepted successfully.</span>
                  </p>
                )}

                {acceptMutation.isError && (
                  <p
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-700"
                  >
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <span>
                      Could not accept this job. Please make sure you are logged
                      in as a provider and try again.
                    </span>
                  </p>
                )}

                <p className="text-xs leading-5 text-slate-500">
                  By accepting, you take responsibility for this job according
                  to Fixora's workflow.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <ShieldCheck size={21} />
                </span>

                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900">
                    Work with confidence
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Check the location, scope, and budget before accepting a
                    request.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default JobDetails;
