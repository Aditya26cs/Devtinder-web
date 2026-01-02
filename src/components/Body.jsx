import { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import base_url from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = async () => {
    try {
      const res = await axios.get(base_url + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
        return;
      }
      console.error("Failed to fetch profile:", err);
    }
  };

  // useEffect(() => {
  //   if (location.pathname === "/login") return;
  //   userData();
  // }, [location.pathname, dispatch, navigate]);

  useEffect(() => {
    if (location.pathname === "/login") return;

    if (!document.cookie.includes("token")) {
      navigate("/login");
      return;
    }

    userData();
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
