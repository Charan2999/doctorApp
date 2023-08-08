import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table, message } from "antd";
import axios from "axios";
// eslint-disable-next-line
import { render } from "react-dom";

const Users = () => {
  const token = localStorage.getItem("access_token");
  const [doctors, setDoctors] = useState([]);
  const getDoctors = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/admin/getAllDoctors`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      console.log("error in getting doctors data");
      message.error("Something went wrong");
    }
  };

  const handleAccountStatus = async (record, status) => {
    try {
      console.log(doctors);
      console.log(record);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/admin/changeDoctorStatus`,
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        message.success(response.data.msg);
      }
    } catch (error) {
      console.log("error in handling the status", error);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getDoctors();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="text-center m-2">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approve")}
            >
              Accept
            </button>
          ) : (
            <button className="btn btn-danger">Block</button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h4 className="text-center m-2">Doctors List</h4>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Users;
