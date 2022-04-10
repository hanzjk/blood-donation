
import "./conversation.css";
import React, {  useEffect, useState } from "react";
import axios from "axios";


export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId =conversation.members.find((m) => m !== currentUser);

    const getUser = async () => {
      try {
        const res = await axios("http://localhost:8000/donor/" + friendId);
        setUser(res.data.donor);
        //console.log(res.data.donor);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://cdn.britannica.com/66/9666-050-A2514FA5/Juan-Peron-1954.jpg?w=400&h=300&c=crop"
        alt=""
      />
      <span className="conversationName">{user?.name}</span>
    </div>
  );
}
