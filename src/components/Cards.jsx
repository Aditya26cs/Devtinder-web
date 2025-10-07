import React from "react";
import axios from "axios";
import base_url from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";


const Cards = ({ user , button}) => {

  if (!user) return null
  const {_id , firstName, lastName, age, gender, about, skills, image } = user;
  const dispatch = useDispatch();

  const handleUserClick = async (status, userId) => {
    try {
       await axios.post(
        base_url + "/request/send/" + status + "/" + userId, {}, { withCredentials: true}
      );


      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

 

  // console.log(user._id);
  return (
    <div className="card bg-base-200 w-96 shadow-sm border-2 border-gray-800 h-fit">

      <figure>
        <img src= {image && image.trim() !== "" ? image : undefined} alt="Person Image" className="object-cover w-full h-96" />
      </figure>

      <div className="card-body">

        <h2 className="card-title">{firstName + " " + lastName}</h2>

        {age && gender && <p>{age + " " + gender}</p>}

        <p>{about}</p>
        
        {skills && <p>{skills}</p>}

         {button && <div className="card-actions justify-center my-4  ">
          <button className="btn btn-primary" onClick={() => handleUserClick("ignored", _id)}>Ignored</button>
          <button className="btn btn-secondary" onClick={() => handleUserClick("interested", _id)}>Interested</button>
         </div>}

      </div>
    </div>
  );
};

export default Cards;
