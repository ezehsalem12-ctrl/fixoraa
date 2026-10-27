import { useState, type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  LayoutDashboard,
  BriefcaseBusiness,
  Search,
  UserRound,
  LogOut,
  Menu,
  X,
  House,
  CheckCircle2,
  Clock3,
  Wallet,
} from "lucide-react";

import useCurrentUser from "../hooks/CurrentUser";
import { useProviderJobs } from "../hooks/useProviderJobs";
import { logoutUser } from "../services/authService";
import ProviderJobsList from "./provider/ProviderJobsList";

const ProviderDashBoard = ({ children }: { children?: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const { data: currentUser } = useCurrentUser();
  const { jobs, isLoading } = useProviderJobs();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const displayName = currentUser?.name || "Provider";

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await logoutUser();
      queryClient.clear();
      setShowLogoutConfirm(false);

      navigate("/", {
        replace: true,
        state: { logoutSuccess: true },
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
      setLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  const menuItems = [
    {
      label: "Dashboard",
      path: "/provider",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "Available Jobs",
      path: "/jobs",
      icon: Search,
      end: true,
    },
    {
      label: "My Jobs",
      path: "/provider/jobs",
      icon: BriefcaseBusiness,
      end: true,
    },
    {
      label: "My Profile",
      path: "/provider/profile",
      icon: UserRound,
      end: true,
    },
  ];

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-indigo-50 text-indigo-700"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  const activeJobs = jobs.filter(
    (job) => job.status === "accepted" || job.status === "in_progress",
  ).length;

  const completedJobs = jobs.filter((job) => job.status === "completed").length;

  const reviewJobs = jobs.filter(
    (job) => job.status === "awaiting_review",
  ).length;

  const totalJobValue = jobs
    .filter((job) => job.status !== "cancelled")
    .reduce((total, job) => total + (Number(job.price) || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 md:hidden">
        <NavLink
          to="/"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <House size={19} />
          </span>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Fixora
          </span>
        </NavLink>

        <button
          type="button"
          onClick={() => setSidebarOpen((open) => !open)}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <NavLink
          to="/"
          onClick={() => setSidebarOpen(false)}
          className="hidden h-20 items-center gap-3 border-b border-slate-100 px-6 md:flex"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <House size={21} />
          </span>

          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Fixora
          </span>
        </NavLink>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Provider Menu
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={navLinkClasses}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Provider profile and logout */}
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
              {displayName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                {displayName}
              </p>

              <p className="text-xs text-slate-500">Service Provider</p>
            </div>

            <button
              type="button"
              onClick={() => setShowLogoutConfirm(true)}
              title="Log out"
              aria-label="Log out"
              className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-h-[calc(100vh-65px)] md:ml-64">
        {children ?? (
          <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {/* Dashboard heading */}
            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="mb-2 text-sm font-medium text-indigo-600">
                  Provider Dashboard
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Welcome back, {displayName.split(" ")[0]}!
                </h1>

                <p className="mt-2 text-sm text-slate-500 sm:text-base">
                  Manage your accepted jobs and discover new opportunities.
                </p>
              </div>

              <NavLink
                to="/jobs"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Search size={19} />
                Find Available Jobs
              </NavLink>
            </div>

            {/* Provider welcome banner */}
            <section className="relative mb-8 overflow-hidden rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
              <div className="relative z-10 max-w-xl">
                <p className="mb-3 text-sm font-medium text-indigo-300">
                  YOUR SKILLS. YOUR OPPORTUNITIES.
                </p>

                <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
                  Ready to get to work?
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-300 sm:text-base">
                  Keep track of your jobs, move work through each stage, and
                  deliver reliable service to your customers.
                </p>

                <NavLink
                  to="/jobs"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-indigo-50"
                >
                  Explore available jobs
                  <Search size={17} />
                </NavLink>
              </div>

              <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-35 border-white/5 sm:-right-5 sm:h-80 sm:w-80" />

              <div className="pointer-events-none absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-2xl" />
            </section>

            {/* Statistics */}
            <section
              aria-label="Provider job statistics"
              className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">
                    Active Jobs
                  </span>

                  <span className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                    <BriefcaseBusiness size={21} />
                  </span>
                </div>

                <p className="mt-4 text-3xl font-bold text-slate-900">
                  {isLoading ? "—" : activeJobs}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Accepted or in progress
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">
                    Completed Jobs
                  </span>

                  <span className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                    <CheckCircle2 size={21} />
                  </span>
                </div>

                <p className="mt-4 text-3xl font-bold text-slate-900">
                  {isLoading ? "—" : completedJobs}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Successfully completed
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">
                    Awaiting Review
                  </span>

                  <span className="rounded-xl bg-amber-50 p-3 text-amber-600">
                    <Clock3 size={21} />
                  </span>
                </div>

                <p className="mt-4 text-3xl font-bold text-slate-900">
                  {isLoading ? "—" : reviewJobs}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Submitted to customers
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">
                    Total Job Value
                  </span>

                  <span className="rounded-xl bg-teal-50 p-3 text-teal-600">
                    <Wallet size={21} />
                  </span>
                </div>

                <p className="mt-4 wrap-break-word text-2xl font-bold text-slate-900">
                  {isLoading
                    ? "—"
                    : `₦${totalJobValue.toLocaleString("en-NG")}`}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Value of assigned, non-cancelled jobs
                </p>
              </div>
            </section>

            {/* Reusable jobs preview */}
            <ProviderJobsList limit={3} showViewAll />
          </div>
        )}
      </main>

      {/* Logout confirmation */}
      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget && !loggingOut) {
              setShowLogoutConfirm(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <LogOut size={25} />
            </div>

            <h2
              id="logout-title"
              className="mt-4 text-center text-xl font-bold text-slate-900"
            >
              Log out of Fixora?
            </h2>

            <p className="mt-2 text-center text-sm leading-6 text-slate-500">
              Are you sure you want to log out of your provider account?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                disabled={loggingOut}
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={loggingOut}
                onClick={handleLogout}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loggingOut ? "Logging out..." : "Yes, Log Out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderDashBoard;
