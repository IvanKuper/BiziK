import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { signin } from "../services/userService";
import { User } from "../interfaces/User";
import { errorMsg, successMsg } from "../services/feedbackService";
import { AlertCircle, LogIn } from "lucide-react";

interface SigninProps {}

const Signin: FunctionComponent<SigninProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email is Required")
        .min(6)
        .max(1024)
        .email(),
      password: yup.string().required("Password is Required").min(8).max(1024),
    }),
    onSubmit: (values: User) => {
      signin(values)
        .then((result) => {
          sessionStorage.setItem("token", result.data.token);
          successMsg("Hi, nice to meet you!");
          navigate("/all-cards");
        })
        .catch((err) => {
          errorMsg("Something went Wrong, Try Agian");
        });
    },
  });
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-violet-800 px-4 py-12">
      <div className="animate-fade-in w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-slate-900">
        <Link to="/" className="flex justify-center">
          <img className="mb-6 w-32" src="logo.png" alt="" />
        </Link>
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-800 dark:text-slate-100">
          Login with your BiziK Account !
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              className={`w-full rounded-lg border px-3 py-2.5 text-slate-800 outline-none transition-colors focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-slate-100 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-400"
                  : "border-slate-300 dark:border-slate-700"
              }`}
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="mt-1.5 flex items-center gap-1 text-sm text-red-500">
                <AlertCircle size={14} />
                {formik.errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full rounded-lg border px-3 py-2.5 text-slate-800 outline-none transition-colors focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-slate-100 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-400"
                  : "border-slate-300 dark:border-slate-700"
              }`}
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="mt-1.5 flex items-center gap-1 text-sm text-red-500">
                <AlertCircle size={14} />
                {formik.errors.password}
              </p>
            ) : null}
          </div>

          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-2.5 font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogIn size={18} /> Login
          </button>

          <p className="pt-2 text-center text-sm text-slate-500 dark:text-slate-400">
            New Account?{" "}
            <Link
              className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
              to="/signup"
            >
              Click here to Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
