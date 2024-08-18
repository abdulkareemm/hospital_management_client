import React, { useEffect, useRef, useState } from "react";
import homeImg from "../assets/images/bghome.jpg";
import card from "../assets/images/card1.jpg";
import card2 from "../assets/images/card2.jpg";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { clinics, features } from "../data/data";
import { Clinic, Feature, Nav } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
const Home = () => {
  const { user } = useSelector((state) => state.user);
  const [hospital, setHospital] = useState({});
  const clinicRef = useRef(null);
  const [clinic, setClinics] = useState([]);
  const getInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}hospital/info`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setHospital(response.data.hospital);
        setClinics(response.data.clinics);
      } else {
        toast.error(response);
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data.msg);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <>
      <Nav/>
      <div className="flex flex-col mt-28 h-auto bg-white">
        {/* section 1 */}
        <div className="flex h-screen care-container">
          <div className="flex flex-col space-y-10 mt-28 w-[50%] gap-8">
            <h1 className="text-purple-500 text-3xl font-bold ">
              We Are Here For Your Care
            </h1>
            <div className="text-gray-400 text-4xl px-14">
              Best Care{" "}
              <div className="text-purple-500 ml-16 mt-5">
                &<br />
              </div>{" "}
              <div className="mt-5 text-gray-400">Best Clinic</div>
            </div>
            <div
              className="text-xl w-[90%] p-5 rounded-full bg-slate-300 text-purple-500 uppercase  text-center cursor-pointer active:scale-90 transition-all duration-300 hover:bg-purple-300"
              onClick={() => clinicRef.current.scrollIntoView()}
            >
              Make an appointment
            </div>
          </div>
          <div className="w-[100%] ">
            <img
              src={homeImg}
              alt=""
              className="h-[90%] object-cover w-[100%] "
            />
          </div>
        </div>
        {/* section 2 */}
        <div className="flex flex-col items-center gap-5 mt-28">
          <h1 className="text-purple-600 text-4xl mt-6">
            What are you looking for?
          </h1>
          {/* cards */}
          <div className="flex flex-row justify-evenly w-[70%] mt-16">
            {/* card 1*/}
            <div className="group relative overflow-hidden rounded-md">
              <img
                src={card}
                alt="card1"
                className="w-[450px] h-full group-hover:scale-125 overflow-hidden transition duration-500 cursor-pointer object-cover"
              />
              <div className="absolute z-10 top-[40%] left-[42%] ">
                <h1 className="text-2xl font-bold text-slate-700">
                  Visit a Clinic
                </h1>
                <button
                  className="mt-4 bg-purple-200 text-black py-2 rounded-md px-4 active:scale-90 z-50"
                  onClick={() => clinicRef.current.scrollIntoView()}
                >
                  Book Now
                </button>
              </div>
            </div>
            {/* card 2*/}
            <div className="group relative overflow-hidden rounded-md">
              <img
                src={card2}
                alt="card2"
                className="w-[450px] h-full group-hover:scale-125 overflow-hidden transition duration-500 cursor-pointer object-cover"
              />
              <div className="absolute z-10 top-[40%] left-[36%] text-center">
                <h1 className="text-2xl font-bold text-slate-700">
                  Find a Pharmacy
                </h1>
                <button className="mt-4 bg-purple-200 text-black py-2 rounded-md px-4 active:scale-90 z-50">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* section 3 clinics */}
        <div className="flex flex-col mt-28 bg-white " ref={clinicRef}>
          {/* title & prev next */}
          <div className="flex flex-row  py-4 care-container">
            {/* title */}
            <div className="w-[50%]">
              <h1 className="text-purple-600 text-3xl font-bold">
                Clinic & Specialities
              </h1>
              <div className="w-[60%] py-3">
                Access to clinics and book them here.
              </div>
            </div>
            {/* prev next */}
          </div>
          {/* Swiper Clinics */}
          <div
            className="w-[1400px] flex mx-auto mt-10 bg-purple-100 rounded-md"
            ref={clinicRef}
          >
            <Swiper
              slidesPerView={5}
              spaceBetween={10}
              className="care-container"
            >
              <SliderButtons />

              {clinic?.map((clinic, id) => {
                return (
                  <SwiperSlide key={id}>
                    <Clinic {...clinic} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        {/* section 4 features */}
        <div className="flex flex-col mt-28 bg-white  ">
          {/* title */}
          <div className="flex flex-row  py-4 care-container ">
            {/* title */}
            <div className="w-[50%]">
              <h1 className="text-purple-600 text-3xl font-bold ">
                Availabe Features in Our Clinic
              </h1>
              <div className="w-[60%] py-3">Meet our Experts & Book Online</div>
            </div>
          </div>
          {/* Swiper Features */}
          <div className="w-[1400px] flex mx-auto mt-10 relative ">
            <Swiper
              slidesPerView={4}
              spaceBetween={60}
              className="care-container"
            >
              <SliderButtons />

              {features.map((feature, id) => {
                return (
                  <SwiperSlide key={id}>
                    <Feature {...feature} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flex items-center justify-center  gap-9 mt-10 text-4xl ">
      <button
        className="bg-purple-400 w-[44px] h-[44px] rounded-full hover:bg-white active:text-white shadow-[0_4px_14px_rgba(141,141,141,0.25)]"
        onClick={() => swiper.slidePrev()}
      >
        &lt;
      </button>
      <button
        className="bg-purple-400 w-[44px] h-[44px] rounded-full hover:bg-white active:text-white shadow-[0_10px_14px_rgba(141,141,141,0.25)]"
        onClick={() => swiper.slideNext()}
      >
        &gt;
      </button>
    </div>
  );
};
