import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { BsBuildingFillAdd, BsPersonFillAdd } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { setUser } from "../redux/userSlice";

const Layout = (props) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const adminMenu = [
    { name: "Home", path: "/admin/dashboard", icon: <AiTwotoneHome /> },
    {
      name: "Add-Clinic",
      path: "/admin/add-clinic",
      icon: <BsBuildingFillAdd />,
    },
  ];
  const doctorMenu = [
    { name: "Home", path: "/doctor/dashboard", icon: <AiTwotoneHome /> },
    {
      name: "Edit Details",
      path: "/doctor/update-info",
      icon: <AiFillEdit />,
    },
  ];
  const clinicMenu = [
    { name: "Home", path: "/clinic/dashboard", icon: <AiTwotoneHome /> },
    {
      name: "Add Doctor",
      path: "/clinic/add-doctor",
      icon: <BsPersonFillAdd />,
    },
    {
      name: "Edit Details",
      path: "/clinic/update-info",
      icon: <AiFillEdit />,
    },
    {
      name: "Appointments",
      path: "/clinic/today-appointments",
      icon: <HiOutlineBanknotes />,
    },
  ];
  const changeColorOfDiv = () => {
    if (user?.role === "clinic") {
      const div = document.getElementById("sidebar");
      const div2 = document.getElementById("content");
      div.style.backgroundColor = user?.color_highlight;
      div2.style.backgroundColor = user?.color_highlight;
    } else {
      const div = document.getElementById("sidebar");
      const div2 = document.getElementById("content");
      div.style.backgroundColor = "white";
      div2.style.backgroundColor = "white";
    }
  };
  const menuToBeRender =
    user?.role === "admin"
      ? adminMenu
      : user?.role === "doctor"
      ? doctorMenu
      : clinicMenu;

  useEffect(() => {
    changeColorOfDiv();
  }, [user]);
  return (
    <div className="flex flex-row mt-[20px] h-[calc(100vh-40px)] px-4">
      {/* sidebar */}
      <div
        id="sidebar"
        className="flex flex-col items-center mr-[20px] p-2 
      rounded-[5px] min-w-[200px] max-w-[210px]
       bg-white shadow-[0_10px_14px_rgba(141,141,141,0.25)] "
      >
        {/* role & logo */}
        <div className="flex flex-col items-center gap-y-4 text-2xl py-2.5 font-semibold">
          <h1 className="capitalize">{user?.role}</h1>
          {(user?.role === "clinic" || user?.role === "doctor") && (
            <img
              className="h-[7rem] object-cover"
              src={user?.role === "clinic" ? user?.logo.url : user?.avatar.url}
              alt=""
            />
          )}
        </div>
        <div className={`${user?.role === "admin" ? "mt-[6rem]" : "mt-6"}    `}>
          {menuToBeRender.map((menu, id) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                key={id}
                className={`flex items-center justify-start gap-3 mt-[25px] ${
                  isActive ? "bg-[#e0f0fd] text-gray-400 rounded-[4px] p-2" : ""
                }`}
              >
                <Link
                  to={menu.path}
                  className="text-[20px] flex flex-row items-center gap-x-2"
                >
                  {menu.icon}
                  <h1>{menu.name}</h1>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-10">
          <div className="flex flex-col gap-5 items-center justify-center">
            <button
              className=" bg-blue-700 p-2 w-[130px] text-white rounded-md"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </button>
            <button
              className=" bg-[#9718ec] p-2 w-[130px] text-white rounded-md"
              onClick={() => {
                navigate("/");
                localStorage.clear();
                dispatch(setUser(null));
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {/* body */}
      <div
        id="content"
        className="bg-white rounded-[5px]  shadow-[0_10px_14px_rgba(141,141,141,0.25)] w-full max-w-[1200px] h-[75h] p-5 "
      >
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
