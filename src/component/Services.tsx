import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Brush,
  CheckCircle2,
  Hammer,
  Paintbrush,
  Wrench,
  Zap,
} from "lucide-react";

import Footer from "../component/Footer";

const services = [
  {
    title: "Plumbing",
    description:
      "Get help with leaking pipes, faulty taps, blocked drains, and other plumbing needs.",
    icon: Wrench,
  },
  {
    title: "Electrical Services",
    description:
      "Find professionals for electrical repairs, installations, and maintenance.",
    icon: Zap,
  },
  {
    title: "Cleaning",
    description:
      "Connect with people who can help keep your home and workspace clean.",
    icon: Brush,
  },
  {
    title: "Painting",
    description:
      "Find help with painting, refreshing walls, and improving your space.",
    icon: Paintbrush,
  },
  {
    title: "Carpentry",
    description:
      "Get assistance with furniture repairs, woodwork, and carpentry projects.",
    icon: Hammer,
  },
  {
    title: "Other Services",
    description:
      "Post your specific needs and describe the service you're looking for.",
    icon: BriefcaseBusiness,
  },
];

function Services() {
  return (
    <>
      <main className="min-h-screen bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
              OUR SERVICES
            </span>

            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Find the right professional for the job.
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
              From home maintenance to everyday tasks, Fixora helps you connect
              with service providers for your needs.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-950/5 sm:p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon size={23} aria-hidden="true" />
                  </div>

                  <h2 className="mt-5 text-xl font-bold text-slate-900">
                    {service.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>

                  <Link
                    to="/login"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
                  >
                    Get started
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              );
            })}
          </div>

          <section className="mt-14 rounded-2xl bg-slate-900 px-6 py-10 text-center sm:px-10">
            <CheckCircle2
              size={32}
              className="mx-auto text-indigo-300"
              aria-hidden="true"
            />

            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              Have a service in mind?
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-300">
              Describe what you need, set your budget, and submit a job request
              to connect with available professionals.
            </p>

            <Link
              to="/login"
              className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-700"
            >
              Get Started
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Services;
