import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import base_url from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  
  // ✅ THE FIX: Automatically extract user data if it's nested
  const currentUser = user?.data || user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
     try {
        await axios.post(base_url + "/logout", {}, {withCredentials: true});
        dispatch(removeUser());
        return navigate("/login");
     } catch(err) {
        console.log(err);
     }
  }

  return (
     <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Devtinder</Link>
      </div>
      
      {/* Use 'currentUser' instead of 'user' to ensure data exists */}
      {currentUser && (
        <div className="flex gap-2 items-center">
          <p>Welcome, {`${currentUser.firstName} 👏`}</p>
          <div className="dropdown dropdown-end mx-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
               <div className="w-10 rounded-full">
                {/* Fixed the broken image link */}
                <img
                  alt="Profile"
                  src={currentUser.image || "https://geographyandyou.com/images/user-profile.png"} 
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 z-1 mt-5 rounded-xl w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Friends</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar;