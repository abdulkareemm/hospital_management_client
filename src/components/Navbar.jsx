import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";

const Navbar = () => {
  const [navState, setNavState] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onNavScroll = () => {
    if (window.scrollY > 30) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };
  useEffect(() => {
    if (!user && localStorage.getItem("user")) {
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    }
    window.addEventListener("scroll", onNavScroll);
    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, []);
  return (
    <header
      className={`${
        navState
          ? "fixed top-0 left-0 right-0 h-[14vh] flex items-center justify-center z-50  bg-white"
          : "absolute top-0 left-0 right-0 opacity-100 z-50  bg-white"
      }`}
    >
      <div className="care-container">
        <nav className="flex items-center justify-between">
          {/* image */}
          <div className="">
            <a href="/" target="_top">
              <img
                src={logo}
                alt="logo"
                className={`w-24 h-24 ${navState && "filter brightness-0"}`}
              />
            </a>
          </div>
          {/* Doctors Clinics Patients  Admin */}
          <div className="flex items-center gap-10  ">
            <div className="group relative cursor-pointer py-2">
              <div className="flex items-center justify-between  px-4">
                <h1 className=" text-base font-bold menu-hover my-2 py-2 text-purple-700 lg:mx-4 group-hover:text-purple-400 ">
                  Clinics
                </h1>
                <BsChevronDown className="rotate-0 cursor-pointer transition-all duration-300 w-4 mt-1 group-hover:rotate-180 group-hover:text-[#853288b3]" />
              </div>
              <div className="invisible absolute z-50 flex w-[200px] flex-col bg-gray-100 py-1  text-purple-600 shadow-xl group-hover:visible">
                {user?.role !== "clinic" && (
                  <>
                    <a
                      className="my-1  hover:px-4 group-hover:text-[#853288b3] block  py-1 font-semibold text-purple-600 md:mx-2 transition-al "
                      href="/clinic/login"
                    >
                      Login
                    </a>
                    <hr />
                  </>
                )}
                {user?.role === "clinic" && (
                  <a
                    className="my-1  hover:px-4 group-hover:text-[#853288b3]  block  py-1 font-semibold text-purple-600 md:mx-2 transition-all "
                    href="/clinic/dashboard"
                  >
                    Dashboard
                  </a>
                )}
              </div>
            </div>
            <div className="group relative cursor-pointer py-2">
              <div className="flex items-center justify-between  px-4">
                <h1 className="text-base font-bold menu-hover my-2 py-2 text-purple-600 lg:mx-4 group-hover:text-[#853288b3]">
                  Doctors
                </h1>
                <BsChevronDown className="rotate-0 cursor-pointer transition-all duration-300 w-4 mt-1 group-hover:rotate-180 group-hover:text-[#853288b3]" />
              </div>
              <div className="invisible absolute z-50 flex w-[200px] flex-col bg-gray-100 py-1  text-purple-600 shadow-xl group-hover:visible">
                {user?.role !== "docotr" && (
                  <>
                    <a
                      className="my-1  hover:px-4 hover:text-[#853288b3]  block  py-1 font-semibold text-purple-600  md:mx-2 transition-all "
                      href="/doctor/login"
                    >
                      Login
                    </a>
                    <hr />
                  </>
                )}

                {user?.role === "docotr" && (
                  <Link
                    className="my-1  hover:px-4 hover:text-[#853288b3]  block  py-1 font-semibold text-purple-600 md:mx-2 transition-all  "
                    to={"/doctor/dashboard"}
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            </div>
            <div className="group relative cursor-pointer py-2">
              <div className="flex items-center justify-between  px-4">
                <h1 className="text-base font-bold menu-hover my-2 py-2 text-purple-600 lg:mx-4 group-hover:text-[#853288b3]">
                  Patients
                </h1>
                <BsChevronDown className="rotate-0 cursor-pointer transition-all duration-300 w-4 mt-1 group-hover:rotate-180 group-hover:text-[#853288b3]" />
              </div>
              <div className="invisible absolute z-50 flex w-[240px] flex-col bg-gray-100 py-1  text-purple-600 shadow-xl group-hover:visible">
                {user?.role !== "patient" && (
                  <>
                    <a
                      className="my-1  hover:px-4 hover:text-[#853288b3]  block  py-1 font-semibold text-purple-600 md:mx-2 transition-all "
                      href="/login"
                    >
                      Login
                    </a>
                    <hr />
                    <a
                      className="my-1  hover:px-4 hover:text-[#853288b3]  block  py-1 font-semibold text-purple-600 md:mx-2 transition-all "
                      href="/register"
                    >
                      Register
                    </a>
                    <hr />
                  </>
                )}

                {user?.role === "patient" && (
                  <a className="my-1  hover:px-4 hover:text-[#853288b3]  block  py-1 font-semibold text-purple-600 md:mx-2 transition-all">
                    Make appointment
                  </a>
                )}
              </div>
            </div>
            <div className="group relative cursor-pointer py-2">
              <div className="flex items-center justify-between  px-4">
                <h1 className="text-base font-bold menu-hover my-2 py-2 text-purple-600 lg:mx-4 group-hover:text-[#853288b3]">
                  Admins
                </h1>
                <BsChevronDown className="rotate-0 cursor-pointer transition-all duration-300 w-4 mt-1 group-hover:rotate-180 group-hover:text-[#853288b3]" />
              </div>
              <div className="invisible absolute z-50 flex w-[200px] flex-col bg-gray-100 py-1  text-purple-600 shadow-xl group-hover:visible">
                {user?.role !== "admin" && (
                  <>
                    <a
                      className="my-1  hover:px-4 hover:text-[#853288b3]  block  py-1 font-semibold text-purple-600 md:mx-2 transition-all  "
                      href="/admin/login"
                    >
                      Login
                    </a>
                    <hr />
                  </>
                )}
                {user?.role === "admin" && (
                  <a
                    className="my-1  hover:px-4 hover:text-[#853288b3]  block  py-1 font-semibold text-purple-600  md:mx-2 transition-all "
                    href="/admin/dashboard"
                  >
                    Dashboard
                  </a>
                )}
              </div>
            </div>
          </div>
          {/* Login Register*/}
          {user ? (
            <button
              className="mr-8 bg-[#9718ec] p-2 w-[100px] text-white rounded-md"
              onClick={() => {
                navigate("/");
                localStorage.clear();
                dispatch(setUser(null));
              }}
            >
              Logout
            </button>
          ) : (
            <div className="mr-8">
              <a href="/login">
                <div className="font-semibold text-sm text-white bg-[#9718ec] px-4 py-2 rounded-xl">
                  LOGIN / SIGN UP
                </div>
              </a>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
