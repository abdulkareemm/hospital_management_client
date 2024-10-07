import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setUser } from "../../redux/userSlice";
import doctor from "../../assets/images/doctor..jpg";
import { isValidEmail } from "../../utils/helper";

const validateUserInfo = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

const Login = () => {
  const [doctorInfo, setDoctorInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setDoctorInfo({ ...doctorInfo, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(doctorInfo);
    if (!ok) return toast.error(error, { duration: 2000 });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}doctor/login`,
        doctorInfo
      );
      if (response.data.success) {
        toast.success(response.data.msg, { duration: 2000 });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.doctor));
        dispatch(setUser(response.data.doctor));
        setTimeout(() => {
          navigate("/doctor/dashboard");
        }, 2000);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.msg, { duration: 2000 });
    }
  };
  return (
    <div className="bg-white h-screen">
      <div className="flex items-center justify-center mt-28 mb-16">
        <div className="hidden sm:block">
          <img
            className="w-[550px] h-[550px] object-cover rounded-l-lg"
            src={doctor}
            alt=""
          />
        </div>

        <div className="w-[30%] border-[1.2px] border-[#d5d5d5]  rounded-md flex flex-col min-h-[400px]  shadow-lg shadow-purple-500/50 hover:shadow-purple-500/40">
          <h2 className="p-6 text-xl text-center font-semibold text-[#7c2c86]">
            Doctor Login
          </h2>
          <form className="flex flex-col mt-4 px-6 gap-y-8" onSubmit={submit}>
            <div className="flex flex-col text-purple-700 py-2">
              <label>Email</label>
              <input
                className="p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
                name="email"
                type="email"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-purple-700 py-2">
              <label>Password</label>
              <input
                className="p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <button className="w-full mt-5 py-2 bg-purple-200 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/40 text-black   font-semibold rounded-lg">
              Sign In
            </button>
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
