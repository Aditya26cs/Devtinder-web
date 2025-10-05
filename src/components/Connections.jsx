import React, { useEffect } from "react";
import axios from "axios";
import base_url from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  // console.log(connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(base_url + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);

      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return <div>No Connections</div>;
  }

  return (
    <div className="text-center mt-10 ">
      <h1 className="text-2xl text-center text-bold">Connections</h1>
      {Array.isArray(connections) &&
        connections.map((connection) => {
          console.log(connection);
          const { firstName, lastName, age, gender, about, image } = connection;
          return (
            <div
              key={connection._id}
              className="flex border p-8 mt-4 rounded-lg w-1/2 mx-auto shadow-lg bg-base-200"
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
                <p className="text-gray-600">{age} years old</p>
                <p className="text-gray-600">{gender}</p>
                <p className="text-gray-600">{about}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Connections;
