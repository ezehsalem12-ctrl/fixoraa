function Hero() {
  return (
    <section className="min-h-screen overflow-hidden bg-slate-50 px-6">
      <div
        id="home"
        className="mx-auto grid max-w-7xl items-center gap-14 py-16 md:py-24 lg:grid-cols-2"
      >
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
            <span className="h-2 w-2 rounded-full bg-indigo-600" />
            YOUR HOME, OUR PRIORITY
          </span>

          <h1 className="mt-7 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Find trusted professionals for every{" "}
            <span className="text-indigo-600">job.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            From home repairs to everyday services, Fixora helps you connect
            with professionals who get the job done.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button className="rounded-xl bg-indigo-600 px-7 py-4 font-semibold text-white shadow-xl shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700">
              Find a Professional
            </button>

            <button className="rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700">
              Become a Provider
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
            <span>✓ Easy job posting</span>
            <span>✓ Connect with providers</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-5 rounded-[2rem] bg-indigo-200/50 blur-2xl" />

          <div className="relative rounded-[2rem] border border-white bg-gradient-to-br from-indigo-100 via-white to-blue-100 p-6 sm:p-10">
            <div className="rounded-3xl bg-white p-7 shadow-2xl shadow-indigo-900/10 sm:p-9">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-3xl">
                🔧
              </div>

              <p className="mt-7 text-sm font-semibold uppercase tracking-widest text-indigo-600">
                Home services made simple
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900">
                The right help, right when you need it.
              </h2>

              <p className="mt-4 leading-7 text-slate-500">
                Post a job, connect with a provider, and get started.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {["Plumbing", "Electrical", "Repairs"].map((service) => (
                  <span
                    key={service}
                    className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-5 right-2 rounded-2xl bg-white px-5 py-4 shadow-xl sm:-right-5">
              <p className="text-sm font-bold text-slate-900">
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
