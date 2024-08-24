import React from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ClinicProtect = (props) => {
  const { user } = useSelector((state) => state.user);

  if (user?.role === "clinic") {
    return props.children;
  } else {
    toast.error("No Authorizations");
    return <Navigate to="/" />;
  }
};

export default ClinicProtect;
