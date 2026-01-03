import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import base_url from "../utils/constants";
import axios from "axios";
// 1. Import useSelector to get data from the store
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [button, setButton] = useState(false);

  const dispatch = useDispatch();

  // console.log("EditProfile user prop:", user);
  useEffect(() => {
    // 1. Check if we have user data.
    // If the data is nested in 'user.data', grab that. Otherwise use 'user'.
    const actualUser = user?.data || user;

    if (!actualUser) return;

    setFirstName(actualUser.firstName || "");
    setLastName(actualUser.lastName || "");
    setAge(actualUser.age || "");
    setAbout(actualUser.about || "");
    setGender(actualUser.gender || "");
    setImage(actualUser.image || "");
    setPassword("");
  }, [user]);

  const saveProfile = async () => {
    try {
      const payload = {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        age: age !== "" ? Number(age) : undefined,
        about: about || undefined,
        gender: gender || undefined,
        image: image || undefined,
      };

      if (password && password.trim() !== "") {
        payload.password = password;
      }

      // Clean undefined fields
      Object.keys(payload).forEach(
        (k) => payload[k] === undefined && delete payload[k]
      );

      const res = await axios.patch(base_url + "/profile/edit", payload, {
        withCredentials: true,
      });

      // Update Redux with new data so the UI stays synced
      dispatch(addUser(res?.data?.data || res?.data));

      setToastVisible(true);
      setError("");
      setPassword("");

      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data || "Error updating profile");
    }
  };

  // ... (Return JSX remains exactly the same)
  return (
    <div className="card bg-base-300 w-[700px] shadow-sm absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row border-2 border-gray-800 h-[700px]">
      {/* LEFT SIDE: FORM INPUTS */}
      <div className="card-body">
        <h2 className="card-title ml-26">Edit Profile</h2>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">First Name</legend>
          <input
            type="text"
            className="input border-none outline-none rounded-xl"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <legend className="fieldset-legend">Last Name</legend>
          <input
            type="text"
            className="input border-none outline-none rounded-xl"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <legend className="fieldset-legend">Age</legend>
          <input
            type="text"
            className="input border-none outline-none rounded-xl"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <legend className="fieldset-legend">About</legend>
          <input
            type="text"
            className="input border-none outline-none rounded-xl"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <legend className="fieldset-legend">Gender</legend>
          <input
            type="text"
            className="input border-none outline-none rounded-xl"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />

          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            className="input border-none outline-none rounded-xl"
            placeholder="Leave blank to keep current password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <legend className="fieldset-legend">Profile Picture URL</legend>
          <input
            type="url"
            className="input border-none outline-none rounded-xl"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </fieldset>

        <div className="card-actions justify-center mt-2">
          <button className="btn btn-primary rounded-xl" onClick={saveProfile}>
            Save
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: PREVIEW CARD */}
      <div className="mt-[6%] mr-3 h-3/4">
        {/* Pass local state to Cards so it updates live as you type */}
        <Cards
          user={{ firstName, lastName, age, about, gender, image }}
          button={button}
          setButton={setButton}
        />

        {error && (
          <div className="text-red-500 text-center mt-2 border-2 border-gray-400 rounded-xl p-2">
            <p>{error}</p>
          </div>
        )}

        {toastVisible && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile saved successfully.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default EditProfile;
