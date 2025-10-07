import React, { useEffect } from "react";
import axios from "axios";
import base_url from "../utils/constants";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";
import Cards from "./Cards";    
import { useState } from "react";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  // console.log(feed);
  const [button , setButton] = useState(true);
  

 
  // console.log(feed?.users[0]);
  const getFeed = async () => {
    if (feed && feed.users && feed.users.length > 0) return;
    try {
      const res = await axios.get(base_url + "/feed", {
        withCredentials: true,
      });
      // console.log(res.data);
      dispatch(addFeed(res.data));
    } catch (err) {
      // console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || !feed.users) return <div>Loading...</div>;

  const currentUser = feed.users[0];

  if (!currentUser) return <div className="text-center mt-10">No more users in feed</div>;

  return (
    <div className="flex justify-center items-center min-h-screen">
       <Cards user={currentUser} button={true}/>
    </div>
  );
};

export default Feed;
