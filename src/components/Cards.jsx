import React from "react";
import axios from "axios";
import base_url from "../utils/constants";

const Cards = ({ user , button , setButton }) => {



  const handleUserClick = async (status, userId) => {
    try {
      const res = await axios.post(
        base_url + "/request/send/" + status + "/" + userId,
        {},
        {
          headers: {
            withCredentials: true,
          },
        }
      );
    } catch (err) {}
  };

  const { firstName, lastName, age, gender, about, skills, image } = user;
  // console.log(user);
  return (
    <div className="card bg-base-200 w-96 shadow-sm border-2 border-gray-800 h-fit">

      <figure>
        <img src={image} alt="Person Image" className="object-cover w-full h-96" />
      </figure>

      <div className="card-body">

        <h2 className="card-title">{firstName + " " + lastName}</h2>

        {age && gender && <p>{age + " " + gender}</p>}

        <p>{about}</p>
        
        {skills && <p>{skills}</p>}

         {button && <div className="card-actions justify-center my-4  ">
          <button className="btn btn-primary ">Ignored</button>
          <button className="btn btn-secondary ">Interested</button>
         </div>}

      </div>
    </div>
  );
};

export default Cards;
