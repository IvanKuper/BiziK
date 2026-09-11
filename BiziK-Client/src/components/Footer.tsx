import { FunctionComponent } from "react";
import { Camera, Code2, Link as LinkIcon } from "lucide-react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <footer
      id="footer"
      className="mt-10 w-full border-t border-slate-200 bg-white py-6 text-center dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-center justify-center gap-4">
        <a
          className="text-slate-500 transition-colors hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"
          href="https://www.linkedin.com/in/ivankuper/"
          target="_blank"
          rel="noreferrer"
        >
          <LinkIcon size={20} />
        </a>
        <a
          className="text-slate-500 transition-colors hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"
          href="https://github.com/IvanKuper"
          target="_blank"
          rel="noreferrer"
        >
          <Code2 size={20} />
        </a>
        <a
          className="text-slate-500 transition-colors hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"
          href="https://www.linkedin.com/in/ivankuper/"
          target="_blank"
          rel="noreferrer"
        >
          <Camera size={20} />
        </a>
      </div>

      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        All rights reserved {new Date().getFullYear()} ©{" "}
        <a
          className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          href="https://ivankuper.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          Ivan Kuper.
        </a>
      </p>
    </footer>
  );
};

export default Footer;
