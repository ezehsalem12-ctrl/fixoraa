import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="mx-3 my-4 overflow-hidden rounded-2xl bg-slate-50 px-4 sm:mx-6 sm:my-6 sm:px-6 lg:mx-10 lg:px-6">
      <div
        id="home"
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 py-8 sm:gap-8 sm:py-10 md:gap-6 md:py-14 lg:grid-cols-2 lg:gap-8 lg:py-10"
      >
        {/* Hero text */}
        <div className="min-w-0">
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 sm:px-4 sm:text-sm">
            <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-600" />
            YOUR HOME, OUR PRIORITY
          </span>

          <h1 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:mt-7 sm:text-5xl lg:text-6xl">
            Find trusted professionals for every{" "}
            <span className="text-indigo-600">job.</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
            From home repairs to everyday services, Fixora helps you connect
            with professionals who get the job done.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap sm:mt-9 sm:gap-4">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-xl shadow-indigo-600/20 transition hover:bg-indigo-700 min-[480px]:w-auto sm:px-7 sm:py-4"
            >
              Find a Professional
            </button>

            <button
              type="button"
              onClick={() => navigate("/register?role=provider")}
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 min-[480px]:w-auto sm:px-7 sm:py-4"
            >
              Become a Provider
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600 sm:mt-8 sm:gap-x-6">
            <span>✓ Easy job posting</span>
            <span>✓ Connect with providers</span>
          </div>
        </div>

        {/* Spanner graphic */}
        <div className="relative mx-auto mt-2 w-full min-w-0 max-w-lg lg:mt-0">
          <div className="absolute -inset-2 rounded-4xl bg-indigo-200/50 blur-2xl sm:-inset-5" />

          <div className="relative rounded-3xl border border-white bg-linear-to-br from-indigo-100 via-white to-blue-100 p-3 sm:rounded-4xl sm:p-6 md:p-10">
            <div className="rounded-2xl bg-white p-5 shadow-2xl shadow-indigo-900/10 sm:rounded-3xl sm:p-7 md:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-3xl sm:h-16 sm:w-16">
                🔧
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-indigo-600 sm:mt-7 sm:text-sm">
                Home services made simple
              </p>

              <h2 className="mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                The right help, right when you need it.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500 sm:mt-4 sm:text-base sm:leading-7">
                Post a job, connect with a provider, and get started.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 sm:mt-7">
                {["Plumbing", "Electrical", "Repairs"].map((service) => (
                  <span
                    key={service}
                    className="rounded-full bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-700 sm:px-4 sm:text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating card: normal flow on mobile, floating on desktop */}
            <div className="relative mt-3 w-fit max-w-full rounded-xl bg-white px-4 py-3 shadow-lg sm:absolute sm:-bottom-5 sm:right-2 sm:mt-0 sm:rounded-2xl sm:px-5 sm:py-4 sm:shadow-xl sm:right-2 lg:-right-5">
              <p className="text-xs font-bold text-slate-900 sm:text-sm">
                Find the help you need
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Simple. Reliable. Convenient.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
