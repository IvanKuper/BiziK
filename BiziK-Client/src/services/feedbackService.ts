import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export const successMsg = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const errorMsg = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const getErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Please try again."
) => {
  if (!axios.isAxiosError(error)) return fallback;
  if (!error.response) return "Cannot connect to the server. Please try again.";

  const message = error.response.data;
  return typeof message === "string" && message.trim() ? message : fallback;
};
