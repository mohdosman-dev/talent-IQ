import React from "react";
import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

const HomePage = () => {
  return (
    <div className="bg-linear-to-br from-base-100 via-base-200 to-base-300">
      {/* NAVBAR SECTION */}
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
                Let's code togehter!
              </span>
            </div>
          </Link>

          {/* AUTH BTN */}
          <div>
            <SignInButton mode="modal">
              <button className="group gap-2 px-6 py-3 bg-linear-to-r from-primary to-secondary text-white font-semibold flex items-center rounded-xl shadow-lg hover:scale-105 transition-all duration-200">
                <span>Get Started!</span>
                <ArrowRightIcon className="size-4 group-hover:-translate-x-0.5 transition-transform" />
              </button>
            </SignInButton>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT SECTION */}
          <div className="space-y-8">
            {/* PRIMARY BADGE */}
            <div className="badge badge-primary badge-lg">
              <ZapIcon className="size-4" />
              Real-time collabration
            </div>

            {/* LG TEXT */}
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                Code Together,
              </span>
              <br />
              <span className="text-base-content">Learn Together</span>
            </h1>

            {/* PARAGRAPH */}
            <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
              The ultimate platform for collaborative coding interviews and pair
              programming. Connect in real-time, solve problems together, and
              elevate your coding skills with our interactive environment.
            </p>

            {/* FEATURE BILLS */}
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Live Video Chat
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Code Editor
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Multiple Languages
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-4">
              <SignInButton mode="modal">
                <button className="btn btn-primary btn-lg">
                  Start Coding Now
                  <ArrowRightIcon className="size-5" />
                </button>
              </SignInButton>

              <button className="btn btn-outline btn-lg">
                <VideoIcon className="size-5" />
                Watch Demo
              </button>
            </div>

            {/* STATS */}
            <div className="stats stats-vertical lg:stats-horizontal bg-base-100">
              <div className="stat">
                <div className="stat-value text-primary">12K+</div>
                <span className="stat-title">Active users</span>
              </div>
              <div className="stat">
                <div className="stat-value text-secondary">90K+</div>
                <span className="stat-title">Problems</span>
              </div>
              <div className="stat">
                <div className="stat-value text-accent">99.9%</div>
                <span className="stat-title">Uptime</span>
              </div>
            </div>
          </div>
          {/* RIGHT SECTION */}
          <div>
            <img
              src="/images/hero.png"
              alt="CodeCollab"
              className="w-full h-auto rounded-3xl border-4 border-base-100 hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">
            Everything you need to{" "}
            <span className="text-primary font-mono">Success</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Powerful features to make your coding interviews seamless and
            productive
          </p>
        </div>

        {/* FEATRUES GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <VideoIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">HD Video Call</h3>
              <p className="text-base-content/70">
                Crystal clear video and audio for seamless communication during
                interviews
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Code2Icon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Live Code Editor</h3>
              <p className="text-base-content/70">
                Collaborate in real-time with syntax highlighting and multiple
                language support
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <UsersIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Easy Collaboration</h3>
              <p className="text-base-content/70">
                Share your screen, discuss solutions, and learn from each other
                in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
