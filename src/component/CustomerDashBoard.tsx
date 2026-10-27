import { useState, type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  PlusCircle,
  UserRound,
  LogOut,
  Menu,
  X,
  House,
} from "lucide-react";

import useCurrentUser from "../hooks/CurrentUser";
import { logoutUser } from "../services/authService";
import CustomerJobsList from "./customer/CustomerJobsList";

interface CustomerDashBoardProps {
  children?: ReactNode;
}

const CustomerDashBoard = ({ children }: CustomerDashBoardProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const { data: currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const displayName = currentUser?.name || "Customer";

  const menuItems = [
    {
      label: "Dashboard",
      path: "/customer",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "My Jobs",
      path: "/customer/jobs",
      icon: BriefcaseBusiness,
      end: false,
    },
    {
      label: "Create Job",
      path: "/customer/create-job",
      icon: PlusCircle,
      end: false,
    },
    {
      label: "My Profile",
      path: "/customer/profile",
      icon: UserRound,
      end: false,
    },
  ];

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await logoutUser();

      // Clear cached data belonging to the logged-out account.
      queryClient.clear();

      setShowLogoutConfirm(false);

      navigate("/", {
        replace: true,
        state: {
          logoutSuccess: true,
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);

      toast.error("Logout failed. Please try again.");

      setLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-indigo-50 text-indigo-700"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

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
            Customer Menu
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

        {/* Customer profile and logout */}
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
              {displayName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                {displayName}
              </p>

              <p className="text-xs text-slate-500">Customer</p>
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
                  Customer Dashboard
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Welcome back, {displayName.split(" ")[0]}!
                </h1>

                <p className="mt-2 text-sm text-slate-500 sm:text-base">
                  Manage your jobs and find trusted professionals for your
                  needs.
                </p>
              </div>

              <NavLink
                to="/customer/create-job"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <PlusCircle size={19} />
                Create a Job
              </NavLink>
            </div>

            {/* Welcome banner */}
            <section className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
              <div className="relative z-10 max-w-xl">
                <p className="mb-3 text-sm font-medium text-indigo-300">
                  YOUR HOME, OUR PRIORITY
                </p>

                <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
                  What needs fixing today?
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-300 sm:text-base">
                  Create a job request, connect with skilled service providers,
                  and keep track of your home projects in one place.
                </p>
              </div>

              <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-35px border-white/5 sm:-right-5 sm:h-80 sm:w-80" />

              <div className="pointer-events-none absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-2xl" />
            </section>

            {/* Customer jobs component */}
            <CustomerJobsList />
          </div>
        )}
      </main>

      {/* Custom logout confirmation modal */}
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
              Are you sure you want to log out of your account?
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

export default CustomerDashBoard;
