import { FunctionComponent } from "react";
import Navbar from "./Navbar";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { addCard } from "../services/cardService";
import { errorMsg, successMsg } from "../services/feedbackService";
import Footer from "./Footer";
import { AlertCircle, IdCard } from "lucide-react";

interface NewcardProps {}

const fields: { name: keyof typeof initial; label: string; placeholder: string }[] = [
  { name: "business_name", label: "Name", placeholder: "Business name" },
  { name: "business_desc", label: "Description", placeholder: "Description" },
  { name: "business_adress", label: "Adress", placeholder: "Adress" },
  { name: "business_phone", label: "Phone", placeholder: "Phone" },
  { name: "business_image", label: "Image", placeholder: "Image URL" },
];

const initial = {
  business_name: "",
  business_desc: "",
  business_adress: "",
  business_phone: "",
  business_image: "",
};

const Newcard: FunctionComponent<NewcardProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initial,
    validationSchema: yup.object({
      business_name: yup.string().required(" Name is Required").min(2),
      business_desc: yup.string().required(" Description is Required").min(2),
      business_adress: yup.string().required(" Adress is Required").min(2),
      business_phone: yup
        .string()
        .required(" Phone is Required")
        .min(9)
        .max(12),
      business_image: yup.string().required(" Image is Required"),
    }),
    onSubmit: (values) => {
      addCard(values)
        .then((result) => {
          successMsg("Card Added Successfully!");
          navigate("/all-cards");
        })
        .catch((err) => {
          errorMsg("Something went wrong!");
        });
    },
  });
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-xl px-4 py-10">
          <h1 className="mb-6 flex items-center justify-center gap-2 text-center text-2xl font-bold text-slate-800 dark:text-slate-100">
            <IdCard size={26} /> Create New BiziK Card
          </h1>
          <div className="animate-fade-in rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900 sm:p-8">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    type="text"
                    className={`w-full rounded-lg border px-3 py-2.5 text-slate-800 outline-none transition-colors focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-slate-100 ${
                      formik.touched[field.name] && formik.errors[field.name]
                        ? "border-red-400"
                        : "border-slate-300 dark:border-slate-700"
                    }`}
                    placeholder={field.placeholder}
                    name={field.name}
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched[field.name] && formik.errors[field.name] ? (
                    <p className="mt-1.5 flex items-center gap-1 text-sm text-red-500">
                      <AlertCircle size={14} />
                      {formik.errors[field.name]}
                    </p>
                  ) : null}
                </div>
              ))}

              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="w-full rounded-lg bg-primary-600 py-2.5 font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Create Card
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Newcard;
