import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
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
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import { useGetClientNotificationQuery, useReadNotificationClientMutation } from "../services/api/userApi";
import MainContext from "./Context/MainContext";
import { v4 as uuidv4 } from "uuid";

const Navbar = () => {
  const { socket } = useContext(MainContext);
    const [isNotificationBoxVisible, setIsNotificationBoxVisible] =
      useState(false);
    const [isSettingsBoxVisible, setIsSettingsBoxVisible] = useState(false);
    const notificationRef = useRef(null);
    const settingsRef = useRef(null);
    const { user } = useSelector((state) => state.user);
    const { name, profilePic } = user? user : "";
    const [received, setReceived] = useState(null);
    const [count, setCount] = useState();
    const [readNotificationClient,resp] = useReadNotificationClientMutation();
    const {isSuccess} = resp;
  const { data, refetch, isLoading, isFetching } =
    useGetClientNotificationQuery(null, { refetchOnMountOrArgChange: true });

    useEffect(() => {
      socket?.on("phase notification received", (phaseNoti) => {
        const uuid = uuidv4();
        const tempObj = { ...phaseNoti, uuid };
        console.log("uuid", uuid);
        setReceived(tempObj);
        console.log("phase notification received---- Navbar", phaseNoti);
      });
    }, [received]);

    useEffect(() => {
      if (received) {
        refetch();
      // window.location.reload(false);
      }
    }, [received]);

      console.log("received", received);

    useEffect(()=>{
      if(isSuccess){
        refetch();
      }
    },[isSuccess]);

    useEffect(() => {
      if (data) {
        let countVal = 0;
        data?.notifications?.map((item) => {
          if (item.status === 0) {
            countVal = countVal + 1;
          }
        });
        setCount(countVal);
      }
    }, [data]);


        // useEffect(() => {
        //   const handleClickOutside = (event) => {
        //     if (
        //       notificationRef.current &&
        //       !notificationRef.current.contains(event.target) &&
        //       settingsRef.current &&
        //       !settingsRef.current.contains(event.target)
        //     ) {
        //       setIsNotificationBoxVisible(false);
        //       setIsSettingsBoxVisible(false);
        //     }
        //   };
        //   document.addEventListener("mousedown", handleClickOutside);
        //   return () => {
        //     document.removeEventListener("mousedown", handleClickOutside);
        //   };
        // }, []);

        const toggleNotificationBox = () => {
          setIsNotificationBoxVisible(!isNotificationBoxVisible);
          setTimeout(() => {
            if(count > 0){
              readNotificationClient();
            }
          }, 1000);
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
        <IoNotificationsOutline
          className="bell-icon-notification"
          onClick={toggleNotificationBox}
          style={{ fontSize: "1.7rem", color: "#000", marginRight: "10px" }}
        />
        {count > 0 ? (
          <div className="icon-badge-noti">
            <span></span>
          </div>
        ) : null}

        {user?.googleId ? (
          <img
            style={{
              width: "2.6rem",
              height: "2.6rem",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            src={profilePic ? profilePic : userDefault}
            onClick={toggleSettingsBox}
            alt=""
            className="profile-img"
          />
        ) : (
          <img
            style={{
              width: "2.6rem",
              height: "2.6rem",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            src={
              profilePic
                ? import.meta.env.VITE_IMG_URI + profilePic
                : userDefault
            }
            onClick={toggleSettingsBox}
            alt=""
            className="profile-img"
          />
        )}

        <div
          onClick={toggleSettingsBox}
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "60px",
            gap: "8px",
            cursor:"pointer"
          }}
        >
          <p
            style={{ cursor: "pointer" }}
            className="Jhon-profile-text"
            onClick={toggleSettingsBox}
          >
            {name?.length > 15 ? `${name?.slice(0, 15)}..` : name}
          </p>
          <div ref={settingsRef} onClick={toggleSettingsBox}>
            <img
              src={dropdownicon}
              alt=""
              onClick={toggleSettingsBox}
              style={{ width: "13px", marginTop: "18px" }}
            />
          </div>
        </div>

        {/* <p className="Admin-text">Admin</p> */}
      </div>

      {/* Render NotificationBox conditionally */}
      {isNotificationBoxVisible && (
        <div
          className="notification-wrapper"
          ref={notificationRef}
          style={{ position: "absolute", left: "101%", top: "-5.5%" }}
        >
          <NotificationBox />
        </div>
      )}
      {isSettingsBoxVisible && <SettingBox />}
    </div>
  );
}

export default Navbar