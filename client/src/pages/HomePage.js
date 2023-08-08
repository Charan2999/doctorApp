import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
export default function HomePage() {
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      // eslint-disable-next-line
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/getUserData`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("error in getting user data", error);
    }
  };
// eslint-disable-next-line
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1>HomePage</h1>
    </Layout>
  );
}
