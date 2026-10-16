import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "How It Works", href: "#how-it-works" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 text-xl font-bold tracking-tight text-indigo-600 sm:text-2xl"
          onClick={closeMenu}
        >
          Fixora<span className="text-slate-900">.</span>
        </Link>

        {/* Desktop navigation - centered */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Login and Get Started always visible */}
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-3">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `rounded-lg px-2 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                isActive
                  ? "text-indigo-600"
                  : "text-slate-700 hover:text-indigo-600"
              }`
            }
          >
            Login
          </NavLink>

          <Link
            to="/register"
            className="whitespace-nowrap rounded-lg bg-indigo-600 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-700 sm:px-5 sm:text-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Hamburger button - mobile only */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:h-11 sm:w-11 lg:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Background overlay */}
      {menuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMenu}
          className="fixed inset-0 top-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      {/* Right-side drawer */}
      <aside
        id="mobile-navigation"
        className={`fixed right-0 top-0 z-50 flex h-dvh w-72 max-w-[85vw] flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out sm:w-80 lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <span className="text-xl font-bold text-indigo-600">
            Fixora<span className="text-slate-900">.</span>
          </span>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            tabIndex={menuOpen ? 0 : -1}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <div className="flex-1 space-y-1 overflow-y-auto px-5 py-5">
          <p className="mb-2 px-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            Navigation
          </p>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
              className="flex items-center rounded-xl px-4 py-2.5 text-base font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Drawer footer */}
        <div className="border-t border-slate-200 px-5 py-4">
          <p className="text-center text-xs text-slate-400">
            Find the right professional with Fixora.
          </p>
        </div>
      </aside>
    </nav>
  );
};

export default Navbar;
