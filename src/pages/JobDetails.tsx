import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
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
          <p className="font-medium text-slate-600">Loading job details...</p>
        </div>
      </main>
    );
  }

  if (isError || !job) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4">
        <div className="text-5xl" aria-hidden="true">
          🔎
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Job not found</h1>
        <p className="max-w-md text-center leading-7 text-slate-600">
          We couldn't load this job. It may no longer be available.
        </p>
        <Link
          to="/"
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Back to Available Jobs
        </Link>
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
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
        >
          <span aria-hidden="true">←</span>
          Back to available jobs
        </Link>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-800 px-6 py-9 text-white sm:px-9 sm:py-12">
              <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/5" />
              <div className="absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-indigo-400/10" />

              <div className="relative">
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-100">
                    {job.category || "General service"}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ring-1 ring-inset ${
                      statusStyles[job.status] ??
                      "bg-slate-100 text-slate-600 ring-slate-200"
                    }`}
                  >
                    {job.status.replace(/_/g, " ")}
                  </span>
                </div>

                <p className="mb-2 text-sm font-medium text-indigo-200">
                  FIXORA · JOB DETAILS
                </p>

                <h1 className="max-w-2xl text-3xl font-extrabold capitalize leading-tight tracking-tight sm:text-4xl">
                  {job.service}
                </h1>

                <div className="mt-5 flex items-center gap-2 text-sm text-indigo-100">
                  <span aria-hidden="true">📍</span>
                  <span>{job.location}</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-9">
              <section>
                <h2 className="text-lg font-bold text-slate-900">
                  About this job
                </h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                  {job.description}
                </p>
              </section>

              <div className="my-8 border-t border-slate-100" />

              <section>
                <h2 className="text-lg font-bold text-slate-900">
                  Job information
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-lg">
                      📍
                    </div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Location
                    </p>
                    <p className="mt-1 break-words font-semibold text-slate-900">
                      {job.location}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-lg">
                      🛠️
                    </div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Service category
                    </p>
                    <p className="mt-1 capitalize font-semibold text-slate-900">
                      {job.category || "General service"}
                    </p>
                  </div>
                </div>
              </section>

              <div className="mt-8 rounded-2xl bg-indigo-50 p-5 sm:p-6">
                <p className="text-sm font-semibold text-indigo-900">
                  Ready to take on this job?
                </p>
                <p className="mt-1 text-sm leading-6 text-indigo-800">
                  Review the details carefully before accepting the customer's
                  request.
                </p>
              </div>
            </div>
          </article>

          <aside className="lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-6">
                <p className="text-sm font-medium text-slate-500">
                  Customer's budget
                </p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                  ₦{Number(job.price).toLocaleString("en-NG")}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Budget provided by the customer for this job.
                </p>
              </div>

              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">Availability</span>
                  <span
                    className={`text-sm font-semibold ${
                      isAvailable ? "text-emerald-600" : "text-slate-500"
                    }`}
                  >
                    {isAvailable ? "Open for providers" : "Not available"}
                  </span>
                </div>

                {isAvailable ? (
                  <button
                    type="button"
                    onClick={() => acceptMutation.mutate()}
                    disabled={acceptMutation.isPending}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-700 px-5 py-4 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:bg-indigo-600 sm:hover:bg-indigo-700"
                  >
                    {acceptMutation.isPending
                      ? "Accepting job..."
                      : "Apply for Job"}
                    {!acceptMutation.isPending && (
                      <span className="transition sm:group-hover:translate-x-1">
                        →
                      </span>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full cursor-not-allowed rounded-xl bg-slate-100 px-5 py-4 font-semibold text-slate-400"
                  >
                    Job unavailable
                  </button>
                )}

                {acceptMutation.isSuccess && (
                  <p
                    role="status"
                    className="rounded-xl bg-emerald-50 p-3 text-sm leading-6 text-emerald-700"
                  >
                    Job accepted successfully.
                  </p>
                )}

                {acceptMutation.isError && (
                  <p
                    role="alert"
                    className="rounded-xl bg-red-50 p-3 text-sm leading-6 text-red-700"
                  >
                    Could not accept this job. Please make sure you are logged
                    in as a provider and try again.
                  </p>
                )}

                <p className="text-center text-xs leading-5 text-slate-500">
                  By accepting, you take responsibility for this job according
                  to Fixora's workflow.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <span className="text-xl" aria-hidden="true">
                  🛡️
                </span>
                <div>
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
