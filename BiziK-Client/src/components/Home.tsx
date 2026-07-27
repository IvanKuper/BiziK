import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { LogIn, UserPlus } from "lucide-react";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 lg:grid-cols-2 lg:py-20">
          <div className="animate-fade-in flex flex-col justify-center">
            <h1 className="text-3xl font-extrabold leading-tight text-slate-800 dark:text-slate-100 sm:text-4xl">
              Welcome to BiziK, business industry zone by Ivan Kuper.
            </h1>
            <img
              className="mx-auto my-8 w-full max-w-md"
              src="welcome.svg"
              alt=""
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/signin"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
              >
                <LogIn size={18} /> Login
              </Link>
              <Link
                to="/signup"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary-600 px-6 py-3 font-semibold text-primary-600 transition-colors hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-950"
              >
                <UserPlus size={18} /> Register
              </Link>
            </div>
          </div>

          <div className="animate-fade-in rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900 sm:p-10">
            <h2 className="mb-6 text-center text-2xl font-bold text-slate-800 dark:text-slate-100">
              About this Website
            </h2>
            <div className="flex flex-col items-center">
              <img
                src="Profile.jpg"
                width="160"
                className="mb-4 rounded-full shadow-md"
                alt="Ivan Kuper"
              />
              <div className="text-slate-600 dark:text-slate-300">
                <p>
                  Hi. My name is Ivan Kuper and this Website is a project for
                  my Fullstack course in HackerU college.
                </p>
                <p className="mt-3 font-semibold text-slate-800 dark:text-slate-100">
                  Includes:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>User Authentication</li>
                  <li>API Service</li>
                  <li>
                    CRUD Operations that can be performed on business Cards
                  </li>
                </ul>
                <h3 className="mt-5 mb-2 text-lg font-bold text-slate-800 dark:text-slate-100">
                  Technologies used:
                </h3>
                <div className="flex flex-wrap items-center justify-around gap-4">
                  <img src="react.png" width="48" alt="React" />
                  <img src="typescript.png" width="48" alt="TypeScript" />
                  <img src="html5.png" width="48" alt="HTML5" />
                  <img src="css3.png" width="48" alt="CSS3" />
                  <img src="javascript.png" width="48" alt="JavaScript" />
                  <img src="node.png" width="48" alt="Node" />
                  <img src="bootstrap.png" width="48" alt="Bootstrap" />
                  <img src="Mongo.png" width="48" alt="MongoDB" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
