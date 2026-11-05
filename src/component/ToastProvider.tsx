"use client";

import { ToastContainer } from "react-toastify";

/**
 * Mounts the react-toastify container once for the whole app so every
 * `toast.success(...)` / `toast.error(...)` call is actually visible.
 */
const ToastProvider = () => {
  return <ToastContainer newestOnTop closeOnClick pauseOnHover />;
};

export default ToastProvider;
