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
  }
  return (
    <div className="Setting-box">
      <div className="notification-header"></div>
      <div className="setting-list">
        <ul>
          <li className="notification-item">
            <div className="Notifiction-img">
              <img src={setting} alt="" className="icons" />
            </div>
            <div className="right-side-setting">
              <Link to="/setting">
                <p className="Setting-heading">
                  Setting{" "}
                  <img src={nextpge} alt="" className="next-page-icon" />
                </p>
              </Link>
            </div>
          </li>
          <li className="notification-item" onClick={handleLogout} style={{cursor:"pointer"}}>
            <div className="Notifiction-img">
              <img src={Logout} alt="" className="icons" />
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