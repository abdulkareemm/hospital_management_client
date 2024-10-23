import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import Imgsocial from "../assets/img/social.png";
const Footer = () => {
    
  const [hospital, setHospital] = useState();
  console.log(hospital)
  const getInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}hospital/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        setHospital(response.data.Hos[0]);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <footer className="flex flex-row gap-4 bg-slate-200 mt-2">
      {/*Logo*/}
      <div className="w-[30%] flex flex-row items-center  gap-3 p-2">
        <img src={hospital?.logo.url} alt="" className="h-16 rounded-full" />
        <span className="text-xl font-semibold">
          Welcome to {hospital?.name} Hospital
        </span>
      </div>
      {/*Privacy*/}
      <div className="w-[30%] flex flex-col items-center">
        <span className="text-xl font-semibold">Privacy & Policy</span>
        <span>{hospital?.privacy_policy}</span>
      </div>
      {/*connection*/}
      <div className="flex flex-col items-center">
        <span className="text-xl font-semibold">Connection Information </span>
        <ul className="flex flex-row gap-4">
          <li>
            <span className="font-semibold">Phone 1:</span> {hospital?.phone1}
          </li>
          <li>
            <span className="font-semibold">Phone 2:</span> {hospital?.phone2}
          </li>
          <li>
            <span className="font-semibold">Mobile :</span>
            {hospital?.phone3}
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
