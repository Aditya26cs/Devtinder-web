import React, { useState } from "react";
import Cards from "./Cards";
import base_url from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [password, setPassword] = useState(user?.password || "");
  const [age, setAge] = useState(user?.age || "");
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [image, setImage] = useState(user?.image || "");
  const [error, setError] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [button , setButton] =  useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      // Build payload, removing empty strings and converting types
      const payload = {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        password: password || undefined,
        age: age !== "" ? Number(age) : undefined,
        about: about || undefined,
        gender: gender || undefined,
        image: image || undefined,
        // skills: skillsInput ? skillsInput.split(',').map(s => s.trim()).filter(Boolean) : undefined
      };

      // Remove undefined fields
      Object.keys(payload).forEach(
        (k) => payload[k] === undefined && delete payload[k]
      );

      const res = await axios.patch(base_url + "/profile/edit", payload, {
        withCredentials: true,
      });

      // console.log(res);
      dispatch(addUser(res?.data?.data));
      setToastVisible(true);
      setError(""); // Clear error on success
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(err.response?.data || "Error updating profile");
    }
  };

  return (
    <div
      className="card bg-base-300 w-[700px] shadow-sm  absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 
    flex flex-col md:flex-row  border-2 border-gray-800 h-[700px]"
    >
      <div className="card-body  ">

        <h2 className="card-title ml-26">Edit Profile</h2>

        <fieldset className="fieldset ">
          <legend className="fieldset-legend">FirstName</legend>
          <input
            type="text"
            className="input border-none outline-none rounded-xl"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <legend className="fieldset-legend">LastName</legend>
          <input
            type="text"
            className="input border-none outline-none rounded-xl"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <legend className="fieldset-legend">Age</legend>
          <input
            type="text"
            className="input border-none outline-none rounded-xl"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <legend className="fieldset-legend">About</legend>
          <input
            type="text"
            className="input border-none outline-none rounded-xl"
            placeholder="Enter your about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <legend className="fieldset-legend">Gender</legend>
          <input
            type="text"
            className="input border-none outline-none rounded-xl"
            placeholder="Enter your gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />

          <legend className="fieldset-legend">Password</legend>
          <input
            type="text"
            className="input border-none outline-none rounded-xl"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <legend className="fieldset-legend">Profile Picture</legend>
          <input
            type="url"
            className="input border-none outline-none rounded-xl"
            placeholder="profile picture URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </fieldset>

        <div className="card-actions justify-center mt-2 ">
          <button className="btn btn-primary rounded-xl" onClick={saveProfile}>
            Save
          </button>
        </div>

      </div>

      <div className="mt-[6%] mr-3 h-3/4">

        <Cards user={{ firstName, lastName, age, about, password, gender, image }} button={button} setButton={setButton} />

        {error && (
          <div className="text-red-500 text-center mt-2 border-2  border-gray-400 rounded-xl p-2">
            <p>{error}</p>
          </div>
        )}

        {toastVisible && <div className="toast toast-top toast-center">
           
          <div className="alert alert-success">
            <span> Profile saved successfully.</span>
          </div>
        </div>}


      </div>

    </div>
  );
};

export default EditProfile;
