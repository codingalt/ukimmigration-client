import React, { useEffect, useState, useRef, useMemo } from 'react';
import Logo2 from '../Assets/Ukimmigration-logo.png';
import bellicon2 from "../Assets/bell-icon-svg.svg"
import profileimg from "../Assets/profile-img-svg.svg"
import dropdownicon from "../Assets/dropdown-icon-svg.svg"
import { NavLink } from 'react-router-dom';
import NotificationBox from './Notification';
import SettingBox from "./Settingbox"
import "../style/Phase4.css"
import "../style/Accomodation.css"
import "../style/Messagesimple.css"
import adminprofile from "../Assets/admin-profile-img.png"
import profile from "../Assets/profile-img-svg.svg"
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS
import { useNavigate } from 'react-router-dom';
import {
  useGetUserChatsQuery,
  useGetUserMessagesQuery,
  useSendMessageMutation,
  useReadMessagesByChatMutation,
} from "../services/api/chatApi";
import { useSelector } from 'react-redux';
import io from "socket.io-client";
import ScrollableFeed from "react-scrollable-feed";
import moment from "moment";
import userDefault from "../Assets/user-default.png"
import pdfimg from "../Assets/pdf-img.png"
import downloadicon from "../Assets/downloadicon.svg";
import Navbar from './Navbar';
import InputEmoji from "react-input-emoji";
import { useLocation } from "react-router-dom";
import Messageprofileimg from "../Assets/billing-table-img.png";

var socket;

const Message = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isNotificationBoxVisible, setIsNotificationBoxVisible] = useState(false);
  const [isSettingsBoxVisible, setIsSettingsBoxVisible] = useState(false);
  const notificationRef = useRef(null);
  const settingsRef = useRef(null);
  const { user } = useSelector((state) => state.user);

  const [socketConnected, setSocketConnected] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const fileRef = useRef();
  const [receiveMessage, setReceiveMessage] = useState(null);

  useEffect(() => {
    socket = io(import.meta.env.VITE_URI);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, []);


  const navigate = useNavigate();
  const {data, isLoading} = useGetUserChatsQuery();
  console.log("chat",data?.chats[0]);
  const chatId = data?.chats[0]?._id;
  const applicationId = data?.chats[0]?.applicationId;

  const [readMessagesByChat, res] = useReadMessagesByChatMutation();
  const { refetch: refetchReadMsgs, isSuccess: isSuccessMsgRead } = res;

  // get messages 
  const {
    data: messageData,
    isLoading: loading,
    refetch,
  } =  useGetUserMessagesQuery(chatId,{refetchOnMountOrArgChange: true});

  const [sendMessage, sendMsgRes] = useSendMessageMutation();
  const {isLoading: isLoadingSend} = sendMsgRes;

  useEffect(() => {
    setMessages(messageData?.result);
  }, [messageData, refetch]);

  const handleSendMessage = async () => {
    if (newMessage || files.length > 0) {
      setNewMessage("");
      let formData = new FormData();
      formData.append("chatId", chatId);
      formData.append("content", newMessage);
      formData.append("applicationId", applicationId);
      console.log("selected files",files);
      for(let i=0; i<files.length; i++) {
        formData.append("chatFile", files[i]);
      }
      const { data } = await sendMessage(formData);
      console.log(data?.result);
      socket.emit("new message", data?.result);
      setMessages([...messages, data?.result?.result]);
      setFiles([]);
    }
  };

  const openFile = (e) => {
    const files = e.target.files;
    console.log(files);
    const filePaths = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      filePaths.push(file);
    }
    setFiles(filePaths)
   
  };

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // console.log(messages);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

useMemo(()=>{
  if(chatId){
    readMessagesByChat(chatId);
  }
},[]);

useEffect(() => {
  socket?.on("message received", async (newMessageReceived) => { 
    setMessages([...messages, newMessageReceived.result]);
  });

});

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };


  return (
    <div className="Container-forgetpassword-phase1">
      <Navbar />
      <div className="Forgetpassword-sub-2">
        <button
          type="submit"
          className="back-button-chat"
          onClick={() => navigate(-1, { state: { from: currentPath } })}
        >
          back
        </button>

        <div className="Main-message-container">
          <div className="Main-Message">
            <div className="container-message-box-2" style={{overflow:"hidden"}}>
              <div className="row">
                <section className="chat-2">
                  <div className="header-chat-2">
                    {user?.googleId ? (
                      <img
                        style={{
                          width: "2.6rem",
                          height: "2.6rem",
                          borderRadius: "50%",
                        }}
                        src={
                          user?.profilePic
                            ? user?.profilePic
                            : Messageprofileimg
                        }
                        alt=""
                        className="Message-profile-img-2"
                      />
                    ) : (
                      <img
                        style={{
                          width: "2.6rem",
                          height: "2.6rem",
                          borderRadius: "50%",
                        }}
                        src={
                          user?.profilePic
                            ? `${import.meta.env.VITE_IMG_URI}${
                                user?.profilePic
                              }`
                            : Messageprofileimg
                        }
                        alt=""
                        className="Message-profile-img-2"
                      />
                    )}

                    <p className="name">{user?.name}</p>
                    <p className="Gmail-text-2">{user?.email}</p>
                    <p className="Date-time-text-2"></p>
                  </div>
                  <div className="messages-chat-2" ref={chatContainerRef}>
                    {messages?.map((item) => {
                      const isUserMessage = item?.sender?._id === user?._id;
                      return (
                        !loading && (
                          <div
                            className={
                              isUserMessage ? `admin-msg message` : `message`
                            }
                            key={item._id}
                          >
                            <div className="photo-2">
                              {user?.googleId ? (
                                <img
                                  style={{
                                    borderRadius: "50%",
                                    width: "2rem",
                                    height: "2rem",
                                  }}
                                  src={
                                    isUserMessage && user?.profilePic
                                      ? user?.profilePic
                                      : !isUserMessage
                                      ? adminprofile
                                      : Messageprofileimg
                                  }
                                  alt=""
                                  className="Second-profile-img-2"
                                />
                              ) : (
                                <img
                                  style={{
                                    borderRadius: "50%",
                                    width: "2rem",
                                    height: "2rem",
                                  }}
                                  src={
                                    isUserMessage && user?.profilePic
                                      ? `${import.meta.env.VITE_IMG_URI}${
                                          user?.profilePic
                                        }`
                                      : !isUserMessage
                                      ? adminprofile
                                      : Messageprofileimg
                                  }
                                  alt=""
                                  className="Second-profile-img-2"
                                />
                              )}

                              <p className="Second-profile-name">
                                {isUserMessage ? user?.name : "Admin"}
                              </p>
                              <p
                                className="Message-date-time-second"
                                style={
                                  isUserMessage ? { marginLeft: "25px" } : {}
                                }
                              >
                                {moment(item?.createdAt).format(
                                  "dddd, MMMM Do hh:mm a"
                                )}
                              </p>
                              <p
                                className="Second-profile-message"
                                style={
                                  item?.isPhaseMessage
                                    ? { color: "red" }
                                    : item?.isPhaseApprovedMessage
                                    ? {
                                        color: "#5cb85c",
                                      }
                                    : {}
                                }
                              >
                                {item?.content}
                                {item?.files && item?.files?.length > 0 && (
                                  <div className="one-pdf-file">
                                    {item?.files?.map((file) => (
                                      <div className="pdf-file-send" key={file}>
                                        <img
                                          src={pdfimg}
                                          alt=""
                                          className="file-attach-pdf-icon"
                                        />
                                        <div>
                                          <p className="Attach-file-text">
                                            Attached File
                                          </p>
                                        </div>
                                        <a
                                          href={`${
                                            import.meta.env.VITE_IMG_URI
                                          }${file}`}
                                          download
                                          target="_blank"
                                        >
                                          <img
                                            src={downloadicon}
                                            alt=""
                                            className="pdf-file-downloadicon"
                                          />
                                        </a>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </p>
                            </div>
                          </div>
                        )
                      );
                    })}
                    {/* {messages?.map((item) =>
                      item?.sender?.toString() === user?._id
                        ? !isLoadingSend &&
                          !loading && (
                            <div className="message" key={item._id}>
                              <div className="photo-2">
                                <img
                                  style={{
                                    borderRadius: "50%",
                                    width: "2rem",
                                    height: "2rem",
                                  }}
                                  src={
                                    item?.sender?.toString() === user?._id &&
                                    user?.profilePic
                                      ? `${import.meta.env.VITE_IMG_URI}${
                                          user?.profilePic
                                        }`
                                      : userDefault
                                  }
                                  alt=""
                                  className="Second-profile-img-2"
                                />
                                <p className="Second-profile-name">
                                  {item?.sender?.toString() === user?._id
                                    ? user.name
                                    : "Admin"}
                                </p>
                                <p className="Message-date-time-second">
                                  {item?.sender?.toString() === user?._id &&
                                    moment(item?.createdAt).format(
                                      "dddd, MMMM Do hh:mm a"
                                    )}
                                </p>
                                <p
                                  className="Second-profile-message"
                                  style={
                                    item?.isPhaseMessage && {
                                      color: "#5cb85c",
                                    }
                                  }
                                >
                                  {item?.sender?.toString() === user?._id &&
                                    item?.content}
                                  {item?.sender?.toString() === user?._id &&
                                    item?.files &&
                                    item?.files?.length > 0 && (
                                      <div className="one-pdf-file">
                                        {item?.files?.map((file) => (
                                          <div
                                            className="pdf-file-send"
                                            key={file}
                                          >
                                            <img
                                              src={pdfimg}
                                              alt=""
                                              className="file-attach-pdf-icon"
                                            />
                                            <div>
                                              <p className="Attach-file-text">
                                                Attached File
                                              </p>
                                            </div>
                                            <a
                                              href={`${
                                                import.meta.env.VITE_IMG_URI
                                              }${file}`}
                                              download
                                            >
                                              <img
                                                src={downloadicon}
                                                alt=""
                                                className="pdf-file-downloadicon"
                                              />
                                            </a>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                </p>
                              </div>
                            </div>
                          )
                        : !isLoadingSend &&
                          !loading && (
                            <>
                              <NavLink
                                key={item._id}
                                to={
                                  item?.isPhaseApprovedMessage && item?.redirect
                                }
                              >
                                <div className="message admin-msg">
                                  <div className="photo-2">
                                    <img
                                      src={adminprofile}
                                      alt=""
                                      className="Second-profile-img-2"
                                    />
                                    <p className="Second-profile-name">Admin</p>
                                    <p className="Message-date-time-second">
                                      {moment(item?.createdAt).format(
                                        "dddd, MMMM Do hh:mm a"
                                      )}
                                    </p>
                                    <p
                                      className="Second-profile-message"
                                      style={
                                        item?.isPhaseApprovedMessage && {
                                          color: "#5cb85c",
                                        }
                                      }
                                    >
                                      {item?.content}
                                    </p>

                                    {item?.files &&
                                      item?.files?.length > 0 &&
                                      item?.files?.map((file) => (
                                        <div
                                          className="pdf-file-send"
                                          key={file}
                                        >
                                          <div className="one-pdf-file">
                                            <img
                                              src={pdfimg}
                                              alt=""
                                              className="file-attach-pdf-icon"
                                            />
                                            <div>
                                              <p className="Attach-file-text">
                                                Attached File
                                              </p>
                                            </div>
                                            <a
                                              href={`${
                                                import.meta.env.VITE_IMG_URI
                                              }${file}`}
                                              download
                                            >
                                              download
                                              <img
                                                src={downloadicon}
                                                alt=""
                                                className="pdf-file-downloadicon"
                                              />
                                            </a>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </NavLink>
                            </>
                          )
                    )} */}

                    <p className="response-time time"> </p>

                    <p className="time"></p>
                  </div>
                  {/* Select file hidden input  */}
                  <input
                    ref={fileRef}
                    type="file"
                    id="filemsg"
                    multiple
                    name="filemsg"
                    accept=".pdf"
                    onChange={openFile}
                    style={{ display: "none" }}
                  />
                  <div className="footer-chat-2">
                    {/* <i
                      className="icon fa fa-smile-o clickable"
                      style={{ fontSize: "25pt" }}
                      aria-hidden="true"
                    /> */}
                    <i
                      onClick={() => fileRef.current.click()}
                      className="icon fa fa-paperclip clickable"
                      style={{ fontSize: "25pt" }}
                      aria-hidden="true"
                    />
                    <InputEmoji
                      className="write-message-2"
                      value={newMessage}
                      onKeyDown={handleKeyDown}
                      onChange={handleChange}
                      placeholder={
                        files.length > 0
                          ? "Your Files are selected. Click send to send this files"
                          : "Type your message here"
                      }
                    />
                    {/* <input
                      type="text"
                      className="write-message-2"
                      placeholder={
                        files.length > 0
                          ? "Your Files are selected. Click send to send this files"
                          : "Type your message here"
                      }
                      value={newMessage}
                      onChange={(e) => {
                        setNewMessage(e.target.value);
                      }}
                    /> */}
                    <i
                      // style={
                      //   newMessage === "" || files === ""
                      //     ? { cursor: "default", pointerEvents: "none" }
                      //     : { cursor: "pointer" }
                      // }
                      onClick={handleSendMessage}
                      className="icon send fa fa-paper-plane-o clickable"
                      aria-hidden="true"
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Message