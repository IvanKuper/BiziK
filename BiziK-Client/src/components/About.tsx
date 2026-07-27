import { FunctionComponent } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 lg:grid-cols-2">
          <div className="animate-fade-in rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900 sm:p-8">
            <h1 className="mb-4 text-2xl font-bold text-slate-800 dark:text-slate-100">
              Information about business card?
            </h1>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              Knowing what business card details to add and what to leave out
              helps create a card that’s both eye-catching and well-balanced.
              When designed correctly, your business card reminds people of
              the first time you met and encourages those who are interested
              in your products or services to get back in touch or visit your
              website for more information. With our custom business card
              printing services, you can start designing for free and use our
              pre-made business card designs that already include all the
              information.
            </p>
            <img
              className="mx-auto mt-6 w-full max-w-sm"
              src="about2.svg"
              alt=""
            />
          </div>
          <div className="animate-fade-in rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900 sm:p-8">
            <h1 className="mb-4 text-2xl font-bold text-slate-800 dark:text-slate-100">
              The Front of Your Business Card
            </h1>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              A business card represents two different entities: you and your
              business. Typically, designers separate these two entities when
              creating a card layout. On one side of the card (the “front”),
              you’ll see information about your employer and the work they
              do. On the other side (the “back”), you’ll find specific
              information about you and your job.
            </p>
            <img
              className="mx-auto mt-6 w-full max-w-sm"
              src="about1.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
