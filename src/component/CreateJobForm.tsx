import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FormEvent } from "react";
import { createJob } from "../services/jobService";
import type { CreateJobInput, JobCategory } from "../types/job";

function CreateJobForm() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<CreateJobInput>({
    service: "",
    description: "",
    category: "other",
    location: "",
    price: 0,
  });

  const mutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["available-jobs"],
      });

      setFormData({
        service: "",
        description: "",
        category: "other",
        location: "",
        price: 0,
      });
    },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <section id="post-job" className="bg-slate-50 px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            GET STARTED WITH FIXORA
          </span>

          <h2 className="mt-6 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Get the right help for your next job.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
            Tell us what you need, where you need it, and your budget. Create a
            service request and connect with professionals who can help get the
            job done.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white font-bold text-indigo-600 shadow-sm">
                01
              </span>
              <div>
                <h3 className="font-bold text-slate-900">Describe your job</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Explain the service you need and provide the important
                  details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white font-bold text-indigo-600 shadow-sm">
                02
              </span>
              <div>
                <h3 className="font-bold text-slate-900">Set your budget</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Specify your budget and the location where the work is needed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white font-bold text-indigo-600 shadow-sm">
                03
              </span>
              <div>
                <h3 className="font-bold text-slate-900">
                  Connect with a provider
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Submit your request so an available provider can find it.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-9">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900">Post a job</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Fill in the details below to create your service request.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="service"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Service needed
              </label>
              <input
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                placeholder="e.g. Plumbing, Electrical repairs"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Job category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={(event) =>
                  setFormData((previousData) => ({
                    ...previousData,
                    category: event.target.value as JobCategory,
                  }))
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              >
                <option value="plumbing">Plumbing</option>
                <option value="electricals">Electricals</option>
                <option value="cleaning">Cleaning</option>
                <option value="painting">Painting</option>
                <option value="carpentry">Carpentry</option>
                <option value="writing">Writing</option>
                <option value="laundry">Laundry</option>
                <option value="tutoring">Tutoring</option>
                <option value="gardening">Gardening</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Job description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the work you need done..."
                required
                rows={4}
                className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Job location
              </label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Nnewi, Anambra"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Your budget (₦)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="1"
                value={formData.price || ""}
                onChange={handleChange}
                placeholder="e.g. 15000"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {mutation.isError && (
              <p
                role="alert"
                className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
              >
                {mutation.error instanceof Error
                  ? mutation.error.message
                  : "Failed to post job. Please try again."}
              </p>
            )}

            {mutation.isSuccess && (
              <p
                role="status"
                className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-700"
              >
                Job posted successfully!
              </p>
            )}

            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-4 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {mutation.isPending ? "Posting your job..." : "Post Job"}
              {!mutation.isPending && <span aria-hidden="true">→</span>}
            </button>

            <p className="text-center text-xs leading-5 text-slate-500">
              Please ensure your job details and budget are accurate before
              submitting.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateJobForm;
