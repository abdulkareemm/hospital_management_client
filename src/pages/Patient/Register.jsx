import React, { useState } from "react";
import { isValidEmail } from "../../utils/helper";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import re from "../../assets/images/b.png";

const validateUserInfo = ({
  email,
  password,
  name,
  gender,
  address,
  mobile,
}) => {
  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };
  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };
  if (!gender.trim()) return { ok: false, error: "Gender is missing!" };
  if (!mobile.trim()) return { ok: false, error: "Mobile is missing!" };
  if (!address.trim()) return { ok: false, error: "Address is missing!" };

  return { ok: true };
};

const Register = () => {
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    address: "",
    mobile: "",
  });
  const navigate = useNavigate();
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
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}patient/register`,
        patientInfo
      );
      if (response.data.success) {
        toast.success(response.data.msg, { duration: 2000 });
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg, { duration: 2000 });
    }

    if (!ok) return toast.error(error, { duration: 2000 });
  };
  return (
    <div className="bg-white h-screen">
      {/* wrapper */}
      <div className="flex items-center justify-center mt-12">
        {/* image */}
        <div className="hidden sm:block">
          <img className="w-full h-full object-cover" src={re} alt="" />
        </div>

        <div className="w-[30%] border-[1.2px] border-[#d5d5d5]  rounded-md flex flex-col min-h-[400px]  shadow-lg shadow-purple-500/50 hover:shadow-purple-500/40">
          <h2 className="pt-6 text-xl font-bold text-[#7c2c86] text-center">
            Patient Register
          </h2>
          <form
            className="max-w-[500px] w-full mx-auto  p-8 px-8 rounded-lg"
            onSubmit={submit}
          >
            <div className="flex flex-col text-purple-700 py-0 ">
              <label>Name</label>
              <input
                className="text-sm text-black p-2.5 outline-none  focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
                type="text"
                name="name"
                placeholder="Name..."
                value={patientInfo.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-purple-700 py-0 gap-y-3">
              <label>Email</label>
              <input
                className="text-sm text-black p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
                type="Email"
                placeholder="Email...."
                name="email"
                value={patientInfo.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-purple-700 py-0">
              <label>Password</label>
              <input
                className="text-sm text-black p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
                type="password"
                name="password"
                placeholder="Password....."
                value={patientInfo.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-purple-700 py-0">
              <label>mobile</label>
              <input
                className="text-sm text-black p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
                type="text"
                placeholder="mobile..."
                name="mobile"
                value={patientInfo.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-purple-700 py-0">
              <label>address</label>
              <input
                className="text-sm text-black p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
                type="text"
                placeholder="address..."
                name="address"
                value={patientInfo.address}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-purple-700 py-0">
              <label>gender</label>
              <div className="flex items-center justify-between mt-2 text-sm w-[70%] mx-12">
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </div>
            <button className="w-full my-5 py-2 bg-purple-200 shadow-lg shadow-purple-500 hover:shadow-purple-500/ text-black font-semibold rounded-lg">
              Sign Up
            </button>
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className=" text-black hover:text-blue-500 text-sm  font-semibold rounded-lg"
              >
                &lt;--Home
              </Link>
              <span className="text-sm text-black ">
                Already have an account?
                <a href="/login" className="text-purple-900">
                  Login
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
