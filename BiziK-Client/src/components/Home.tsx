import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import {
  ArrowRight,
  Check,
  IdCard,
  LogIn,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  UserPlus,
} from "lucide-react";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <main className="overflow-hidden bg-slate-950 text-white">
        <section className="relative isolate min-h-[760px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(124,58,237,0.32),transparent_32%),radial-gradient(circle_at_85%_30%,rgba(14,165,233,0.2),transparent_30%),linear-gradient(to_bottom,#020617,#0f172a)]" />
          <div className="absolute -left-28 top-36 h-72 w-72 rounded-full bg-primary-600/20 blur-3xl" />
          <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:48px_48px]" />

          <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary-700 shadow-lg shadow-primary-900/40">
                <IdCard size={23} />
              </span>
              <span className="text-2xl font-extrabold tracking-tight">BiziK</span>
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur transition hover:bg-white/10"
            >
              About BiziK
            </Link>
          </div>

          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-24 pt-14 lg:grid-cols-[1.05fr_.95fr] lg:pt-24">
            <div className="animate-fade-in">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-400/20 bg-primary-400/10 px-3 py-1.5 text-sm font-medium text-primary-200">
                <Sparkles size={15} />
                Your business. One smart card.
              </div>
              <h1 className="max-w-2xl text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl">
                Make every
                <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  connection count.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Create a beautiful digital business card, share it instantly,
                and help customers find your business in seconds.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/signup"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-slate-950 shadow-xl shadow-primary-950/30 transition hover:-translate-y-0.5 hover:bg-violet-50"
                >
                  <UserPlus size={18} />
                  Create free account
                  <ArrowRight
                    className="transition group-hover:translate-x-1"
                    size={17}
                  />
                </Link>
              <Link
                to="/signin"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                  <LogIn size={18} />
                  Sign in
              </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
                {["Free to start", "No design skills", "Share in seconds"].map(
                  (item) => (
                    <span key={item} className="flex items-center gap-1.5">
                      <Check className="text-emerald-400" size={16} />
                      {item}
                    </span>
                  )
                )}
              </div>
          </div>

            <div className="relative mx-auto w-full max-w-md lg:ml-auto">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-primary-500/30 to-cyan-400/20 blur-2xl" />
              <div className="animate-float relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.09] p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
                <div className="rounded-[1.55rem] bg-gradient-to-br from-violet-600 via-primary-700 to-slate-900 p-7">
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-black text-primary-700 shadow-lg">
                      IK
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-violet-100">
                      DIGITAL CARD
                    </span>
                  </div>
                  <div className="mt-20">
                    <p className="text-3xl font-extrabold tracking-tight">
                      Ivan Kuper
                    </p>
                    <p className="mt-1 text-violet-200">Full Stack Developer</p>
                  </div>
                  <div className="mt-8 flex items-end justify-between border-t border-white/15 pt-5">
                    <div className="space-y-1 text-sm text-slate-300">
                      <p>hello@bizik.app</p>
                      <p>www.bizik.app</p>
                    </div>
                    <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-slate-950">
                      <QrCode size={42} strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-900/90 px-4 py-3 shadow-xl backdrop-blur">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                  <ShieldCheck size={20} />
                </span>
                <div>
                  <p className="text-xs text-slate-400">Your card is</p>
                  <p className="text-sm font-bold text-white">Ready to share</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-slate-50 px-4 py-20 text-slate-900 dark:bg-slate-950 dark:text-white">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
                Everything you need
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                A better way to introduce your business
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Build your presence, get discovered, and share your details
                from one simple place.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: IdCard,
                  title: "Create",
                  text: "Build a polished card with your business details and image.",
                },
                {
                  icon: Search,
                  title: "Discover",
                  text: "Help customers find relevant businesses quickly.",
                },
                {
                  icon: QrCode,
                  title: "Share",
                  text: "Turn your card into a scannable connection in one tap.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary-800 dark:hover:shadow-none"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition group-hover:bg-primary-600 group-hover:text-white dark:bg-primary-950 dark:text-primary-300">
                    <Icon size={23} />
                  </span>
                  <h3 className="mt-5 text-xl font-bold">{title}</h3>
                  <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
