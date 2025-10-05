import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addRequest } from "../utils/requests";
import base_url from "../utils/constants";
import { useSelector } from "react-redux";

const Requests = () => {
  const dispatch = useDispatch();
  const requestReceived = useSelector((state) => state.requests);
  // console.log(requestReceived); --> array of objects

  const requests = async () => {
    try {
      const res = await axios.get(base_url + "/user/requests", {
        withCredentials: true,
      });
      //  console.log(res?.data?.connectionRequests);
      dispatch(addRequest(res?.data?.connectionRequests));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    requests();
  }, []);

  if (!requestReceived) return <div>Loading...</div>;

  if (requestReceived.length === 0) {
    return <div>No Requests</div>;
  }

  return (
    <div className="text-center mt-10 ">
      <h1 className="text-2xl text-center text-bold">Requests</h1>
      {Array.isArray(requestReceived) &&
        requestReceived.map((request) => {
          //  console.log(request);
          const { _id, firstName, lastName, age, gender, about, image } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex border p-8 mt-4 rounded-lg w-2/3 mx-auto shadow-lg bg-base-200 justify-between items-center"
            >
              <div>
                {image && (
                  <img
                    src={image}
                    alt="Profile"
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                )}
              </div>
              <div className="text-center ml-[30%]">
                <h2 className="text-xl text-bold">
                  {firstName} {lastName}
                </h2>
                {age && <p className="text-gray-600">Age: {age}</p>}
                <p className="text-gray-600">{gender}</p>
                <p className="text-gray-600">{about}</p>
              </div>

              <div className="ml-auto space-x-2">
                <button className="btn btn-soft btn-success">Success</button>

                <button className="btn btn-soft btn-error">Error</button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Requests;
