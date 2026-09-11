import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editCard, getCardById } from "../services/cardService";
import { errorMsg, successMsg } from "../services/feedbackService";
import * as yup from "yup";
import { useFormik } from "formik";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Card } from "../interfaces/Card";
import { AlertCircle, Loader2, SquarePen } from "lucide-react";

interface EditcardProps {}

const fields: { name: keyof ReturnType<typeof getInitial>; label: string }[] = [
  { name: "business_name", label: "Name" },
  { name: "business_desc", label: "Description" },
  { name: "business_adress", label: "Adress" },
  { name: "business_phone", label: "Phone" },
  { name: "business_image", label: "Image" },
];

function getInitial() {
  return {
    business_name: "",
    business_desc: "",
    business_adress: "",
    business_phone: "",
    business_image: "",
  };
}

const Editcard: FunctionComponent<EditcardProps> = () => {
  const { id } = useParams();
  const [card, setCard] = useState(getInitial());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getCardById(id as string)
      .then((result) => {
        setCard(result.data);
      })
      .catch(() => {
        errorMsg("Something went wrong!");
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      business_name: card.business_name,
      business_desc: card.business_desc,
      business_adress: card.business_adress,
      business_phone: card.business_phone,
      business_image: card.business_image,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      business_name: yup.string().required("Name is Required").min(2),
      business_desc: yup.string().required("Description is Required").min(2),
      business_adress: yup.string().required("Adress is Required").min(2),
      business_phone: yup.string().required("Phone is Required").min(9).max(12),
      business_image: yup.string().required("Image is Required"),
    }),
    onSubmit: (values) => {
      setIsSaving(true);
      let card: Card = { ...values, _id: id };
      editCard(card)
        .then((result) => {
          successMsg("Done!");
          navigate("/all-cards");
        })
        .catch((err) => {
          errorMsg("Something went wrong!");
        })
        .finally(() => setIsSaving(false));
    },
  });
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-xl px-4 py-10">
          <h1 className="mb-6 flex items-center justify-center gap-2 text-center text-2xl font-bold text-slate-800 dark:text-slate-100">
            <SquarePen size={24} /> Edit BizCard
          </h1>
          <div className="animate-fade-in rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900 sm:p-8">
            {isLoading ? (
              <div className="flex justify-center py-10"><Loader2 className="animate-spin text-primary-600" size={28} /></div>
            ) : <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                    placeholder={field.label}
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
                disabled={!(formik.isValid && formik.dirty) || isSaving}
                type="submit"
                className="w-full rounded-lg bg-primary-600 py-2.5 font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="mx-auto animate-spin" size={18} /> : "Edit Card"}
              </button>
            </form>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Editcard;
