import React, { useEffect } from "react";
import axios from "axios";
import base_url from "../utils/constants";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";
import Cards from "./Cards";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  //       console.log(feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(base_url + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className="flex justify-center items-center h-screen">
        <Cards user={feed.users[0]} />
      </div>
    )
  );
};

export default Feed;
