import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Modal, Table } from "antd";
import moment from "moment";

const PatientDaignosis = () => {
  const { user } = useSelector((state) => state.user);
  const { patientId } = useParams();
  const [daignosis, setDaignosis] = useState([]);
  const [daignosisText, setDaignosisText] = useState("");
  const [open, setOpen] = useState(false);
  const patientColumns = [
    {
      key: "33",
      title: "Patient Name",
      render: (id, record) => {
        return <h1>{record.patient.name}</h1>;
      },
    },
    {
      key: "35",
      title: "Doctor Name",
      render: (id, record) => {
        return <h1>{record.doctor.name}</h1>;
      },
    },
    {
      key: "78",
      title: "Date",
      render: (id, record) => {
        return <h1>{moment.utc(record.date).format("DD-MM-YYYY")}</h1>;
      },
    },
    {
      key: "33",
      title: "Time",
      dataIndex: "time",
    },
    {
      key: "asd",
      title: "Daignosis",
      dataIndex: "actions",
      fixed: "right",
      width: "150px",
      render: (id, record) => {
        return (
          <div className="flex items-center justify-center w-full">
            <button
              className="p-2 bg-teal-400 rounded-md w-[100px] active:scale-90 transition-all duration-300"
              onClick={() => {
                setOpen(true);
                setDaignosisText(record.daignosis);
              }}
            >
              Show
            </button>
            <Modal
              open={open}
              onCancel={() => setOpen(false)}
            //   onOk={() => setOpen(false)}
            footer={null}
            >
              <div className="flex flex-row gap-4">
                <div className="flex w-[50%]">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj4pAyp7-GJjxlgwBJGsiy77bqbSZWcEIhgg&usqp=CAU"
                    alt=""
                    className="rounded-md"
                  />
                </div>
                <div className="flex flex-col w-[50%]">
                  <h1 className="text-2xl font-bold">Daignosis is :</h1>
                  <p className="text-sm mt-10">{daignosisText}</p>
                </div>
              </div>
            </Modal>
          </div>
        );
      },
    },
  ];

  const getAllDiagnosis = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}doctor/all-daignosis`,
        {
          patientId,
          clinicId: user.clinic,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        console.log("done");
        setDaignosis(response.data.allDaignosis);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllDiagnosis();
  }, []);

  return (
    <div className="">
      <Layout>
        <div>
          <div></div>
          <div>
            <h1>Daignosis List</h1>
            {daignosis?.length > 0 ? (
              <Table
                columns={patientColumns}
                dataSource={daignosis}
                scroll={{ y: 200 }}
                pagination={{
                  defaultPageSize: 4,
                  showSizeChanger: true,
                  pageSizeOptions: ["4", "8", "16"],
                }}
              />
            ) : (
              <h1>There is no Daignosis </h1>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default PatientDaignosis;
