import { LayoutDashboardIcon, SparklesIcon } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router";
import { BookOpenIcon } from "lucide-react";

const NavBar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <nav className="">
      <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
        <div className=" flex flex-row max-w-7xl mx-auto p-4 justify-between items-center">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-4 hover:scale-105 transition-transform duration-200"
          >
            <div className="size-10 rounded-xl bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <SparklesIcon className="size-6 text-white" />
            </div>

            <div className="flex flex-col">
              <span className="font-black tracking-wider text-lg bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono">
                Talent IQ
              </span>
              <span className="text-xs text-base-content/60 font-medium -mt-1">
                Code together!
              </span>
            </div>
          </Link>

          {/* LINK BTNS */}
          <div className="flex items-center gap-1">
            {/* PROBLEMS */}
            <Link
              to="/problems"
              className={`px-4 py-2.5 rounded-lg transition-all ${
                isActive("/problems")
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
              }`}
            >
              <div className="flex items-center gap-x-2 5">
                <BookOpenIcon className="size-6" />
                <span className="font-medium hidden md:inline">Problems</span>
              </div>
            </Link>

            {/* DASHBOARD */}
            <Link
              to="/dashboard"
              className={`px-4 py-2.5 rounded-lg transition-all ${
                isActive("/dashboard")
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
              }`}
            >
              <div className="flex items-center gap-x-2 5">
                <LayoutDashboardIcon className="size-6" />
                <span className="font-medium hidden md:inline">Dashboard</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </nav>
  );
};

export default NavBar;
