import { ChangeEvent, FunctionComponent, useState } from "react";
import Navbar from "./Navbar";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { addCard } from "../services/cardService";
import {
  errorMsg,
  getErrorMessage,
  successMsg,
} from "../services/feedbackService";
import Footer from "./Footer";
import { AlertCircle, IdCard, Loader2, Upload } from "lucide-react";

interface NewcardProps {}

const fields: { name: keyof typeof initial; label: string; placeholder: string }[] = [
  { name: "business_name", label: "Name", placeholder: "Business name" },
  { name: "business_desc", label: "Description", placeholder: "Description" },
  { name: "business_adress", label: "Address", placeholder: "Address" },
  { name: "business_phone", label: "Phone", placeholder: "Phone" },
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
  const [isSaving, setIsSaving] = useState(false);
  const formik = useFormik({
    initialValues: initial,
    validationSchema: yup.object({
      business_name: yup.string().required(" Name is Required").min(2),
      business_desc: yup.string().required(" Description is Required").min(2),
      business_adress: yup.string().required("Address is Required").min(2),
      business_phone: yup
        .string()
        .required(" Phone is Required")
        .matches(/^0[2-9]\d{7,8}$/, "Enter a valid Israeli phone number"),
      business_image: yup.string().required(" Image is Required"),
    }),
    onSubmit: (values) => {
      setIsSaving(true);
      addCard(values)
        .then((result) => {
          successMsg("Card Added Successfully!");
          navigate("/all-cards");
        })
        .catch((err) => {
          errorMsg(getErrorMessage(err, "Could not add the card."));
        })
        .finally(() => {
          setIsSaving(false);
        });
    },
  });
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 2_000_000) {
      errorMsg("Choose an image smaller than 2 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      formik.setFieldValue("business_image", reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="mb-6 flex items-center justify-center gap-2 text-center text-2xl font-bold text-slate-800 dark:text-slate-100">
            <IdCard size={26} /> Create New BiziK Card
          </h1>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
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

              <div>
                <label
                  htmlFor="business_image_file"
                  className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300"
                >
                  Image (required)
                </label>
                <div className="flex gap-2">
                  <input
                    id="business_image_file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                  <Upload aria-hidden="true" className="mt-2 shrink-0 text-primary-600" size={20} />
                </div>
                <input
                  aria-label="Image URL fallback"
                  type="url"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  placeholder="Or paste an image URL"
                  name="business_image"
                  value={formik.values.business_image.startsWith("data:") ? "" : formik.values.business_image}
                  onChange={formik.handleChange}
                />
              </div>

              <button
                disabled={!(formik.isValid && formik.dirty) || isSaving}
                type="submit"
                className="w-full rounded-lg bg-primary-600 py-2.5 font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="mx-auto animate-spin" size={18} /> : "Create Card"}
              </button>
            </form>
          </div>
          <aside className="animate-fade-in rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
            <h2 className="mb-4 text-lg font-bold text-slate-800 dark:text-slate-100">Live Preview</h2>
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex h-36 items-center justify-center bg-slate-100 dark:bg-slate-800">
                {formik.values.business_image ? (
                  <img src={formik.values.business_image} alt="Business preview" className="h-full w-full object-contain p-3" />
                ) : <span className="text-sm text-slate-400">No image yet</span>}
              </div>
              <div className="space-y-2 p-4">
                <h3 className="font-bold text-slate-800 dark:text-slate-100">{formik.values.business_name || "Business name"}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{formik.values.business_desc || "Business description"}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{formik.values.business_phone || "Phone number"}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{formik.values.business_adress || "Address"}</p>
              </div>
            </div>
          </aside>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Newcard;
