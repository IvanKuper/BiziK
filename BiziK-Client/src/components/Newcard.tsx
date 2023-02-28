import { FunctionComponent } from "react";
import Navbar from "./Navbar";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { addCard } from "../services/cardService";
import { errorMsg, successMsg } from "../services/feedbackService";
import Footer from "./Footer";

interface NewcardProps {}

const Newcard: FunctionComponent<NewcardProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      business_name: "",
      business_desc: "",
      business_adress: "",
      business_phone: "",
      business_image: "",
    },
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
      <h1 className="text-center mt-3">
        <i className="fa-solid fa-id-card"></i> Create New BiziK Card
      </h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 mt-1">
            {/* FORM */}
            <form onSubmit={formik.handleSubmit}>
              <div className="form-floating mb-3 w-50 mx-auto">
                <input
                  id="business_name"
                  type="text"
                  className="form-control "
                  placeholder=" Name"
                  name="business_name"
                  value={formik.values.business_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.business_name && formik.errors.business_name ? (
                  <p className="text-danger mt-2">
                    <i className="fa-solid fa-circle-exclamation mx-1"></i>
                    {formik.errors.business_name}
                  </p>
                ) : null}
                <label htmlFor="floatingInput"> Name</label>
              </div>

              <div className="form-floating mb-3 w-50 mx-auto">
                <input
                  id="business_desc"
                  type="text"
                  className="form-control "
                  placeholder=" Description"
                  name="business_desc"
                  value={formik.values.business_desc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.business_desc && formik.errors.business_desc ? (
                  <p className="text-danger mt-2">
                    <i className="fa-solid fa-circle-exclamation mx-1"></i>
                    {formik.errors.business_desc}
                  </p>
                ) : null}
                <label htmlFor="floatingInput"> Description</label>
              </div>

              <div className="form-floating mb-3 w-50 mx-auto">
                <input
                  id="business_adress"
                  type="text"
                  className="form-control "
                  placeholder=" Adress"
                  name="business_adress"
                  value={formik.values.business_adress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.business_adress &&
                formik.errors.business_adress ? (
                  <p className="text-danger mt-2">
                    <i className="fa-solid fa-circle-exclamation mx-1"></i>
                    {formik.errors.business_adress}
                  </p>
                ) : null}
                <label htmlFor="floatingInput"> Adress</label>
              </div>

              <div className="form-floating mb-3 w-50 mx-auto">
                <input
                  id="business_phone"
                  type="text"
                  className="form-control "
                  placeholder=" Phone"
                  name="business_phone"
                  value={formik.values.business_phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.business_phone &&
                formik.errors.business_phone ? (
                  <p className="text-danger mt-2">
                    <i className="fa-solid fa-circle-exclamation mx-1"></i>
                    {formik.errors.business_phone}
                  </p>
                ) : null}
                <label htmlFor="floatingInput"> Phone</label>
              </div>

              <div className="form-floating mb-3 w-50 mx-auto">
                <input
                  id="business_image"
                  type="text"
                  className="form-control "
                  placeholder=" Image"
                  name="business_image"
                  value={formik.values.business_image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.business_image &&
                formik.errors.business_image ? (
                  <p className="text-danger mt-2">
                    <i className="fa-solid fa-circle-exclamation mx-1"></i>
                    {formik.errors.business_image}
                  </p>
                ) : null}
                <label htmlFor="floatingInput"> Image</label>
              </div>

              <div className="button mx-auto">
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn btn-dark w-50  mt-1"
                >
                  Create Card
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Newcard;
