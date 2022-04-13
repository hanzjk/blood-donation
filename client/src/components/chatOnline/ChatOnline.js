import "./chatOnline.css";
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("http://localhost:8000/donors");
      setFriends(res.data);
    };
      getFriends();

  }, [currentId]);

   useEffect(() => {
     setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
   }, [friends, onlineUsers]);

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src="https://cdn.britannica.com/66/9666-050-A2514FA5/Juan-Peron-1954.jpg?w=400&h=300&c=crop"
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}
