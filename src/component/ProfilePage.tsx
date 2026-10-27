import { UserRound, Mail, ShieldCheck } from "lucide-react";
import useCurrentUser from "../hooks/CurrentUser";

const ProfilePage = () => {
  const { data: currentUser, isLoading, isError, refetch } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
        Loading your profile...
      </div>
    );
  }

  if (isError || !currentUser) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
        <p className="font-semibold text-red-700">
          Unable to load your profile.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Try again
        </button>
      </div>
    );
  }

  const displayName = currentUser.name || "User";
  const role = currentUser.role || "customer";

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <p className="text-sm font-medium text-indigo-600">Account</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          My Profile
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          View your account information.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-slate-900 px-6 py-8 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-700">
              {displayName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <h2 className="wrap-break-word text-xl font-bold text-white sm:text-2xl">
                {displayName}
              </h2>
              <p className="mt-1 text-sm capitalize text-slate-300">
                {role === "provider" ? "Service Provider" : "Customer"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-6 sm:p-8">
          <div className="flex items-start gap-4 rounded-xl border border-slate-100 p-4">
            <span className="rounded-lg bg-indigo-50 p-3 text-indigo-600">
              <UserRound size={20} />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-slate-500">Full Name</p>
              <p className="mt-1 wrap-break-word font-semibold text-slate-900">
                {currentUser.name || "Not provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-slate-100 p-4">
            <span className="rounded-lg bg-indigo-50 p-3 text-indigo-600">
              <Mail size={20} />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-slate-500">Email Address</p>
              <p className="mt-1 break-all font-semibold text-slate-900">
                {currentUser.email || "Not provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-slate-100 p-4">
            <span className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
              <ShieldCheck size={20} />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-slate-500">Account Role</p>
              <p className="mt-1 font-semibold capitalize text-slate-900">
                {role === "provider" ? "Service Provider" : "Customer"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
