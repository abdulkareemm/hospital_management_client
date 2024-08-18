import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const Clinic = ({ name, logo, color_highlight, _id }) => {
  const onHoverHandle = (event) => {
    event.currentTarget.style.backgroundColor = `${color_highlight}`;
  };
  const onLeaveHandler = (event) => {
    event.currentTarget.style.backgroundColor = "#30699b";
  };
  return (
    <div
      className={`relative rounded-md w-[220px] h-[300px] bg-[#30699b] group transition-all duration-500 hover:${color_highlight}`}
      onMouseEnter={onHoverHandle}
      onMouseLeave={onLeaveHandler}
    >
      {/* image and name */}
      <div className="absolute top-[30%] left-[27%] flex flex-col items-center gap-y-2">
        <img
          src={logo.url}
          alt={`${name}/logo`}
          className="w-28 h-28 rounded-full object-cover"
        />
        <h1 className="capitalize  text-xl text-white">{name}</h1>
      </div>
      {/* arrow choice */}
      <Link
        className="absolute bottom-0 left-[43%] -my-5 bg-purple-600 p-2 rounded-full  cursor-pointer
      text-white group-hover:text-purple-700 group-hover:bottom-20 group-hover:bg-white transition-all duration-200"
        to={`patient/make-appointment/${_id}`}
      >
        <BsArrowRight className="text-2xl" />
      </Link>
    </div>
  );
};

export default Clinic;
