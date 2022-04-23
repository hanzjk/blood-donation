import "./messenger.css";
import React, { useContext, useEffect, useState, useRef } from "react";

import Conversation from "../conversations/Conversation";
import Message from "../message/Message";
import Header from "../admin/Header";
import axios from "axios";
import { io } from "socket.io-client";
import jwt_decode from "jwt-decode";



  
export default function Messenger() {

  const [userID, setuserID] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
     if (!token) {
       window.location.replace("/admin/login");
     }
    
     setuserID(jwt_decode(localStorage.getItem("token")).userId);
  })
  

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    
    
     socket.current = io("ws://localhost:8900");
     socket.current.on("getMessage", (data) => {
       setArrivalMessage({
         sender: data.senderId,
         text: data.text,
         createdAt: Date.now(),
       });
     });
   }, []);
  
   useEffect(() => {
     arrivalMessage &&
       currentChat?.members.includes(arrivalMessage.sender) &&
       setMessages((prev) => [...prev, arrivalMessage]);
   }, [arrivalMessage, currentChat]);
  
  
  useEffect(() => {

    socket.current.emit("addUser", userID);
    socket.current.on("getUsers", (users) => {
        // setOnlineUsers(
        //   user.followings.filter((f) => users.some((u) => u.userId === f))
        // );
    });
  }, [userID]);
  
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/conversations/" + userID
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userID]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/conversation/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  
   const handleSubmit = async (e) => {
     e.preventDefault();
     const message = {
       sender: userID,
       text: newMessage,
       conversationId: currentChat._id,
     };

     const receiverId = currentChat.members.find(
       (member) => member !== userID
     );

     socket.current.emit("sendMessage", {
       senderId: userID,
       receiverId,
       text: newMessage,
     });

     try {
       const res = await axios.post("http://localhost:8000/conversation/messages", message);
       setMessages([...messages, res.data]);
       setNewMessage("");
     } catch (err) {
       console.log(err);
     }
   };
  
   useEffect(() => {
     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);
  
  
  return (
   <div >
     {(() => {
        if (userID) {
          return (
            <>
              <div className="messenger">
                <div className="chatMenu">
                  <div className="chatMenuWrapper">
                    <div className="chatTitle">Chats</div>
                    {conversations.map((c) => (
                      <div onClick={() => setCurrentChat(c)} key={c._id}>
                        <Conversation
                          conversation={c}
                          key={c._id}
                          currentUser={userID}
                        />
                        <hr style={{ color: "white" }}></hr>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="chatBox">
                  <div className="chatBoxWrapper">
                    {currentChat ? (
                      <>
                        <div className="chatBoxTop">
                          {messages.map((m) => (
                            <div ref={scrollRef}>
                              <Message
                                message={m}
                                own={m.sender === userID}
                                key={m._id}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="chatBoxBottom">
                          <textarea
                            className="chatMessageInput"
                            placeholder="write something..."
                            onChange={(e) => setNewMessage(e.target.value)}
                            value={newMessage}
                          ></textarea>
                          <button
                            className="chatSubmitButton"
                            onClick={handleSubmit}
                          >
                            Send
                          </button>
                        </div>
                      </>
                    ) : (
                      <span className="noConversationText">
                        Open a conversation to start chat
                      </span>
                    )}
                  </div>
                </div>
                {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={userID}
              setCurrentChat={setCurrentChat}
            />{" "}
          </div>
        </div> */}
              </div>
            </>
          );
       } else {
          return (<></>);
        }
      })()}
    </div>
  );
  
 
}
