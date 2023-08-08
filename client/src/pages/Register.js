import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import "../styles/RegisterStyles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = async ({ name, email, password }) => {
    try {
      dispatch(showLoading());

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );
      dispatch(hideLoading());
      if (!response.data.success) {
        message.error(response.data.msg);
      } else {
        message.success(response.data.msg);
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log("error in submitting the registration form", error);
      message.error("error in submitting the registration form");
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
          <h1>Register from</h1>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <div>
            <Link to="/login">Already a user? Login here</Link>
          </div>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
}
