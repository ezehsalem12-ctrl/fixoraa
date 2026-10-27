import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createJob } from "../services/jobService";
import type { CreateJobInput, JobCategory } from "../types/job";

const initialFormData: CreateJobInput = {
  service: "",
  description: "",
  category: "other",
  location: "",
  price: 0,
};

function CreateJobForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateJobInput>(initialFormData);

  const mutation = useMutation({
    mutationFn: createJob,

    onSuccess: async () => {
      setFormData({ ...initialFormData });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["available-jobs"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["customer-jobs"],
        }),
      ]);

      toast.success("Job posted successfully!");

      navigate("/customer", { replace: true });
    },

    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error !== null && "response" in error
          ? (
              error as {
                response?: {
                  data?: {
                    message?: string;
                  };
                };
              }
            ).response?.data?.message
          : undefined;

      toast.error(message || "Failed to post job. Please try again.");
    },
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFormData((previousData) => ({
      ...previousData,
      category: event.target.value as JobCategory,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.service.trim()) {
      toast.error("Please enter the service you need.");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please describe the job.");
      return;
    }

    if (!formData.location.trim()) {
      toast.error("Please enter the job location.");
      return;
    }

    if (!Number.isFinite(formData.price) || formData.price <= 0) {
      toast.error("Your budget must be greater than zero.");
      return;
    }

    mutation.mutate({
      ...formData,
      service: formData.service.trim(),
      description: formData.description.trim(),
      location: formData.location.trim(),
      price: Number(formData.price),
    });
  };

  return (
    <section
      id="post-job"
      className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 sm:p-8 lg:p-10">
          <div className="mb-8">
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold tracking-wide text-indigo-700">
              CUSTOMER JOB REQUEST
            </span>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Post a job
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              Tell us what service you need, describe the work, and set your
              budget to connect with the right professional.
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
                type="text"
                value={formData.service}
                onChange={handleChange}
                placeholder="e.g. Plumbing, Electrical repairs"
                required
                maxLength={100}
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
                onChange={handleCategoryChange}
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
                maxLength={2000}
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
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Nnewi, Anambra"
                required
                maxLength={200}
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
                step="any"
                value={formData.price || ""}
                onChange={handleChange}
                placeholder="e.g. 15000"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

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
