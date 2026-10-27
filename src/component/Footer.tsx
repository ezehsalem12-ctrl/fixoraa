import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="about-us" className="scroll-mt-20 bg-black text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-6">
          {/* Brand and About */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center text-2xl font-extrabold tracking-tight text-white"
            >
              Fix<span className="text-indigo-500">ora</span>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
              Fixora connects customers with trusted service professionals for
              home repairs and everyday services. Find the right help and get
              the job done with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-indigo-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/#services"
                  className="transition-colors hover:text-indigo-400"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  to="/how-it-works"
                  className="transition-colors hover:text-indigo-400"
                >
                  How It Works
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="transition-colors hover:text-indigo-400"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="transition-colors hover:text-indigo-400"
                >
                  Create an Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Our Services
            </h3>

            <ul className="mt-4 space-y-2 text-sm">
              <li>Plumbing</li>
              <li>Electrical Services</li>
              <li>Cleaning</li>
              <li>Home Repairs</li>
              <li>General Services</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact Us
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Have questions or need assistance? Contact the Fixora team. We're
              here to help.
            </p>

            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span
                  className="mt-0.5 text-lg text-indigo-400"
                  aria-hidden="true"
                >
                  ✉
                </span>

                <div className="min-w-0">
                  <p className="font-semibold text-white">Email</p>

                  <a
                    href="mailto:ezehsalem12@gmail.com"
                    className="block break-all leading-5 text-slate-400 transition-colors hover:text-indigo-400"
                  >
                    ezehsalem12@gmail.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span
                  className="mt-0.5 text-lg text-indigo-400"
                  aria-hidden="true"
                >
                  ☎
                </span>

                <div>
                  <p className="font-semibold text-white">Phone</p>

                  <a
                    href="tel:09042644669"
                    className="block leading-5 text-slate-400 transition-colors hover:text-indigo-400"
                  >
                    09042644669
                  </a>
                </div>
              </li>
            </ul>

            <Link
              to="/register"
              className="mt-4 inline-flex items-center gap-2 font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
            >
              Get Started
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-white/10 pt-5">
          <div className="flex flex-col items-center justify-between gap-2 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
            <p>© {currentYear} Fixora. All rights reserved.</p>

            <p>Connecting people with trusted professionals.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
