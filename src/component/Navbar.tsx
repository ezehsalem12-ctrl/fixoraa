import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import useCurrentUser from "../hooks/CurrentUser";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { data: currentUser, isPending } = useCurrentUser();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  const dashboardPath =
    currentUser?.role === "customer"
      ? "/customer"
      : currentUser?.role === "provider"
        ? "/provider"
        : null;

  const navLinks = [
    { name: "Home", href: "/", type: "route" },
    { name: "Explore Services", href: "/#services", type: "section" },
    { name: "How It Works", href: "/how-it-works", type: "route" },
    { name: "About Us", href: "/#about-us", type: "section" },
  ];

  const closeMenu = () => {
    if (drawerRef.current?.contains(document.activeElement)) {
      menuButtonRef.current?.focus();
    }

    setMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    type: string,
  ) => {
    event.preventDefault();
    closeMenu();

    // Return to the public homepage.
    if (href === "/") {
      if (location.pathname !== "/") {
        navigate("/", { replace: true, state: null });
      } else {
        navigate("/", { replace: true, state: null });
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }

      return;
    }

    // Navigate to a section on the public homepage.
    if (type === "section") {
      const sectionId = href.split("#")[1];

      if (!sectionId) return;

      if (location.pathname !== "/") {
        navigate("/", {
          replace: true,
          state: { scrollTo: sectionId },
        });
      } else {
        scrollToSection(sectionId);
      }

      return;
    }

    // Navigate to a separate page.
    navigate(href);
  };

  // Scroll to a requested section after returning to the homepage.
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sectionId = location.state?.scrollTo as string | undefined;

    if (sectionId) {
      const timeoutId = window.setTimeout(() => {
        scrollToSection(sectionId);

        navigate("/", {
          replace: true,
          state: null,
        });
      }, 100);

      return () => window.clearTimeout(timeoutId);
    }

    // Remove an old section hash on the homepage.
    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname + window.location.search,
      );
    }
  }, [location.pathname, location.state, navigate]);

  // Close the mobile menu with Escape and prevent background scrolling.
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const accountButtonClass =
    "inline-flex min-w-0 shrink items-center justify-center whitespace-nowrap rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:text-sm";

  return (
    <nav className="sticky top-0 z-50 w-full overflow-x-clip border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-14 w-full max-w-7xl items-center gap-1 px-2 py-2 sm:min-h-16 sm:gap-4 sm:px-6 lg:px-8">
        {/* Logo: always returns to the public homepage */}
        <Link
          to="/"
          onClick={(event) => handleNavClick(event, "/", "route")}
          className="shrink-0 text-xl font-bold tracking-tight text-indigo-600 sm:text-2xl"
          aria-label="Fixora home"
        >
          Fixora<span className="text-slate-900">.</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden flex-1 items-center justify-center gap-5 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href, link.type)}
              className="whitespace-nowrap text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Account actions */}
        <div className="ml-auto flex min-w-0 shrink items-center justify-end gap-0.5 sm:gap-2">
          {!isPending && dashboardPath ? (
            <NavLink
              to={dashboardPath}
              onClick={closeMenu}
              className={`${accountButtonClass} bg-indigo-600 px-2.5 py-2 text-white hover:bg-indigo-700 sm:px-4`}
            >
              Dashboard
            </NavLink>
          ) : !isPending && !currentUser ? (
            <>
              <NavLink
                to="/login"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${accountButtonClass} px-1.5 py-2 sm:px-3 ${
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
                onClick={closeMenu}
                className={`${accountButtonClass} bg-indigo-600 px-2 py-2 text-white hover:bg-indigo-700 sm:px-4`}
              >
                <span className="sm:hidden">Sign up</span>
                <span className="hidden sm:inline">Get Started</span>
              </Link>
            </>
          ) : null}
        </div>

        {/* Hamburger menu */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => {
            if (menuOpen) {
              closeMenu();
            } else {
              setMenuOpen(true);
            }
          }}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:h-10 sm:w-10 lg:hidden"
        >
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6"
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
          className="fixed inset-0 z-40 cursor-default bg-slate-950/40 lg:hidden"
        />
      )}

      {/* Mobile navigation drawer */}
      <aside
        ref={drawerRef}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed right-0 top-0 z-50 flex h-dvh w-[min(20rem,85vw)] max-w-full flex-col overflow-hidden border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4">
          <Link
            to="/"
            onClick={(event) => handleNavClick(event, "/", "route")}
            className="text-xl font-bold tracking-tight text-indigo-600"
          >
            Fixora<span className="text-slate-900">.</span>
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
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

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
            Navigation
          </p>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href, link.type)}
                className="flex min-h-12 items-center rounded-xl px-3 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-5 border-t border-slate-100 pt-5">
            {!isPending && dashboardPath ? (
              <NavLink
                to={dashboardPath}
                onClick={closeMenu}
                className="flex min-h-12 items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-indigo-700"
              >
                Go to Dashboard
              </NavLink>
            ) : !isPending && !currentUser ? (
              <div className="space-y-2">
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className="flex min-h-12 items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Login
                </NavLink>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="flex min-h-12 items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-base font-semibold text-white hover:bg-indigo-700"
                >
                  Get Started
                </Link>
              </div>
            ) : null}
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-200 px-5 py-4">
          <p className="text-center text-xs leading-5 text-slate-400">
            Find the right professional with Fixora.
          </p>
        </div>
      </aside>
    </nav>
  );
};

export default Navbar;
