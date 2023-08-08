import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoutes({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const getUser = async () => {
    try {
      const API_URL = "http://localhost:8100/api/auth/getUserData";
      const token = localStorage.getItem("access_token");
      dispatch(showLoading());
      dispatch(hideLoading());
      const response = await axios.post(
        API_URL,
        { token: token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        <Navigate to="/login" />;
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log("error in getting the user details", error);
    }
  };
// eslint-disable-next-line
  useEffect(() => {
    if (!user) {
      getUser();
    }
    // eslint-disable-next-line
  }, [user]);

  const token = localStorage.getItem("access_token");
  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
