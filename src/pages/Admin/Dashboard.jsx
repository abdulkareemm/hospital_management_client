import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaUsersGear, FaUsers } from "react-icons/fa6";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [ss, setss] = useState(false);
  const navigate = useNavigate();

  const clinicsColumns = [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
      fixed: "left",
      width: "150px",
    },
    {
      key: "2",
      title: "Logo",
      dataIndex: "logo",
      width: "150px",
      render: (id, record) => {
        return <img src={record.logo.url} alt="" className="w-12 h-8" />;
      },
    },
    {
      key: "3",
      title: "Doctors",
      dataIndex: "logo",
      width: "150px",
      render: (id, record) => {
        return <h1>{record.doctors.length}</h1>;
      },
    },
    {
      key: "4",
      title: "Fee",
      dataIndex: "fees",
      width: "150px",
      sorter: {
        compare: (a, b) => a.fees - b.fees,
        multiple: 1,
      },
    },
    { key: "5", title: "Mobile", dataIndex: "mobile", width: "200px" },
    { key: "6", title: "Start From", dataIndex: "startFrom", width: "150px" },
    { key: "7", title: "End At", dataIndex: "endAt", width: "150px" },
    {
      key: "8",
      title: "Visit Duration",
      dataIndex: "visitDuration",
      width: "150px",
    },
    {
      key: "9",
      title: "Color Highlight",
      dataIndex: "color_highlight",
      width: "150px",
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
            className="bg-red-700/40 py-1 px-3 text-white rounded-md hover:bg-red-700 hover:scale-x-110"
            onClick={(e) => deleteClinic(e, record._id)}
          >
            Delete
          </button>
        );
      },
    },
  ];
  const deleteClinic = async (e, clinicId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}hospital/delete-clinic`,
        { clinicId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.msg, { duration: 2000 });
        navigate("/admin/dashboard");
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
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}hospital/`,
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
        setPatients(response.data.patients);
        setClinics(response.data.clinics);
      } else {
        console.log(response)
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.msg);
    }
  };
  useEffect(() => {
    getInfo();
  }, [ss]);

  return (
    <div className="">
      <Layout>
        <div className="flex flex-col gap-y-4">
          {/* count of users in system */}
          <div className="flex flex-row p-2.5 justify-between ">
            {/* doctors count */}
            <div className=" flex flex-col w-[32%] rounded-md border-[1.2px] border-[#d5d5d5] p-4 gap-y-2">
              <div className="flex flex-row items-center justify-between">
                <div className="border-2 border-purple-500 p-4 rounded-full">
                  <FaUsersGear className="text-indigo-500 text-3xl" />
                </div>
                <h1 className="text-3xl">{doctors.length + 40}</h1>
              </div>
              <h1 className="text-gray-600">Doctors</h1>
              <div className="flex flex-row">
                <div className="w-[50%] h-[8px] bg-amber-200 rounded-l-full"></div>
                <div className="w-[50%] h-[8px] bg-[#e9ecef] rounded-r-full"></div>
              </div>
            </div>
            {/* patients count */}
            <div className=" flex flex-col w-[32%] rounded-md border-[1.2px] border-[#d5d5d5] p-4 gap-y-2">
              <div className="flex flex-row items-center justify-between">
                <div className="border-2 border-sky-500 p-4 rounded-full">
                  <FaUsers className="text-blue-600 text-3xl" />
                </div>
                <h1 className="text-3xl">{patients.length + 65}</h1>
              </div>
              <h1 className="text-gray-600">Patients</h1>
              <div className="flex flex-row">
                <div className="w-[50%] h-[8px] bg-sky-300 rounded-l-full"></div>
                <div className="w-[50%] h-[8px] bg-[#e9ecef] rounded-r-full"></div>
              </div>
            </div>
            {/* appointments count */}
            <div className=" flex flex-col w-[32%] rounded-md border-[1.2px] border-[#d5d5d5] p-4 gap-y-2">
              <div className="flex flex-row items-center justify-between">
                <div className="border-2 border-orange-200 p-4 rounded-full">
                  <HiOutlineBanknotes className="text-rose-200  text-3xl" />
                </div>
                <h1 className="text-3xl">{appointments.length + 129}</h1>
              </div>
              <h1 className="text-gray-600">Appointments</h1>
              <div className="flex flex-row">
                <div className="w-[50%] h-[8px] bg-rose-300 rounded-l-full"></div>
                <div className="w-[50%] h-[8px] bg-[#e9ecef] rounded-r-full"></div>
              </div>
            </div>
          </div>
          {/* list of users in system */}
          <div>
            <h1>Clinic List</h1>
            {clinics?.length > 0 ? (
              <Table
                columns={clinicsColumns}
                dataSource={clinics}
                scroll={{ y: 200 }}
                pagination={{
                  defaultPageSize: 4,
                  showSizeChanger: true,
                  pageSizeOptions: ["4", "8", "16"],
                }}
              />
            ) : (
              <h1>There is no Clinics </h1>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
