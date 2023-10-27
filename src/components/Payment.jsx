import React, { useEffect, useRef, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import { usePaymentIntentMutation } from '../services/api/userApi';
import Adddetails from './Adddetails';
import { NavLink, useNavigate } from 'react-router-dom';
import NotificationBox from "./Notification";
import SettingBox from "./Settingbox";
import "../style/Adddetails.css";
import Logo2 from "../Assets/Ukimmigration-logo.png";
import bellicon2 from "../Assets/bell-icon-svg.svg";
import profileimg from "../Assets/profile-img-svg.svg";
import dropdownicon from "../Assets/dropdown-icon-svg.svg";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = () => {
    const [clientSecret, setClientSecret] = useState("");
    const [paymentIntent, result] = usePaymentIntentMutation();

    const getPaymentInent = async()=>{
        const { data } = await paymentIntent({
          applicationId: "6525365e8a1fbbcbd5e61607",
        });
        setClientSecret(data?.clientSecret);
    }


    useEffect(()=>{
        getPaymentInent();
    },[]);

     const appearance = {
       theme: "stripe",
       variables: {
         colorPrimary: "#0570de",
         colorBackground: "#F7F7F7",
         colorText: "#30313d",
         colorDanger: "#df1b41",
         fontFamily: "Ideal Sans, system-ui, sans-serif",
         spacingUnit: "2px",
         borderRadius: "4px",
         spacingGridColumn: "20px",
         spacingGridRow: "20px",
         // See all possible variables below
       },
     };

     const [isNotificationBoxVisible, setIsNotificationBoxVisible] =
       useState(false);
     const [isSettingsBoxVisible, setIsSettingsBoxVisible] = useState(false);
     const notificationRef = useRef(null);
     const settingsRef = useRef(null);
    const navigate = useNavigate();
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
    <div>
    
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
            {stripePromise && clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret, appearance }}
              >
                <CheckoutForm clientSecret={clientSecret} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment