import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import "../styles/RegisterStyles.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = async ({ email, password }) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      window.location.reload();
      dispatch(hideLoading());
      if (!response.data.success) {
        message.error(response.data.msg);
      } else {
        localStorage.setItem("access_token", response.data.token);
        message.success(response.data.msg);
        navigate("/");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log("error in submitting the login form", error);
      message.error("error in submitting the login form");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          className="register-form"
          onFinish={onFinishHandler}
        >
          <h1>Login from</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <div>
            <Link to="/register">Not a user? register here</Link>
          </div>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </Form>
      </div>
    </>
  );
}
