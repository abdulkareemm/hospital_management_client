import React, { useState } from "react";
import { Layout } from "../../components";
import { ColorPicker, useColor } from "react-color-palette";
import PhoneInput from "react-phone-input-2";
import { TimePicker, Select, Space } from "antd";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import "react-phone-input-2/lib/style.css";
import "react-color-palette/lib/css/styles.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { isValidEmail } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
const days = [
  { value: 1, label: "Mondy" },
  { value: 2, label: "Tusday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday " },
  { value: 0, label: "Sunday" },
];
const validateClinicInfo = ({
  name,
  mobile,
  type,
  logo,
  startFrom,
  endAt,
  fees,
  color_highlight,
  days,
  visitDuration,
  email,
  password,
}) => {
  if (logo === "") return { ok: false, error: "Logo is missing!" };
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };
  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };
  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!mobile.trim()) return { ok: false, error: "Mobile is missing!" };
  if (!startFrom.trim()) return { ok: false, error: "Start from is missing!" };
  if (!endAt.trim()) return { ok: false, error: "End At is missing!" };
  if (!fees.trim()) return { ok: false, error: "Fees is missing!" };
  if (!color_highlight.trim())
    return { ok: false, error: "Color highlight is missing!" };
  if (days.length === 0)
    return { ok: false, error: "Days must have at least one day!" };

  if (!visitDuration.trim())
    return { ok: false, error: "visit Duration is missing!" };
  return { ok: true };
};
const AddClinic = () => {
  const [color, setColor] = useColor("hex", "#121212");
  const navigate = useNavigate();
  const [clinicInfo, setClinicInfo] = useState({
    name: "",
    password: "",
    mobile: "",
    email: "",
    type: "",
    logo: "",
    startFrom: "",
    endAt: "",
    fees: "",
    color_highlight: "",
    days: [],
    visitDuration: "",
  });
  const changeInput = ({ target }) => {
    const { value, name } = target;
    setClinicInfo({ ...clinicInfo, [name]: value });
  };
  const [imageUser, setImageUser] = useState();
  const { Option } = Select;
  const handleChange = (value) => {
    setClinicInfo({ ...clinicInfo, days: value });
  };
  const uploadImage = ({ target }) => {
    const { files } = target;
    const imageFile = files[0];
    setClinicInfo({ ...clinicInfo, logo: imageFile });
    setImageUser(URL.createObjectURL(files[0]));
  };
  const deleteImage = () => {
    setImageUser("");
    setClinicInfo({ ...clinicInfo, logo: "" });
  };
  const timeWorks = (time, timeString) => {
    setClinicInfo({
      ...clinicInfo,
      endAt: timeString[1],
      startFrom: timeString[0],
    });
  };
  const durationTime = (time, timeString) => {
    setClinicInfo({ ...clinicInfo, visitDuration: timeString });
  };
  const mobileHandler = (p) => {
    setClinicInfo({ ...clinicInfo, mobile: p });
  };
  const colorHandler = (r) => {
    setColor(r);
    setClinicInfo({ ...clinicInfo, color_highlight: r.hex });
  };
  const submit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateClinicInfo(clinicInfo);

    if (!ok) return toast.error(error, { duration: 2000 });
    try {
      const formData = new FormData();

      for (let key in clinicInfo) {
        if (key) {
          formData.append(key, clinicInfo[key]);
        }
      }
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}hospital/add-clinic`,
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
        navigate("/admin/dashboard");
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg, { duration: 2000 });
    }
  };
  return (
    <div className="">
      <Layout>
        <h1 className="capitalize text-center mb-10 font-semibold text-3xl">
          add clinic to hospital
        </h1>
        <form className="flex flex-col overflow-y-scroll h-[calc(100%-80px)]">
          {/* name && password*/}
          <div className="w-[97%] flex items-center gap-x-10">
            <div className="w-[50%] group">
              <span className="w-[20%] group-hover:text-gray-300 font-semibold">
                Clinic Name :{" "}
              </span>
              <input
                type="text"
                name="name"
                placeholder="Name..."
                onChange={changeInput}
                className="w-[76%] p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
              />
            </div>
            <div className="w-[50%] ">
              <span className="w-[20%]">Password : </span>
              <input
                type="password"
                name="password"
                placeholder="Password..."
                onChange={changeInput}
                className="w-[80%] p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
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
                className="w-[76%] p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
              />
            </div>
            <div className="w-[50%] ">
              <span className="w-[20%]">Clinic Type : </span>
              <input
                type="text"
                name="type"
                onChange={changeInput}
                placeholder="Type..."
                className="w-[77%] p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
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
                className="w-[80%] p-2.5 px-[2.5rem] outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
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
              />
            </div>
          </div>
          {/* color picker and image upload */}
          <div className="w-[97%] flex items-center gap-x-10 mt-10">
            <div className="w-[50%] overflow-x-auto flex flex-col gap-y-2">
              <span className="">Color Highlight : </span>
              <ColorPicker
                width={456}
                height={228}
                color={color}
                onChange={colorHandler}
                hideHSV
                dark
              />
            </div>
            <div className="group w-[50%] flex justify-center items-center flex-col border-2 border-dotted border-gray-300  h-[385px] cursor-pointer rounded-lg ">
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
          <div className="w-[97%] flex items-center gap-x-10 mt-10  border-[1.2px] border-[#d5d5d5]  rounded-md">
            <div className="w-[50%] p-4 flex flex-col gap-y-2">
              <div className="flex items-center gap-x-7">
                <span>Time Works : </span>
                <TimePicker.RangePicker format={"HH:mm"} onChange={timeWorks} />
              </div>
              <div className="flex items-center gap-x-4">
                <span>Visit Duration : </span>
                <TimePicker format={"mm"} onChange={durationTime} />
              </div>
            </div>
            <div className="w-[50%] p-4">
              <span>Days Works :</span>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="select work days"
                onChange={handleChange}
                optionLabelProp="label"
              >
                {days.map((day, id) => {
                  const { value, label } = day;
                  return (
                    <Option value={value} label={label} key={id}>
                      <Space>{label}</Space>
                    </Option>
                  );
                })}
              </Select>
            </div>
          </div>
          <div className="w-[97%]  mt-10 sticky bottom-0 bg-white">
            <button
              className="w-[50%] p-2.5 bg-green-700/20 hover:bg-green-500  mt-3 rounded-md text-black"
              type="submit"
              onClick={submit}
            >
              Create
            </button>
            <button className="w-[50%] p-2.5 mt-3 bg-green-700/20 hover:bg-red-500  rounded-md text-white">
              Cancel
            </button>
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default AddClinic;
