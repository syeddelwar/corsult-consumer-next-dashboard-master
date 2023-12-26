import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { IconPlain } from "../index";
const ReactToastifyContainer = () => {
  return (
    <ToastContainer
      autoClose={1500}
      position="top-center"
      pauseOnHover={true}
      draggable={true}
      theme="light"
      closeButton={<IconPlain classes="fa fa-close -mt-1 !text-lg" />}
    />
  );
};

export default ReactToastifyContainer;
