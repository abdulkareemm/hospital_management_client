import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
const Update = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [UpdateDoctorInfo, setUpdateDoctorInfo] = useState({
    name: "",
    password: "",
    email: "",
    mobile: "",
    gender: "",
    avatar: "",
    specialist: "",
    clinic: user?._id,
  });
  const changeInput = ({ target }) => {
    const { value, name } = target;
    setUpdateDoctorInfo({ ...UpdateDoctorInfo, [name]: value });
  };
  const [imageUser, setImageUser] = useState();
  const uploadImage = ({ target }) => {
    const { files } = target;
    const imageFile = files[0];
    setUpdateDoctorInfo({ ...UpdateDoctorInfo, avatar: imageFile });
    setImageUser(URL.createObjectURL(files[0]));
  };
  const deleteImage = () => {
    setImageUser("");
    setUpdateDoctorInfo({ ...UpdateDoctorInfo, avatar: "" });
  };

  const mobileHandler = (p) => {
    setUpdateDoctorInfo({ ...UpdateDoctorInfo, mobile: p });
  };
  const submit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      for (let key in UpdateDoctorInfo) {
        if (key) {
          formData.append(key, UpdateDoctorInfo[key]);
        }
      }
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}clinic/add-doctor`,
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
  return (
    <div className="">
      <Layout>
        <h1 className="capitalize text-center mb-10 font-semibold text-3xl">
          Update Doctor Info
        </h1>
        <form className="flex flex-col h-[420px]">
          {/* name && password*/}
          <div className="w-[97%] flex items-center gap-x-10">
            <div className="w-[50%] group">
              <span className="w-[20%] group-hover:text-gray-300 font-semibold">
                Doctor Name :
              </span>
              <input
                type="text"
                name="name"
                placeholder="Name..."
                onChange={changeInput}
                className="w-[72%] p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
                value={UpdateDoctorInfo.name}
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
                value={UpdateDoctorInfo.password}
              />
            </div>
          </div>
          {/* email */}
          <div className="w-[97%] flex items-center gap-x-10 mt-14">
            <div className="w-[50%] ">
              <span className="w-[20%]">Doctor Email : </span>
              <input
                type="text"
                name="email"
                placeholder="Email..."
                onChange={changeInput}
                className="w-[73%] p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
                value={UpdateDoctorInfo.email}
              />
            </div>
            <div className="w-[50%] ">
              <span className="w-[20%]">Doctor Specialist : </span>
              <input
                type="text"
                name="specialist"
                onChange={changeInput}
                placeholder="Specialist..."
                className="w-[67%] p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
                value={UpdateDoctorInfo.specialist}
              />
            </div>
          </div>
          {/* image && other fields */}
          <div className="w-[97%] flex items-center gap-x-10 mt-14">
            <div className="group w-[50%] flex justify-center items-center flex-col border-2 border-dotted border-gray-300 h-[240px] cursor-pointer rounded-lg ">
              {!imageUser ? (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-800" />
                    <p className="text-gray-500 hover:text-gray-800">
                      Click here to upload doctor avatar
                    </p>
                  </div>
                  <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={uploadImage}
                    className="w-0 h-0"
                    value={UpdateDoctorInfo.avatar}
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
            <div className="w-[50%] ">
              <div className="w-full flex flex-row items-center">
                <span className="w-[38%]">Doctor Gender : </span>
              </div>

              <div className="flex items-center justify-between mt-2 text-sm w-[70%] mx-12">
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={changeInput}
                    checked={user?.gender === "Male"}
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={changeInput}
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>

              <div className="w-full flex flex-row items-center mt-8">
                <span className="w-[25%]">Clinic Name : </span>
                <input
                  type="text"
                  value={user.clinic.name}
                  disabled
                  className="w-[72%] p-2.5 outline-none focus:outline-none border-[1.2px] border-[#d5d5d5]  rounded-md"
                  placeholder="<NAME>"
                />
              </div>
              <div className="w-full flex flex-row items-center mt-8">
                <span className="w-[35%]">Doctor Mobile : </span>
                <PhoneInput
                  country={"sy"}
                  className=" p-2.5 rounded-md"
                  onChange={mobileHandler}
                  value={UpdateDoctorInfo.mobile}
                />
              </div>
            </div>
          </div>
          <div className="mt-12">
            <button
              className="w-[50%] p-2.5 bg-green-700/20 hover:bg-green-500  mt-3 rounded-md text-black"
              type="submit"
              onClick={submit}
            >
              Update
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
export default Update;
