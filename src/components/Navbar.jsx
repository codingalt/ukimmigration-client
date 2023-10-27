import React, { useEffect, useState, useRef, useMemo } from "react";
import "../style/forgetpassword.css";
import "../style/Phase1.css";
import Logo2 from "../Assets/Ukimmigration-logo.png";
import bellicon2 from "../Assets/bell-icon-svg.svg";
import profileimg from "../Assets/profile-img-svg.svg";
import dropdownicon from "../Assets/dropdown-icon-svg.svg";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import NotificationBox from "./Notification";
import SettingBox from "./Settingbox";
import { useSelector } from "react-redux";
import userDefault from "../Assets/user-default.png";

const Navbar = () => {
    const [isNotificationBoxVisible, setIsNotificationBoxVisible] =
      useState(false);
    const [isSettingsBoxVisible, setIsSettingsBoxVisible] = useState(false);
    const notificationRef = useRef(null);
    const settingsRef = useRef(null);
    const { user } = useSelector((state) => state.user);
    const { name, profilePic } = user && user;
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
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, []);

        const toggleNotificationBox = () => {
          setIsNotificationBoxVisible(!isNotificationBoxVisible);
        };

        const toggleSettingsBox = () => {
          setIsSettingsBoxVisible(!isSettingsBoxVisible);
        };
  return (
    <div className="Header-topbar">
      <div className="left-side-header">
        <img src={Logo2} alt="" />
      </div>
      <div className="right-side-header">
        <img
          src={bellicon2}
          alt=""
          className="bell-icon-notification"
          onClick={toggleNotificationBox}
        />
        <img style={{width:"2.6rem",height:"2.6rem",borderRadius:"50%"}} src={profilePic? import.meta.env.VITE_IMG_URI+profilePic : userDefault} alt="" className="profile-img" />
        <p className="Jhon-profile-text">{name}</p>
        {/* <p className="Admin-text">Admin</p> */}
        <div ref={settingsRef}>
          <img
            src={dropdownicon}
            alt=""
            className="dropdown"
            onClick={toggleSettingsBox}
          />
        </div>
      </div>

      {/* Render NotificationBox conditionally */}
      {isNotificationBoxVisible && (
        <div ref={notificationRef}>
          <NotificationBox />
        </div>
      )}
      {isSettingsBoxVisible && <SettingBox />}
    </div>
  );
}

export default Navbar