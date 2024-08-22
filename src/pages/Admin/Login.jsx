import React, { useState } from "react";
import { isValidEmail } from "../../utils/helper";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userSlice";
import log from "../../assets/images/logo.png";
import {Link} from "react-router-dom"

const validateUserInfo = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

const Login = () => {
  const [hospitalInfo, setHospitalInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setHospitalInfo({ ...hospitalInfo, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(hospitalInfo);
    if (!ok) return toast.error(error, { duration: 2000 });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}hospital/login`,
        hospitalInfo
      );
      if (response.data.success) {
        toast.success(response.data.msg, { duration: 2000 });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.hospital));
        dispatch(setUser(response.data.hospital));
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg, { duration: 2000 });
    }
  };
  return (
    <div className="bg-white h-screen">
      {/* wrapper */}
      <div className="flex items-center justify-center mt-24 mb-16">
        {/* image */}
        <div className="hidden sm:block">
          <img className="w-full h-full object-cover" src={log} alt="" />
        </div>
        {/* login form */}
        <div className="w-[30%] border-[1.2px] border-[#d5d5d5]  rounded-md flex flex-col min-h-[400px]  shadow-lg shadow-purple-500/50 hover:shadow-purple-500/40">
          <h1 className="p-6 text-xl text-center font-semibold text-[#7c2c86]">
            Admin Login{" "}
          </h1>
          <form
            action=""
            className="flex flex-col mt-4 px-6 gap-y-8"
            onSubmit={submit}
          >
            <input
              type="text"
              name="email"
              placeholder="Email..."
              className="p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]   rounded-md"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password..."
              className="p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]   rounded-md"
              onChange={handleChange}
            />
            <button className="w-full mt-5 py-2  bg-purple-200 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/40 text-black  font-semibold rounded-lg">
              Login
            </button>
            <Link to="/" className="w- py-2  text-black hover:text-blue-500 text-sm  font-semibold rounded-lg">
              &lt;--Home
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
