import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import { toast } from "react-hot-toast";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";
import { useSelector } from "react-redux";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [refresh, setRefresh] = useState(false);

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
      title: "Date",
      render: (id, record) => {
        return <h1>{moment.utc(record.date).format("DD-MM-YYYY")}</h1>;
      },
      width: "130px",
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
      title: "Actions",
      dataIndex: "actions",
      fixed: "right",
      width: "200px",
      render: (id, record) => {
        if (record.status !== "Completed") {
          if (
            moment().format("HH:mm") >= record.time &&
            moment().format("HH:mm") <=
              moment
                .utc(
                  moment
                    .utc(record.time, "HH:mm")
                    .add(user.visitDuration, "minutes")
                )
                .format("HH:mm")
          ) {
            return (
              <button
                type=""
                className="bg-slate-700/20 p-2 rounded-md text-black 
                hover:bg-slate-700 hover:text-purple-300"
                onClick={() => changeStatus(record._id)}
              >
                Change status
              </button>
            );
          } else {
            return (
              <h1 className="text-purple-900">
                You can change status in time of treatment
              </h1>
            );
          }
        } else {
          return <h1 className="text-purple-900">Status Changed</h1>;
        }
      },
    },
  ];
  const changeStatus = async (appointmentId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}clinic/change-state`,
        { appointmentId, status: "Completed" },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.msg);
        setRefresh(!refresh);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getTodayAppointments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}clinic/get-today-appointments`,
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
      console.log(err);
    }
  };
  useEffect(() => {
    getTodayAppointments();
  }, [refresh]);
  return (
    <div className="">
      <Layout>
        <div>
          <div>
            <h1>
              Appointments for
              <span className="text-purple-600 mx-1">
                {moment().format("DD-MM-YYYY")}
              </span>
              :
            </h1>
          </div>
        </div>
        {/* list of users in system */}
        <div>
          <h1>Doctors List</h1>
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
            <h1>There is no Doctors </h1>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Appointments;
