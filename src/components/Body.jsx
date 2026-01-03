import { useEffect } from "react"; // Removed 'use' (it's likely not needed here)
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import axios from "axios";
import base_url from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice"; // Added removeUser

const Body = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Initialize location hook
  const dispatch = useDispatch();

  // Grab user from Redux store
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    // Optimization: If Redux already has data, stop here.
    if (userData) return;

    try {
      const res = await axios.get(base_url + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      console.error("Session expired or invalid:", err);
      // If error (cookie invalid), clean up Redux and redirect
      dispatch(removeUser()); 
      navigate("/login");
    }
  };

  useEffect(() => {
    // 1. If we are already on login page, don't fetch
    if (location.pathname === "/login") return;

    // 2. Trigger the fetch
    fetchUser();
    
    // Note: We intentionally leave dependency array empty [] 
    // so this runs only once on page reload.
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