import React from "react";
import Layout from "./../components/Layout";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Notifications = () => {
  const token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  //   handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/getAllNotifications`,
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.msg);
      } else {
        message.error(response.data.msg);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log("error in marking all as read", error);
      message.error("error in marking all as read");
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/auth/deleteAllNotifications`,
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.msg);
      } else {
        message.error(response.data.msg);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log("Error in deleting the notifications", error);
      message.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab="unRead" key={0}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2"
              onClick={handleMarkAllRead}
              style={{ cursor: "pointer" }}
            >
              Mark All as Read
            </h4>
          </div>
          {user?.notification.map((n) => (
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(n.data.onClickPath)}
              >
                {n.msg}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2"
              onClick={handleDeleteAllRead}
              style={{ cursor: "pointer" }}
            >
              Delete All Read
            </h4>
          </div>
          {user?.seenNotification.map((sN) => (
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(sN.data.onClickPath)}
              >
                {sN.msg}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notifications;
