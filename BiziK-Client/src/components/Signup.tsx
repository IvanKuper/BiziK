import { ChangeEvent, FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { User } from "../interfaces/User";
import { signup } from "../services/userService";
import {
  errorMsg,
  getErrorMessage,
  successMsg,
} from "../services/feedbackService";
import { AlertCircle, UserPlus } from "lucide-react";

interface SignupProps {}

const Signup: FunctionComponent<SignupProps> = () => {
  // Checks if Checkbox is business or not
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckboxValue(true);
    } else {
      setCheckboxValue(false);
    }
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      email: yup.string().required().min(6).max(1024).email(),
      password: yup
        .string()
        .required()
        .min(8)
        .max(1024)
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d).+$/,
          "Password must include a letter and a number"
        ),
      biz: yup.boolean(),
    }),
    onSubmit: (values) => {
      let user: User = { ...values, biz: checkboxValue };
      signup(user)
        .then((result) => {
          sessionStorage.setItem("token", result.data.token);
          successMsg("You Registered Successfully!");
          if (checkboxValue === true) {
            navigate("/new-card");
          } else {
            navigate("/all-cards");
          }
        })
        .catch((err) => {
          errorMsg(getErrorMessage(err, "Could not create the account."));
        });
    },
  });

  const inputClass = (touched?: boolean, error?: string) =>
    `w-full rounded-lg border px-3 py-2.5 text-slate-800 outline-none transition-colors focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-slate-100 ${
      touched && error
        ? "border-red-400"
        : "border-slate-300 dark:border-slate-700"
    }`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-violet-800 px-4 py-12">
      <div className="animate-fade-in w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-slate-900">
        <Link to="/" className="flex justify-center">
          <img className="mb-6 w-32" src="logo.png" alt="" />
        </Link>
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-800 dark:text-slate-100">
          Create Free Account Now!
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className={inputClass(formik.touched.name, formik.errors.name)}
              placeholder="Name..."
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="mt-1.5 flex items-center gap-1 text-sm text-red-500">
                <AlertCircle size={14} />
                {formik.errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className={inputClass(formik.touched.email, formik.errors.email)}
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
              className={inputClass(
                formik.touched.password,
                formik.errors.password
              )}
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
            <UserPlus size={18} /> Register
          </button>

          <label
            htmlFor="subscribe"
            className="flex items-center justify-center gap-2 pt-1 text-sm text-slate-600 dark:text-slate-300"
          >
            <input
              className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              type="checkbox"
              onChange={handleChange}
              id="subscribe"
              name="subscribe"
            />
            I'm a business and want to create cards
          </label>

          <p className="pt-2 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
              to="/signin"
            >
              Click to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
