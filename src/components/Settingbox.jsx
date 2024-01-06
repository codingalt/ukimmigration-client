import React, { useMemo, useState } from 'react';
import "../style/notifictaionbox.css"
import setting from "../Assets/setting-icon.svg"
import Logout from "../Assets/logout-icon.svg"
import nextpge from "../Assets/next-page-redirect-icon.svg"
import "../style/Settingbox.css"
import { Link, useNavigate } from 'react-router-dom';
import "../style/notifictaionbox.css"
import { useLogoutMutation } from '../services/api/userApi';
import { toastError } from './Toast';
import { MdOutlineSettings } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

const settingbox = () => {
  const [logout, result] = useLogoutMutation();
  const { error,isSuccess} = result;
  const navigate = useNavigate();
  useMemo(()=>{
    if(error){
      toastError(error?.data?.message)
    }
  },[error]);

  useMemo(()=>{
    if(isSuccess){
      navigate("/")
    }
  },[isSuccess])

  const handleLogout = async()=>{
    await logout();
    localStorage.removeItem("ukimmigration_token");
    window.location.reload(false);
  }
  
  return (
    <div className="Setting-box">
      <div className="notification-header"></div>
      <div className="setting-list">
        <ul>
          <Link to="/setting">
            <li className="notification-item">
              <div className="Notifiction-img">
                <MdOutlineSettings
                  className="icons"
                  style={{ fontSize: "1.9rem", color: "#000" }}
                />
                {/* <img src={setting} alt="" className="icons" /> */}
              </div>
              <div className="right-side-setting">
                <p className="Setting-heading">
                  Setting{" "}
                  <FaChevronRight
                    className="next-page-icon"
                    style={{ fontSize: "2rem", color: "#000" }}
                  />
                  {/* <img src={nextpge} alt="" className="next-page-icon" /> */}
                </p>
              </div>
            </li>
          </Link>
          <li
            className="notification-item"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <div className="Notifiction-img">
              <IoMdLogOut
                className="icons"
                style={{ fontSize: "2rem", color: "#000" }}
              />
            </div>
            <div className="right-side-setting">
              <p className="Setting-heading">Logout</p>
            </div>
          </li>

          {/* Add more static notification items here */}
        </ul>
      </div>
    </div>
  );
}

export default settingbox