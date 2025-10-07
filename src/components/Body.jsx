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
      if (err.status === 401) {
        navigate("/login");
      }
      // console.log(err.message);
    }
  };

  useEffect(() => {
    userData();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
