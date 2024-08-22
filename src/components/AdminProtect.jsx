import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setUser } from "../redux/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
const AdminProtect = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const getAdmin = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}hospital/get-admin-info`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.msg);
        localStorage.setItem("user", JSON.stringify(response.data.hospital));

        dispatch(setUser(response.data.hospital));
      } else {
        toast.error(response.data.msg);
        localStorage.removeItem("token");
        if (localStorage.getItem("user")) localStorage.removeItem("user");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data.msg);
      localStorage.removeItem("token");
      if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
        dispatch(setUser(null));
      }
      navigate("/");
    }
  };
  useEffect(() => {
    if (!user) getAdmin();
  }, [user]);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminProtect;
