import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table, message } from "antd";
import axios from "axios";

const Users = () => {
  const token = localStorage.getItem("access_token");
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/admin/getAllUsers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.log("error in getting users data");
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (test, record) => <span>{record.isDoctor ? "yes" : "no"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="text-center m-2">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h4 className="text-center m-2">Users List</h4>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;
