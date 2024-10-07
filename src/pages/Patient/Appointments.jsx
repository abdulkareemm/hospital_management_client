import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Button, DatePicker, Modal, TimePicker } from "antd";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Nav } from "../../components";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const validateUserInfo = (reason, date, time) => {
  if (!reason.trim()) return { ok: false, error: "Reason is missing!" };
  if (!time.trim()) return { ok: false, error: "Time is missing!" };
  if (!date.trim()) return { ok: false, error: "Date is missing!" };
  return { ok: true };
};

const Appointment = () => {
  const params = useParams();
  const [clinicInfo, setClinicInfo] = useState({});
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [avialability, setAvialability] = useState(false);
  const [type, setType] = useState(false);
  const navigate = useNavigate();

  function disabledDate(current) {
    return (
      current < Date.now() ||
      !clinicInfo.days.includes(String(new Date(current).getDay()))
    );
  }
  function range(start, end) {
    const result = [];
    for (let i = 0; i < 24; i++) {
      if (i >= Number(start) && i < Number(end)) continue;
      else result.push(i);
    }
    return result;
  }

  function disabledHours() {
    const hours = range(
      moment.utc(clinicInfo.startFrom, "HH:mm").format("H"),
      moment.utc(clinicInfo.endAt, "HH:mm").format("H")
    );
    return hours;
  }
  const checkAvailability = async () => {
    const { ok, error } = validateUserInfo(reason, date, time);
    if (!ok) return toast.error(error, { duration: 2000 });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}patient/check-reservation`,
        {
          clinicId: params.clinicId,
          time,
          date,
          reason,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        if (response.data.type) {
          toast.success(response.data.msg);
          setType(true);
        } else {
          toast.success(response.data.msg);
          setAvialability(true);
        }
      } else {
        console.log(response) 
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.msg, { duration: 2000 });
    }
  };
  const BookNow = async () => {
    const { ok, error } = validateUserInfo(reason, date, time);
    if (!ok) return toast.error(error, { duration: 2000 });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}patient/reservation`,
        {
          clinicId: params.clinicId,
          time,
          date,
          reason: reason,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        setAvialability(false);
        toast.success(response.data.msg);
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Error booking appointment");
    }
  };

  const getInfo = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}clinic/`,
        { clinicId: params.clinicId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        setClinicInfo(response.data.clinic);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <div className="care-container">
      <Nav />
      <div className="flex flex-row  w-full items-start gap-5 bg-white mt-12">
        {/* clinic info*/}
        <div className="flex flex-col gap-4 p-2 border-2 border-purple-500 rounded-md bg-white">
          <div className="p-1 border-2 border-dashed border-purple-500">
            <img src={clinicInfo.logo?.url} alt="" />
          </div>
          <div className="p-1 border-2 border-dashed border-purple-500 text-center bg-white">
            <h1 className="uppercase text-2xl text-teal-600 bg-white">
              {clinicInfo?.name}
            </h1>
          </div>
          <div className="p-2 border-2 border-dashed border-purple-500 text-gray-600 text-center flex flex-col gap-2">
            <h1 className="">Start from : {clinicInfo?.startFrom}</h1>
            <hr className="border-2 border-purple-500" />
            <h1 className="">End At : {clinicInfo?.endAt}</h1>
            <hr className="border-2 border-purple-500" />
            <h1 className="">Visit Duration : {clinicInfo?.visitDuration}</h1>
            <hr className="border-2 border-purple-500" />
            <h1 className="">Fees : {clinicInfo?.fees} $</h1>
          </div>
          <div
            className="p-2 border-2 border-dashed border-purple-500 text-gray-600 
            text-center flex flex-col rounded-md"
          >
            <h1>Days Work </h1>
            <hr className="border-2 border-purple-500" />

            <ul>
              {clinicInfo.days?.map((element) => {
                return <li className="text-sm">{days[element]}</li>;
              })}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-8 p-2 border-2 border-purple-500 rounded-md w-full bg-white">
          {/* Doctor slides */}
          <div className="w-[1000px] flex flex-col gap-2 mx-auto mt-10">
            <h1>Doctor in Clinic :</h1>
            <Swiper
              slidesPerView={3}
              spaceBetween={10}
              className="care-container"
            >
              {clinicInfo.doctors?.map((doctor, id) => {
                return (
                  <SwiperSlide key={id}>
                    <div className="w-[250px] h-[200px] relative rounded-md object-contain">
                      <img
                        src={doctor.avatar?.url}
                        alt=""
                        className="w-full h-full"
                      />
                      <div className="absolute bottom-1 left-1 p-1 bg-purple-500 rounded-md">
                        <h1 className="capitalize">{doctor.name}</h1>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          {/* reason time date */}
          <div className=" flex flex-row gap-2 w-full">
            <div className="w-[50%] flex flex-col gap-2">
              <h1>Reason is : </h1>
              <textarea
                className="w-[90%] h-[100px] p-3 bg-purple-200"
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div>
              <div>
                <h1>Date Appointment : </h1>
                <DatePicker
                  format="YYYY-MM-DD"
                  disabledDate={disabledDate}
                  onChange={(value) => {
                    setType(false);
                    value
                      ? setDate(
                          moment(value.toISOString()).format("DD-MM-YYYY")
                        )
                      : setDate("");
                  }}
                />
              </div>
              <div>
                <h1>Time Appointment : </h1>
                <TimePicker
                  format={"HH:mm"}
                  disabledHours={disabledHours}
                  onChange={(value) => {
                    setType(false);
                    value
                      ? setTime(moment(value.toISOString()).format("HH:mm"))
                      : setTime("");
                  }}
                />
              </div>
            </div>
          </div>
          {/* buttons */}
          {type ? (
            <div>
              <Button
                className="bg-sky-100 w-[50%] mt-2 p-5 flex items-center justify-center"
                onClick={() => BookNow()}
              >
                Book Now
              </Button>
            </div>
          ) : (
            <div>
              <Button
                className="bg-green-500/70 w-[50%] mt-2 p-5 flex items-center justify-center"
                onClick={() => checkAvailability()}
              >
                Check Availability Date
              </Button>
            </div>
          )}
          <Modal
            open={avialability}
            onCancel={() => setAvialability(false)}
            onOk={() => BookNow()}
          >
            <div className="p-2 text-center">
              <img
                src="https://img.freepik.com/premium-vector/bank-building-white-background-bank-financing-money-exchange-financial-services_625536-430.jpg?w=2000"
                alt=""
              />
              <h1 className="text-xl w-[380px]">
                It will discount {clinicInfo.fees} from your account, Are you
                agree?{" "}
              </h1>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
