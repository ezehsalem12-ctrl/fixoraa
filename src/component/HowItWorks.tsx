import { Link } from "react-router-dom";
import useCurrentUser from "../hooks/CurrentUser";

function HowItWorks() {
  const { data: user, isPending, isError } = useCurrentUser();

  const isLoggedIn = Boolean(user);

  return (
    <section className="min-h-screen overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
        {/* Left side: How Fixora works */}
        <div className="min-w-0">
          <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold tracking-wide text-indigo-700">
            GET STARTED WITH FIXORA
          </span>

          <h1 className="mt-6 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Get the right help for your next job.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Tell us what you need, where you need it, and your budget. Fixora
            helps you connect with professionals who can get the job done.
          </p>

          <div className="mt-8 space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 font-bold text-indigo-700">
                01
              </span>

              <div>
                <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                  Describe your job
                </h2>
                <p className="mt-1 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
                  Explain the service you need and provide the important
                  details.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 font-bold text-indigo-700">
                02
              </span>

              <div>
                <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                  Set your budget
                </h2>
                <p className="mt-1 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
                  Choose your budget and specify where the work needs to be
                  done.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 font-bold text-indigo-700">
                03
              </span>

              <div>
                <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                  Connect with a provider
                </h2>
                <p className="mt-1 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
                  Submit your request so service providers can find your job.
                </p>
              </div>
            </div>
          </div>

          {/* Show Get Started only to logged-out visitors */}
          {!isPending && !isLoggedIn && (
            <Link
              to={isError ? "/login" : "/register"}
              className="mt-9 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Get Started
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>

        {/* Right side: Professional service image */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute -inset-3 rounded-3xl bg-indigo-100/70 blur-xl" />

          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/10">
            <img
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85"
              alt="Professional electrician carrying out home maintenance work"
              loading="lazy"
              className="h-72 w-full object-cover sm:h-96 lg:h-[540px]"
            />
          </div>

          <div className="absolute bottom-4 left-3 right-3 rounded-xl border border-white/70 bg-white/95 p-4 shadow-lg backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm sm:p-5">
            <p className="font-bold text-slate-900">
              Reliable help for your home
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Find the right professional for your next project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
