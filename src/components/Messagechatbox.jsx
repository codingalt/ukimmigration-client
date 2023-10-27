import React, { useEffect, useState, useRef } from 'react';
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
import { useGetUserChatsQuery, useGetUserMessagesQuery, useSendMessageMutation } from '../services/api/chatApi';
import { useSelector } from 'react-redux';
import io from "socket.io-client";
import ScrollableFeed from "react-scrollable-feed";
import moment from "moment";
import userDefault from "../Assets/user-default.png"
import pdfimg from "../Assets/pdf-img.png"
import downloadicon from "../Assets/downloadicon.svg";
import Navbar from './Navbar';

var socket;

const Message = () => {
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

  useEffect(() => {
    socket = io(import.meta.env.VITE_URI);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        settingsRef.current &&
        !settingsRef.current.contains(event.target)
      ) {
        setIsNotificationBoxVisible(false);
        setIsSettingsBoxVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNotificationBox = () => {
    setIsNotificationBoxVisible(!isNotificationBoxVisible);
  };

  const toggleSettingsBox = () => {
    setIsSettingsBoxVisible(!isSettingsBoxVisible);
  };

  const navigate = useNavigate();
  const {data, isLoading} = useGetUserChatsQuery();
  console.log("chat", data);
  const chatId = data?.chats[0]?._id;

  // get messages 
  const {
    data: messageData,
    isLoading: loading,
    refetch,
  } =  useGetUserMessagesQuery(chatId);
  // console.log("messages",messages);

  const [sendMessage, sendMsgRes] = useSendMessageMutation();

  useEffect(() => {
    setMessages(messageData?.result);
  }, [messageData, refetch]);

  const handleSendMessage = async () => {
    if (newMessage || files.length > 0) {
      setNewMessage("");
      let formData = new FormData();
      formData.append("chatId", chatId);
      formData.append("content", newMessage);
      console.log("selected files",files);
      for(let i=0; i<files.length; i++) {
        formData.append("chatFile", files[i]);
      }
      const { data } = await sendMessage(formData);
      console.log(data?.result);
      socket.emit("new message", data?.result);
      setMessages([...messages, data]);
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="Container-forgetpassword-phase1">
      <Navbar />
      <div className="Forgetpassword-sub-2">
        <button
          type="submit"
          className="back-button-chat"
          onClick={() => navigate(-1)}
        >
          back
        </button>

        <div className="Main-message-container">
          <div className="Main-Message">
            <div className="container-message-box-2">
              <div className="row">
                <section className="chat-2">
                  <div className="header-chat-2">
                    <img
                      style={{
                        width: "2.6rem",
                        height: "2.6rem",
                        borderRadius: "50%",
                      }}
                      src={
                        user?.profilePic
                          ? `${import.meta.env.VITE_IMG_URI}${user?.profilePic}`
                          : userDefault
                      }
                      alt=""
                      className="Message-profile-img-2"
                    />
                    <p className="name">{user?.name}</p>
                    <p className="Gmail-text-2">{user?.email}</p>
                    <p className="Date-time-text-2"></p>
                  </div>
                  <div className="messages-chat-2" ref={chatContainerRef}>
                    {messages?.map((item) =>
                      item?.sender?.toString() === user?._id ? (
                        <div className="message" key={item._id}>
                          <div className="photo-2">
                            <img
                              style={{
                                borderRadius: "50%",
                                width: "2rem",
                                height: "2rem",
                              }}
                              src={
                                user?.profilePic
                                  ? `${import.meta.env.VITE_IMG_URI}${
                                      user?.profilePic
                                    }`
                                  : userDefault
                              }
                              alt=""
                              className="Second-profile-img-2"
                            />
                            <p className="Second-profile-name">{user.name}</p>
                            <p className="Message-date-time-second">
                              {moment(item?.createdAt).format(
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
                                        {/* <p className="file-sze-mb">24MB</p> */}
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

                              {/* {item?.files &&
                                } */}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Admin Message  */}
                          <NavLink
                            key={item._id}
                            to={item?.isPhaseApprovedMessage && item?.redirect}
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
                                    <div className="pdf-file-send" key={file}>
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
                                          {/* <p className="file-sze-mb">24MB</p> */}
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
                    )}

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
                    <i
                      className="icon fa fa-smile-o clickable"
                      style={{ fontSize: "25pt" }}
                      aria-hidden="true"
                    />
                    <i
                      onClick={() => fileRef.current.click()}
                      className="icon fa fa-paperclip clickable"
                      style={{ fontSize: "25pt" }}
                      aria-hidden="true"
                    />
                    <input
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
                    />
                    <i
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