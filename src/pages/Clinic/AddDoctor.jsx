import React, { useState } from "react";
import { isValidEmail } from "../../utils/helper";
import { Layout } from "../../components";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validateDoctorInfo = ({
  name,
  mobile,
  gender,
  avatar,
  email,
  password,
  specialist,
}) => {
  if (avatar === "") return { ok: false, error: "Avatar is missing!" };
  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };
  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };
  if (!specialist.trim()) return { ok: false, error: "Specialist is missing!" };
  if (!mobile.trim()) return { ok: false, error: "Mobile is missing!" };
  if (!gender.trim()) return { ok: false, error: "Gender is missing!" };
  return { ok: true };
};

const AddDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState({
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
    setDoctorInfo({ ...doctorInfo, [name]: value });
  };
  const [imageUser, setImageUser] = useState();
  const uploadImage = ({ target }) => {
    const { files } = target;
    const imageFile = files[0];
    setDoctorInfo({ ...doctorInfo, avatar: imageFile });
    setImageUser(URL.createObjectURL(files[0]));
  };
  const deleteImage = () => {
    setImageUser("");
    setDoctorInfo({ ...doctorInfo, avatar: "" });
  };

  const mobileHandler = (p) => {
    setDoctorInfo({ ...doctorInfo, mobile: p });
  };
  const submit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateDoctorInfo(doctorInfo);
    if (!ok) return toast.error(error, { duration: 2000 });
    try {
      const formData = new FormData();

      for (let key in doctorInfo) {
        if (key) {
          formData.append(key, doctorInfo[key]);
        }
      }
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
        <h1 className="capitalize text-center mb-10 font-semibold text-3xl ">
          Add Doctor To {user.name}
        </h1>
        <form className="flex flex-col h-[420px]">
          {/* name && password*/}
          <div className="w-[97%] flex items-center gap-x-10">
            <div className="w-[50%] group flex flex-col gap-2">
              <div>
                <span className="w-[20%] text-xl font-semibold">
                  Doctor Name:
                </span>
              </div>
              <input
                type="text"
                name="name"
                placeholder="Name..."
                onChange={changeInput}
                className="w-full p-2.5 outline-none focus:outline-none border-[1.2px] border-fuchsia-600  rounded-md"
              />
            </div>
            <div className="w-[50%]   flex flex-col gap-2">
              <div>
                <span className="w-[20%] text-xl font-semibold">
                  Password :{" "}
                </span>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password..."
                onChange={changeInput}
                className="w-full p-2.5 outline-none focus:outline-none border-[1.2px] border-fuchsia-600  rounded-md"
              />
            </div>
          </div>
          {/* email */}
          <div className="w-[97%] flex items-center gap-x-10 mt-10">
            <div className="w-[50%]  flex flex-col gap-2">
              <div>
                <span className="w-[20%] text-xl font-semibold">
                  Doctor Email :{" "}
                </span>
              </div>{" "}
              <input
                type="text"
                name="email"
                placeholder="Email..."
                onChange={changeInput}
                className="w-full p-2.5 outline-none focus:outline-none border-[1.2px] border-fuchsia-600 rounded-md"
              />
            </div>
            <div className="w-[50%]  flex flex-col gap-2 ">
              <div>
                <span className="w-[20%] text-xl font-semibold">
                  Doctor Specialist :{" "}
                </span>
              </div>{" "}
              <input
                type="text"
                name="specialist"
                onChange={changeInput}
                placeholder="Specialist..."
                className="w-full p-2.5 outline-none focus:outline-none border-[1.2px] border-fuchsia-600  rounded-md"
              />
            </div>
          </div>
          {/* image && other fields */}
          <div className="w-[97%] flex items-center gap-x-10 mt-10">
            <div className="group w-[50%] flex justify-center items-center flex-col border-2 border-dotted border-black h-[240px] cursor-pointer rounded-lg">
              {!imageUser ? (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <MdCloudUpload className="text-pink-500 text-3xl hover:text-gray-800" />
                    <p className="text-black hover:text-gray-800">
                      Click here to upload doctor avatar
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
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-pink-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                    onClick={deleteImage}
                  >
                    <MdDelete className="text-white" />
                  </button>
                </div>
              )}
            </div>
            <div className="w-[50%] group-hover:text-black font-semibold ">
              <div className="w-full flex flex-row items-center">
                <span className="w-[38%] text-xl font-semibold">
                  Doctor Gender :{" "}
                </span>
                <div className="flex items-center justify-between mt-2 text-sm w-[70%] mx-12">
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      onChange={changeInput}
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div className="flex items-center gap-1 group-hover:text-black font-semibold">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      onChange={changeInput}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row items-center mt-5">
                <span className="w-[25%] text-xl font-semibold">
                  Clinic Name :{" "}
                </span>
                <input
                  type="text"
                  value={user.name}
                  disabled
                  className="w-[72%] p-2.5 outline-none focus:outline-none border-[1.2px] border-purple-600  rounded-md bg-white"
                />
              </div>
              <div className="w-full flex flex-row items-center mt-5">
                <span className="w-[40%] text-xl font-semibold">
                  Doctor Mobile :{" "}
                </span>
                <PhoneInput
                  country={"sy"}
                  className=" p-2.5 rounded-md"
                  onChange={mobileHandler}
                />
              </div>
              <div>
                <button
                  className="w-[50%] p-2.5 bg-gray-400 hover:bg-fuchsia-500 mt-3 rounded-md text-black"
                  type="submit"
                  onClick={submit}
                >
                  Create
                </button>
                <button className="w-[50%] p-2.5 mt-3 bg-gray-400 hover:bg-fuchsia-500  rounded-md text-black" onClick={()=>{
                  navigate("/clinic/dashboard")}
                }>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default AddDoctor;
