import React from "react";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

const ClinicProtect = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role === "clinic") {
    return props.children;
  } else {
    console.log("asd")
    toast.error("No Authorizations");
    return <Navigate to="/" />;
  }
};

export default ClinicProtect;
