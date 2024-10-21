import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { ColorPicker, TimePicker } from "antd";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const initData = {
  name: "",
  password: "",
  mobile: "",
  email: "",
  type: "",
  startFrom: "",
  endAt: "",
  fees: "",
  logo: "",
  color_highlight: "",
  visitDuration: "",
};

const UpdateInfo = () => {
  const { user } = useSelector((state) => state.user);
  const [updateClinicInfo, setUpdateClinicInfo] = useState(initData);
  const [imageUser, setImageUser] = useState(null);
  const [changeImage, setChangeImage] = useState(null);
  const navigate = useNavigate();
  const selectColor = (color) => {
    setUpdateClinicInfo({
      ...updateClinicInfo,
      color_highlight: "#" + color.toHex(),
    });
  };
  const changeInput = ({ target }) => {
    const { value, name } = target;
    setUpdateClinicInfo({ ...updateClinicInfo, [name]: value });
  };
  const uploadImage = ({ target }) => {
    const { files } = target;
    const imageFile = files[0];
    setUpdateClinicInfo({ ...updateClinicInfo, logo: imageFile });
    setImageUser(URL.createObjectURL(files[0]));
  };
  const deleteImage = () => {
    setImageUser("");
    setChangeImage(true);
    setUpdateClinicInfo({ ...updateClinicInfo, logo: "" });
  };
  const timeWorks = (time, timeString) => {
    setUpdateClinicInfo({
      ...updateClinicInfo,
      endAt: timeString[1],
      startFrom: timeString[0],
    });
  };
  const durationTime = (time, timeString) => {
    setUpdateClinicInfo({ ...updateClinicInfo, visitDuration: timeString });
  };
  const mobileHandler = (p) => {
    setUpdateClinicInfo({ ...updateClinicInfo, mobile: p });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      if (changeImage) {
        for (let key in updateClinicInfo) {
          if (key) {
            if (key !== "doctors" && key !== "appointments" && key !== "days")
              formData.append(key, updateClinicInfo[key]);
          }
        }
      } else {
        for (let key in updateClinicInfo) {
          if (key) {
            if (
              key !== "doctors" &&
              key !== "logo" &&
              key !== "appointments" &&
              key !== "days"
            )
              formData.append(key, updateClinicInfo[key]);
          }
        }
      }

      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}clinic/update-info`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.msg, { duration: 2000 });
        navigate("/clinic/dashboard");
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg, { duration: 2000 });
    }
  };
  useEffect(() => {
    setUpdateClinicInfo({ ...user });
    setImageUser(user.logo.url);
  }, []);
  return (
    <div className="">
      <Layout>
        <h1 className="capitalize text-center mb-10 font-semibold text-3xl">
          Update Clinic Info
        </h1>
        <form className="flex flex-col overflow-y-scroll h-[calc(100%-80px)]">
          {/* name && password*/}
          <div className="w-[97%] flex items-center gap-x-10">
            <div className="w-[50%] group">
              <span className="w-[20%] text-xl font-semibold">
                Clinic Name :{" "}
              </span>
              <input
                type="text"
                name="name"
                placeholder="Name..."
                onChange={changeInput}
                className="w-full p-2.5 outline-none focus:outline-none border-[1.2px] border-[#c641d4]   rounded-md"
                value={updateClinicInfo.name}
              />
            </div>
          </div>
          {/* email && type*/}
          <div className="w-[97%] flex items-center gap-x-10 mt-10">
            <div className="w-[50%] ">
              <span className="w-[20%]">Clinic Email : </span>
              <input
                type="text"
                name="email"
                placeholder="Email..."
                onChange={changeInput}
                className="w-[76%] p-2.5 outline-none focus:outline-none border-[1.2px] border-[#c641d4]  rounded-md"
                value={updateClinicInfo.email}
              />
            </div>
            <div className="w-[50%] ">
              <span className="w-[20%]">Clinic Type : </span>
              <input
                type="text"
                name="type"
                onChange={changeInput}
                placeholder="Type..."
                className="w-[77%] p-2.5 outline-none focus:outline-none border-[1.2px] border-[#c641d4]   rounded-md"
                value={updateClinicInfo.type}
              />
            </div>
          </div>
          {/* mobile && fees*/}
          <div className="w-[97%] flex items-center gap-x-10 mt-10">
            <div className="w-[50%] relative">
              <span>Clinic Fee : </span>
              <input
                type="number"
                name="fees"
                onChange={changeInput}
                placeholder="Clinic fees..."
                min={1}
                className="w-[80%] p-2.5 px-[2.5rem] outline-none focus:outline-none border-[1.2px] border-[#c641d4]  rounded-md"
                value={updateClinicInfo.fees}
              />
              <div className="absolute top-2 text-2xl left-24 text-gray-400">
                $
              </div>
            </div>
            <div className="w-[50%] flex flex-row items-center">
              <span className="w-[33%]">Clinic Mobile : </span>
              <PhoneInput
                country={"sy"}
                className=" p-2.5 rounded-md"
                onChange={mobileHandler}
                value={updateClinicInfo.mobile}
              />
            </div>
          </div>
          {/* color picker and image upload */}
          <div className="w-[97%] flex items-center gap-x-10 mt-10">
            <div className="w-[50%] overflow-x-auto flex flex-col gap-y-2">
              <span className="">Color Highlight : </span>
              <ColorPicker
                value={updateClinicInfo.color_highlight}
                onChange={selectColor}
              />
            </div>
            <div className="group w-[50%] flex justify-center items-center flex-col border-2 border-dotted border-[#c641d4]   h-[385px] cursor-pointer rounded-lg">
              {!imageUser ? (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-800" />
                    <p className="text-gray-500 hover:text-gray-800">
                      Click here to upload clinic logo
                    </p>
                  </div>
                  <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={uploadImage}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <div className="relative h-full">
                  <img
                    src={imageUser}
                    alt="upload image"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                    onClick={deleteImage}
                  >
                    <MdDelete className="text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* time date and days work*/}
          <div className="w-[97%] flex items-center gap-x-10 mt-10  border-[1.2px] border-[#c641d4]  rounded-md">
            <div className="w-[50%] p-4 flex flex-col gap-y-2">
              <div className="flex items-center gap-x-7">
                <span>Time Works : </span>
                <TimePicker.RangePicker
                  format={"HH:mm"}
                  onChange={timeWorks}
                  value={[
                    dayjs(updateClinicInfo.startFrom, "HH:mm"),
                    dayjs(updateClinicInfo.endAt, "HH:mm"),
                  ]}
                />
              </div>
              <div className="flex items-center gap-x-4">
                <span>Visit Duration : </span>
                <TimePicker
                  format={"mm"}
                  onChange={durationTime}
                  value={dayjs(updateClinicInfo.visitDuration, "mm")}
                />
              </div>
            </div>
          </div>
          <div className="w-[97%]  mt-10 sticky bottom-0">
            <button
              className="w-[50%] p-2.5 bg-gray-500 hover:bg-green-500  mt-3 rounded-md text-black"
              type="submit"
              onClick={submit}
            >
              Update
            </button>
            <button className="w-[50%] p-2.5 mt-3 bg-gray-500 hover:bg-gray-700  rounded-md text-black">
              Cancel
            </button>
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default UpdateInfo;
