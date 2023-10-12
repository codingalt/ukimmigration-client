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

const Message = () => {
  const [isNotificationBoxVisible, setIsNotificationBoxVisible] = useState(false);
  const [isSettingsBoxVisible, setIsSettingsBoxVisible] = useState(false);
  const notificationRef = useRef(null);
  const settingsRef = useRef(null);

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

  const handleBackClick = () => {
    // Handle going back to the previous step or route
    navigate(-1); // Use navigate(-1) to go back to the previous page
  };

  const links = [
    { to: "/phase4", label: "General" },
    { to: "/Acomodation", label: "Accommodation" },
    { to: "/family", label: "Family" },
    { to: "/languageprofeciency", label: "Language Proficiency" },
    { to: "/education", label: "Education" },
    { to: "/employement", label: "Employement" },
    { to: "/Mainteance", label: "Mainteance" },
    { to: "/travel", label: "travel" },
    { to: "/character", label: "Character" },
    // Add more links as needed
  ];




  return (
    <div className="Container-forgetpassword-phase1">

      <div className='Header-topbar'>
        <div className='left-side-header' >
          <img src={Logo2} alt="" />
        </div>
        <div className='right-side-header'>
          <img
            src={bellicon2}
            alt=""
            className='bell-icon-notification'
            onClick={toggleNotificationBox}
          />
          <img src={profileimg} alt="" className='profile-img' />
          <p className='Jhon-profile-text'>John Leo</p>
          <p className='Admin-text'>Admin</p>
          <div ref={settingsRef}>
            <img
              src={dropdownicon}
              alt=""
              className='dropdown'
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
        {isSettingsBoxVisible &&

          <SettingBox />

        }
      </div>
      <div className="Forgetpassword-sub-2">
      <button type="submit" className="back-button-chat" onClick={handleBackClick}>
          back
        </button>
              
        <div className='Main-message-container'>


          <div className='Main-Message'>
            <div className="container-message-box-2">
              <div className="row">


                <section className="chat-2">
                  <div className="header-chat-2">
                    <img src={profile} alt="" className='Message-profile-img-2' />
                    <p className="name">John Snow</p>
                    <p className='Gmail-text-2'>Johnsnow@email.com</p>
                    <p className='Date-time-text-2'>Last seen 5 min ago   |  Local time: May 31, 2023, 1:14PM</p>

                  </div>
                  <div className="messages-chat-2">
                    <div className="message">
                      <div
                        className="photo" >
                        <p className='Admin-name-text'>Admin</p>

                        <img src={adminprofile} alt="" className='Second-profile-img-3' />

                      </div>


                      <p className='Text-second-1'>1:Introduction: Provide background information on the organization or individual
                        being studied. Explain the purpose and scope of the case study.</p>
                      <p className='Text-third-1'>2: Problem Statement: Clearly define the problem or issue that the case study
                        aims to address. Identify the challenges or opportunities faced by the organization
                        or individual.</p>
                      <p className='Text-Fourth-1' >
                        3:Research Methodology: Describe the research approach used for the case study.
                        This could include qualitative or quantitative methods, data collection techniques,

                      </p>
                    </div>

                    <p className="time"></p>
                    <div className="message text-only">
                      <p className='chat-box-text-2'>Here We Can Show Text</p>
                      <p className='Message-date-time-2'>May 31, 2023, 12:56 PM</p>
                    </div>

                    <p className="response-time time"> </p>
                    <div className="message">
                      <div
                        className="photo-2" >

                        <img src={profile} alt="" className='Second-profile-img-2' />
                        <p className='Second-profile-name'>John Snow</p>
                        <p className='Message-date-time-second'>May 31, 2023, 12:56 PM</p>
                        <p className='Second-profile-message'>Here We Can Show Text etc flaww flaaww
                          flaw</p>
                      </div>

                    </div>
                    <p className="time"></p>
                  </div>
                  <div className="footer-chat-2">
                    <i
                      className="icon fa fa-smile-o clickable"
                      style={{ fontSize: "25pt" }}
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      className="write-message-2"
                      placeholder="Type your message here"
                    />
                    <i
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
  )
}


export default Message