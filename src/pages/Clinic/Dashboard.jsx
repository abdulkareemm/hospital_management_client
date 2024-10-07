import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FaUsersGear } from "react-icons/fa6";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { Table } from "antd";
import { setUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doctorsColumns = [
    {
      key: "11",
      title: "Name",
      dataIndex: "name",
      fixed: "left",
      width: "100px",
    },
    {
      key: "22",
      title: "Avatar",
      dataIndex: "avatar",
      width: "100px",
      render: (id, record) => {
        return <img src={record.avatar.url} alt="" className="w-12 h-8" />;
      },
    },
    {
      key: "33",
      title: "Email",
      dataIndex: "email",
      width: "250px",
    },
    {
      key: "44",
      title: "Gender",
      dataIndex: "gender",
      width: "100px",
    },
    {
      key: "55",
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      key: "a",
      title: "Actions",
      dataIndex: "actions",
      fixed: "right",
      width: "200px",
      render: (id, record) => {
        return (
          <button
            className="bg-red-600 py-1 px-3 text-black rounded-md hover:bg-rose-200 hover:scale-x-110"
            onClick={() => deleteDoctor(record._id)}
          >
            Delete
          </button>
        );
      },
    },
  ];
  const deleteDoctor = async (doctorId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}clinic/delete-doctor`,
        { doctorId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.msg, { duration: 2000 });
        getInfo();
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg, { duration: 2000 });
    }
  };

  const getInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}clinic/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        setAppointments(response.data.appointments);
        setDoctors(response.data.doctors);
        dispatch(setUser(response.data.clinic));
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
        console.log(err)
      if (err.response?.data.msg) {
        toast.error(err.response.data.msg + ",Please login ");
      }
      navigate("/");
    }
  };
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="">
      <Layout>
        <div className='className="flex flex-col gap-y-4 bg-gray-100'>
          {/* count of users in system */}
          <div className="flex flex-row p-2.5 justify-between bg-white ">
            {/* doctors count */}
            <div className=" flex flex-col w-[48%] rounded-md border-[1.2px] border-fuchsia-500 p-4 gap-y-2 bg-purple-200">
              <div className="flex flex-row items-center justify-between">
                <div className="border-2 border-fuchsia-500 p-4 rounded-full bg-purple-200">
                  <FaUsersGear className="text-[#8932a4] text-3xl" />
                </div>
                <h1 className="text-3xl">{doctors.length + 40}</h1>
              </div>
              <h1 className="text-black">Doctors</h1>
              <div className="flex flex-row">
                <div className="w-[50%] h-[8px] bg-pink-500 rounded-l-full"></div>
                <div className="w-[50%] h-[8px] bg-[#e9ecef] rounded-r-full"></div>
              </div>
            </div>

            {/* appointments count */}
            <div className=" flex flex-col w-[48%] rounded-md border-[1.2px] border-fuchsia-500  p-4 gap-y-2 bg-purple-200">
              <div className="flex flex-row items-center justify-between">
                <div className="border-2 border-fuchsia-500 p-4 rounded-full bg-purple-200">
                  <HiOutlineBanknotes className="text-[#8932a4]  text-3xl" />
                </div>
                <h1 className="text-3xl">{appointments.length + 129}</h1>
              </div>
              <h1 className="text-black">Appointments</h1>
              <div className="flex flex-row">
                <div className="w-[50%] h-[8px] bg-indigo-400 rounded-l-full"></div>
                <div className="w-[50%] h-[8px] bg-[#e9ecef] rounded-r-full"></div>
              </div>
            </div>
          </div>
          {/* list of users in system */}
          <div>
            {doctors?.length > 0 ? (
              <Table
                columns={doctorsColumns}
                dataSource={doctors}
                scroll={{ y: 200 }}
                pagination={{
                  defaultPageSize: 4,
                  showSizeChanger: true,
                  pageSizeOptions: ["4", "8", "16"],
                }}
              />
            ) : (
              <h1>There is no Doctors </h1>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
