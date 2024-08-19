import React, { useState } from "react";
import logo from "../../assets/images/clinic.png";
import { isValidEmail } from "../../utils/helper";
import { setUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const validateUserInfo = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };
  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};
const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setLogin({ ...login, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(login);

    if (!ok) return toast.error(error, { duration: 2000 });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}clinic/login`,
        login
      );
      if (response.data.success) {
        toast.success(response.data.msg, { duration: 2000 });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.clinic));
        dispatch(setUser(response.data.clinic));
        setTimeout(() => {
          navigate("/clinic/dashboard");
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
      <div className="flex items-center justify-center mt-28 mb-16">
        <div className="">
          <img
            className="w-[460px] h-[460px] object-cover rounded-l-lg"
            src={logo}
            alt=""
          />
        </div>

        <div className="w-[30%] border-[1.2px] border-[#d5d5d5]  rounded-md flex flex-col min-h-[400px]  shadow-lg shadow-purple-500/50 hover:shadow-purple-500/40">
          <h2 className="p-6 text-xl text-center font-semibold text-[#7c2c86]">
            Login Clinic
          </h2>
          <form className="flex flex-col mt-4 px-6 gap-y-8" onSubmit={submit}>
            <div className="flex flex-col text-purple-700 py-2">
              <label>Email</label>
              <input
                className="p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
                type="email"
                name="email"
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
              Sign in
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
