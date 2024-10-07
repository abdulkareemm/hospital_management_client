import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { Table, Modal } from "antd";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const validateUserInfo = (daignosisText) => {
  if (!daignosisText.trim())
    return { ok: false, error: "Daignosis is missing!" };

  return { ok: true };
};

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [reason, setReason] = useState(false);
  const [daignosis, setDaignosis] = useState(false);
  const [daignosisText, setDaignosisText] = useState("");
  const [reasonD, setReasonD] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  console.log(localStorage.getItem("token"));
  const appointmentsColumns = [
    {
      key: "33",
      title: "Patient Name",
      render: (id, record) => {
        return <h1>{record.patient.name}</h1>;
      },
    },
    {
      key: "34",
      title: "Patient address",
      render: (id, record) => {
        return <h1>{record.patient.address}</h1>;
      },
    },
    {
      key: "35",
      title: "Patient mobile",
      render: (id, record) => {
        return <h1>{record.patient.mobile}</h1>;
      },
    },
    {
      key: "33",
      title: "Reason",
      dataIndex: "reason",
      render: (id, record) => {
        return (
          <div>
            <button
              className="p-2 bg-black rounded-md text-white hover:bg-black/20"
              onClick={() => {
                setReasonD(record.reason);
                setReason(true);
              }}
            >
              Show
            </button>
            <Modal open={reason} onCancel={() => setReason(false)} footer={null}>
              <div className="flex flex-row gap-4">
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj4pAyp7-GJjxlgwBJGsiy77bqbSZWcEIhgg&usqp=CAU"
                    alt=""
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Reason is :</h1>
                  <p className="text-sm mt-10">{reasonD}</p>
                </div>
              </div>
            </Modal>
          </div>
        );
      },
    },
    {
      key: "55",
      title: "Time",
      dataIndex: "time",
    },
    {
      key: "34",
      title: "Status",
      dataIndex: "status",
    },
    {
      key: "a",
      title: "Daignosis",
      dataIndex: "actions",
      fixed: "right",
      width: "240px",
      render: (id, record) => {
        if (
          moment().format("HH:mm") >= record.time &&
          moment().format("HH:mm") <=
            moment
              .utc(
                moment
                  .utc(record.time, "HH:mm")
                  .add(record.clinic.visitDuration, "minutes")
              )
              .format("HH:mm")
        ) {
          return (
            <div className="flex flex-row gap-4">
              <button
                className="p-2 bg-blue-600/50 rounded-md"
                onClick={() => setDaignosis(true)}
              >
                Make
              </button>
              <Modal
                open={daignosis}
                onCancel={() => setDaignosis(false)}
                onOk={() => makeDaignosis(record.patient._id)}
              >
                <div className="flex flex-col gap-6">
                  <div>
                    <h1>Make Daignosis for {record.patient.name}</h1>
                  </div>
                  <div>
                    <textarea
                      className="w-[76%] p-4 outline-none rounded-md border-2 border-dashed  border-gray-700"
                      placeholder="Write a daigonsis"
                      onChange={(e) => setDaignosisText(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </Modal>
              <button
                className="p-2 bg-teal-700 rounded-md text-white"
                onClick={() =>
                  navigate(`/doctor/patient-daignosis/${record.patient._id}`)
                }
              >
                Show Previous
              </button>
            </div>
          );
        } else {
          return (
            <h1 className="text-teal-600">
              You can change make Daignosis in time of treatment
            </h1>
          );
        }
      },
    },
  ];

  const makeDaignosis = async (patientId) => {
    const { ok, error } = validateUserInfo(daignosisText);
    if (!ok) return toast.error(error, { duration: 2000 });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}doctor/make-daignosis`,
        {
          clinicId: user.clinic._id,
          patientId,
          time: moment().format("HH:mm"),
          daignosis: daignosisText,
          date: moment().format("DD-MM-YYYY"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.msg);
        setDaignosis(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTodayAppointments = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}clinic/get-today-appointments`,
        { clinicId: user.clinic },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        setAppointments(response.data.todayAppointments);
      }
    } catch (err) {
      if (err.response?.data.msg) {
        toast.error(err.response.data.msg + ",Please login ");
      }
      navigate("/");
    }
  };
  useEffect(() => {
    getTodayAppointments();
  }, []);
  return (
    <div className="">
      <Layout>
        {" "}
        <div>
          <div className="bg-red-100 rounded-lg p-2">
            <h1 className="text-2xl text-gray-500 text-center">
              Welcome
              <span className="text-purple-400 italic"> {user.name} </span>
              have a good day
            </h1>
          </div>
        </div>
        {/* list of users in system */}
        <div className="mt-2">
          <h1 className="mb-2">
            Appointments List in
            <span className="text-red-200 mx-1">
              {moment().format("DD-MM-YYYY")}:
            </span>
          </h1>
          {appointments?.length > 0 ? (
            <Table
              columns={appointmentsColumns}
              dataSource={appointments}
              scroll={{ y: 200 }}
              pagination={{
                defaultPageSize: 4,
                showSizeChanger: true,
                pageSizeOptions: ["4", "8", "16"],
              }}
            />
          ) : (
            <h1>There is no Appointments </h1>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
