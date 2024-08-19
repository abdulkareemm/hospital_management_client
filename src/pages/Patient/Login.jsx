import React, { useState } from "react";
import { isValidEmail } from "../../utils/helper";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userSlice";
import login from "../../assets/images/to login.png";

const validateUserInfo = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};
const Login = () => {
  const [patientInfo, setPatientInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setPatientInfo({ ...patientInfo, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(patientInfo);
    if (!ok) return toast.error(error, { duration: 2000 });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}patient/login`,
        patientInfo
      );
      if (response.data.success) {
        toast.success(response.data.msg, { duration: 2000 });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.patient));
        dispatch(setUser(response.data.patient));
        setTimeout(() => {
          navigate("/");
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
      <div className="flex items-center justify-center mt-24 gap-1">
        {/* image */}
        <div className="hidden sm:block">
          <img
            className="w-[600px] h-[600px] object-cover"
            src={login}
            alt=""
          />
        </div>

        <div className="w-[30%] border-[1.2px] border-[#d5d5d5]  rounded-md flex flex-col min-h-[400px]  shadow-lg shadow-purple-500/50 hover:shadow-purple-500/40 ">
          <h1 className="p-6 text-xl font-bold text-[#7c2c86] text-center">
            Patient login{" "}
          </h1>
          <form
            action=""
            className="flex flex-col mt-4 px-6 gap-y-5"
            onSubmit={submit}
          >
            <div className="flex flex-col mt-4 px-6 gap-y-5">
              <label>Email</label>
              <input
                className="p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
                type="email"
                name="email"
                value={patientInfo.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mt-4 px-6 gap-y-5">
              <label>Password</label>
              <input
                className="  p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
                type="password"
                name="password"
                value={patientInfo.password}
                onChange={handleChange}
              />
            </div>
            <button className="w-full my-5 py-2  bg-purple-200 shadow-lg shadow-purple-500 hover:shadow-purple-500/ text-black  font-semibold rounded-lg">
              Sign In
            </button>
            <div className="flex items-center justify-center">
              <span className="text-sm text-black">
                Don’t have an account?
                <a href="/register" className="text-[#f472b6]">
                  Register
                </a>
              </span>
            </div>
            <Link
              to="/"
              className=" py-4 text-black hover:text-blue-500 text-sm  font-semibold rounded-lg"
            >
              &lt;--Home
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
