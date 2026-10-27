import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Search, RotateCcw, X } from "lucide-react";

import { getAvailableJobs, getJobByCategory } from "../services/jobService";
import type { JobCategory } from "../types/job";
import JobCard from "./JobCard";

const categories: { label: string; value: JobCategory }[] = [
  { label: "Plumbing", value: "plumbing" },
  { label: "Electricals", value: "electricals" },
  { label: "Cleaning", value: "cleaning" },
  { label: "Painting", value: "painting" },
  { label: "Carpentry", value: "carpentry" },
  { label: "Writing", value: "writing" },
  { label: "Laundry", value: "laundry" },
  { label: "Tutoring", value: "tutoring" },
  { label: "Gardening", value: "gardening" },
  { label: "Other", value: "other" },
];

const AvailableJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | "">(
    "",
  );
  const [activeCategory, setActiveCategory] = useState<JobCategory | "">("");

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["available-jobs"],
    queryFn: getAvailableJobs,
    enabled: activeCategory === "",
  });

  const {
    data: categoryData,
    isPending: isCategoryPending,
    isError: isCategoryError,
    error: categoryError,
  } = useQuery({
    queryKey: ["available-jobs", "category", activeCategory],
    queryFn: () => getJobByCategory(activeCategory as JobCategory, 1, 8),
    enabled: activeCategory !== "",
  });

  const jobs = activeCategory ? (categoryData?.jobs ?? []) : (data?.jobs ?? []);

  const filteredJobs = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        !search ||
        [job.service, job.category, job.description, job.location].some(
          (value) => value?.toLowerCase().includes(search),
        );

      const matchesCategory =
        !activeCategory || job.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [jobs, searchTerm, activeCategory]);

  const loading = activeCategory ? isCategoryPending : isPending;
  const hasError = activeCategory ? isCategoryError : isError;
  const currentError = activeCategory ? categoryError : error;

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setActiveCategory("");
  };

  return (
    <section
      id="services"
      className="bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-12 lg:px-20 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
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

        {/* Live search and optional category filter */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:mb-10 sm:p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="job-search"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Search jobs
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                <Search size={19} className="shrink-0 text-slate-400" />

                <input
                  id="job-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Try plumbing, repairs, cleaning..."
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                    className="shrink-0 rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            <div className="min-w-0">
              <label
                htmlFor="job-category"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Filter by category (optional)
              </label>

              <select
                id="job-category"
                value={selectedCategory}
                onChange={(event) => {
                  const category = event.target.value as JobCategory | "";
                  setSelectedCategory(category);
                  setActiveCategory(category);
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">All categories</option>

                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(searchTerm || activeCategory) && (
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
            >
              <RotateCcw size={15} />
              Clear search and filters
            </button>
          )}
        </div>

        {/* Active filters */}
        {(activeCategory || searchTerm.trim()) && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-slate-600">Active filters:</span>

            {activeCategory && (
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold capitalize text-indigo-700">
                {activeCategory}
              </span>
            )}

            {searchTerm.trim() && (
              <span className="max-w-full break-words rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                Search: {searchTerm.trim()}
              </span>
            )}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        {hasError && (
          <div
            role="alert"
            className="rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center"
          >
            <p className="text-lg font-bold text-red-800">
              Unable to load available jobs
            </p>

            <p className="mt-2 break-words text-sm text-red-700">
              {currentError instanceof Error
                ? currentError.message
                : "Something went wrong. Please try again later."}
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !hasError && filteredJobs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center sm:rounded-3xl sm:px-6 sm:py-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
              🛠️
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              {searchTerm.trim()
                ? "No matching jobs found"
                : activeCategory
                  ? "No jobs found in this category"
                  : "No jobs available just yet"}
            </h3>

            <p className="mx-auto mt-2 max-w-md break-words leading-7 text-slate-600">
              {searchTerm.trim()
                ? "Try another keyword or clear your search to see more jobs."
                : activeCategory
                  ? "Try another category or clear the filter to see all available jobs."
                  : "New service requests will appear here when customers post jobs. Check back soon."}
            </p>

            {(searchTerm || activeCategory) && (
              <button
                type="button"
                onClick={handleReset}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                <RotateCcw size={16} />
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Job cards */}
        {!loading && !hasError && filteredJobs.length > 0 && (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-900">
                  {filteredJobs.length}
                </span>{" "}
                matching {filteredJobs.length === 1 ? "job" : "jobs"}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {filteredJobs.slice(0, 8).map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>

            <div className="mt-8 text-center sm:mt-10">
              <Link
                to="/jobs"
                className="inline-flex max-w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white transition hover:bg-indigo-700 sm:px-7"
              >
                Explore all jobs
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AvailableJobs;
