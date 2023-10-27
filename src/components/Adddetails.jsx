import React, { useEffect, useState, useRef } from 'react';
import Logo2 from '../Assets/Ukimmigration-logo.png';
import bellicon2 from "../Assets/bell-icon-svg.svg"
import profileimg from "../Assets/profile-img-svg.svg"
import dropdownicon from "../Assets/dropdown-icon-svg.svg"
import { Link, NavLink } from 'react-router-dom';
import NotificationBox from './Notification';
import SettingBox from "./Settingbox"
import "../style/Adddetails.css"
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";


const Adddetails = () => {

    const [isNotificationBoxVisible, setIsNotificationBoxVisible] = useState(false);
    const [isSettingsBoxVisible, setIsSettingsBoxVisible] = useState(false);
    const notificationRef = useRef(null);
    const settingsRef = useRef(null);

    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = (e) => {
      e.preventDefault();
    };

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

    return (
      <div className="Container-forgetpassword-phase1">
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
            <img src={profileimg} alt="" className="profile-img" />
            <p className="Jhon-profile-text">John Leo</p>
            <p className="Admin-text">Admin</p>
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
        <div className="Forgetpassword-sub-2">
          <div className="left-side-forget-password-2">
            <p className="Required-data-text">Add Debit / Credit Card</p>
            <NavLink to="/phase3">
              <button type="submit" className="back-button">
                back
              </button>
            </NavLink>
            <form id="payment-form" onSubmit={handleSubmit}>
              <PaymentElement />
              <button type="submit" className="submit-details">
                Submit
              </button>
            </form>
          </div>

          <div className="right-side-forget-password-2"></div>
        </div>
      </div>
    );
}

export default Adddetails