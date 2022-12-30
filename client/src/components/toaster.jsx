import React from "react";

import {
    toast,
    ToastContainer,
    Slide,
    Zoom,
    Flip,
    Bounce,
} from "react-toastify";

const toastSettings = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Flip,
    // disableStack: true,
};

export const toastInfo = (title) => toast.info(title, toastSettings);
export const toastError = (title) => toast.error(title, toastSettings);
export const toastWarning = (title) => toast.warning(title, toastSettings);
export const toastSuccess = (title) => toast.success(title, toastSettings);

export function ToasterContainer() {
    return (
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            // transition="flip"
        />
    );
}
