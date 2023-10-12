import React, { useEffect, useState, useRef } from 'react';
import Logo2 from '../Assets/Ukimmigration-logo.png';
import bellicon2 from "../Assets/bell-icon-svg.svg"
import profileimg from "../Assets/profile-img-svg.svg"
import dropdownicon from "../Assets/dropdown-icon-svg.svg"
import { NavLink } from 'react-router-dom';
import star from "../Assets/Star-svg.svg"
import NotificationBox from './Notification';
import SettingBox from "./Settingbox"
import "../style/Phase4.css"
import "../style/buttons.css"
import chatbox from "../Assets/chat-icon.svg"

const Employementdatafill = () => {
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

    const handleSubmitClick = () => {

    };

    
    const handleNextClick = () => {
        // Handle going to the next step or route
    };

    const handleDownload = () => {
        // Replace this with your download logic
        // For example, you can create a link to download a file
        const downloadLink = document.createElement('a');
        downloadLink.href = '/path/to/your/file.pdf'; // Replace with the actual file path
        downloadLink.download = 'downloaded-file.pdf'; // Specify the filename
        downloadLink.click();
      };

   

    
    const links = [
        { to: "/finaldataphase4", label: "General" },
        { to: "/Acomodationdata", label: "Accommodation" },
        { to: "/familydata", label: "Family" },
        { to: "/Languageprofiecneydata", label: "Language Proficiency" },
        { to: "/educationdata", label: "Education" },
        { to: "/employmentdata", label: "Employement" },
        { to: "/mainteincedata", label: "Mainteance" },
        { to: "/traveldata", label: "travel" },
        { to: "/characterdata", label: "Character" },
        // Add more links as needed
    ];
    
    const [activeLink, setActiveLink] = useState(null);
    
    useEffect(() => {
        // Get the current path from window.location.pathname
        const currentPath = window.location.pathname;
    
        // Find the matching label from the links array based on the current path
        const matchedLink = links.find((link) => link.to === currentPath);
    
        if (matchedLink) {
            setActiveLink(matchedLink.label);
        }
    }, [links]);
    
    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
    };
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


                <div className="left-side-forget-password-2">
                    <p className='Required-data-text'>Required Data*</p>
                    <NavLink to="/filldata">
                    <button type="submit" className="back-button">back</button>
                    </NavLink>

             
                    <div className='phase-4-all-phase'>
        {links.map((link, index) => (
            <NavLink
                key={index}
                to={link.to}
                className={`link-hover-effect ${activeLink === link.label ? 'link-active' : ''}`}
                onClick={() => handleLinkClick(link.label)}
            >
                <span>{link.label}</span>
            </NavLink>
        ))}
    </div>

                    <div className='Main-form'>
                  
                    <div className='fill-data-border-phase4'>
            <button onClick={handleDownload} className='download-btn'>Download File</button>

            {/* Acomodation */}
            <div className='phase-1'>
             <p className='Form-data-heading'>Employement</p>
               <div className='fill'>
                  <img src={star} alt="" className='star' />
                  <p className='Name-title'>Name</p>
                  <div className='border-y'></div>
                  <p className='Name-text'>jhon leo</p>
              
               </div>
               <div className='fill'>
                  <img src={star} alt="" className='star' />
                  <p className='Name-title'>Email</p>
                  <div className='border-y'></div>
                  <p className='Name-text'>email@email.com</p>
               
               </div>
               <div className='fill'>
                  <img src={star} alt="" className='star' />
                  <p className='Name-title'>Contact</p>
                  <div className='border-y'></div>
                  <p className='Name-text'>(485)-845-8542658</p>
              
               </div>
               <div className='fill'>
                  <img src={star} alt="" className='star' />
                  <p className='Name-title'>Date Of Birth</p>
                  <div className='border-y'></div>
                  <p className='Name-text'>email@email.com</p>
  
               </div>
                      <div className='fill'>
                  <img src={star} alt="" className='star' />
                  <p className='Name-title'>Country</p>
                  <div className='border-y'></div>
                  <p className='Name-text'>USA</p>
       
               </div>

               <div className='fill'>
                  <img src={star} alt="" className='star' />
                  <p className='Name-title'>Do you have residence in this country?*</p>
                  <div className='border-y'></div>
                  <p className='Name-text'>(485)-845-8542658</p>
                
               </div>

               <div className='fill'>
                  <img src={star} alt="" className='star' />
                  <p className='Name-title'>If Yes, what type of permission do you have to be in the country?</p>
                  <div className='border-y'></div>
                  <p className='Name-text'>Type Of Permission</p>
       
               </div>

               <div className='fill'>
                  <img src={star} alt="" className='star' />
                  <p className='Name-title'>Do you speak English?*</p>
                  <div className='border-y'></div>
                  <p className='Name-text'>yes</p>
           
               </div>

               <div className='fill'>
                  <img src={star} alt="" className='star' />
                  <p className='Name-title'>If Yes, what level of proficiency?</p>
                  <div className='border-y'></div>
                  <p className='Name-text'>Moderate </p>
       
               </div>

        
               <div className='fill'>
                  <img src={star} alt="" className='star' />
                  <p className='Name-title'>What other languages do you speak?</p>
                  <div className='border-y'></div>
                  <p className='Name-text'>German, Spanish</p>
           
               </div>

               <div className='fill'>
                  <img src={star} alt="" className='star' />
                  <p className='Name-title'>Have you ever been refused a visa/entry to any country in the world?</p>
                  <div className='border-y'></div>
                  <p className='Name-text'>No</p>
             
               </div>

               <div className='fill'>
                  <img src={star} alt="" className='star' />
                  <p className='Name-title'>if yes, please provide type of visa refused</p>
                  <div className='border-y'></div>
                  <p className='Name-text'>Type of visa refused</p>
           
               </div>

               <div className='fill'>
                  <img src={star} alt="" className='star' />
                  <p className='Name-title'>Date</p>
                  <div className='border-y'></div>
                  <p className='Name-text'>6/19/2023</p>
        
               </div>

               <div className='fill'>
                  <img src={star} alt="" className='star' />
                  <p className='Name-title'>if yes, please provide type of visa refused reason</p>
                  <div className='border-y'></div>
                  <p className='Name-text'>Type </p>
             
               </div>
               <div className='fill'>
                  <img src={star} alt="" className='star' />
                  <p className='Name-title'>Please provide in your own words how we can help you?</p>
                  <div className='border-y'></div>
                  <p className='Name-text'>Type</p>
             
               </div>
               </div>

          
               <div className='button-container-2'>
               <NavLink to="">
               <button className='case-approved-option'>case is under final Review </button>
               </NavLink>
               <NavLink to="/message">
               <img src={chatbox} alt="" className='chat-icon-box' />
               </NavLink>
               </div>
            </div>
                   
                      
                    </div>


                </div>

            </div>
        </div>

    )
}

export default Employementdatafill