"use client";

import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProviderProps {
  children: React.ReactNode;
}
export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer
        style={{ top: "4rem" }}
        position="top-center"
        autoClose={1000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
        transition={Slide}
      />
    </>
  );
}
