import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import base_url from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import Connections from './Connections';
import Requests from './Requests';      

const Navbar = () => {
  const user = useSelector((state) => state.user);
  // useSelector is a hook provided by react-redux to access the state of particular slices from the Redux store.
  // Here, it is used to get the state of user slice from the Redux store.

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  


  const handleLogout = async () => {
     try{
        await axios.post(base_url + "/logout", {}, {withCredentials: true});
        dispatch(removeUser());
        return navigate("/login");
     }
      catch(err){
        console.log(err);
      }
  }

  return (
     <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Devtinder</Link>
      </div>
      
      {user && <div className="flex gap-2 items-center">
        <p>Welcome, {`${user.firstName} 👏`}</p>
        <div className="dropdown dropdown-end mx-4">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
             <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.image || "https://placeimg.com/80/80/people"} 
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 z-1 mt-5 rounded-xl w-52 p-2 shadow"
          >
            <li>
              <Link to = "/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connections">Connections</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>}
    </div>
  )
}

export default Navbar;