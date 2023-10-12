import React, { useEffect, useState, useRef } from 'react';
import Logo2 from '../Assets/Ukimmigration-logo.png';
import bellicon2 from "../Assets/bell-icon-svg.svg"
import profileimg from "../Assets/profile-img-svg.svg"
import dropdownicon from "../Assets/dropdown-icon-svg.svg"
import { Link, NavLink } from 'react-router-dom';
import NotificationBox from './Notification';
import SettingBox from "./Settingbox"
import "../style/Adddetails.css"

const Adddetails = () => {

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
        // Handle form submission
    };


    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [nationality, setNationality] = useState('');
    const [dateOfBirth2, setDateOfBirth2] = useState('');



    const [cvv, setCvv] = useState('');

    const handleCvvChange = (e) => {
        setCvv(e.target.value);
    };


    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleContactChange = (e) => {
        setContact(e.target.value);
    };

    const handleDateOfBirthChange = (e) => {
        setDateOfBirth(e.target.value);
    };

    const handleDateOfBirthChange2 = (e) => {
        setDateOfBirth2(e.target.value);
    };


    const handleNationalityChange = (e) => {
        setNationality(e.target.value);
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
                    <p className='Required-data-text'>Add Debit / Credit Card</p>
                    <NavLink to="/phase3">
                    <button type="submit" className="back-button">back</button>
                    </NavLink>
                    <form>
                        <div className='phase-1-form'>
                            <p className="phase-1-text-left-side">Card Holder Name*</p>
                            <input className='phase-1-input-left-side'
                                type="text"
                                placeholder="John Leo"
                                value={Name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className='email-input'>
                            <p className="phase-1-text-left-side">Email</p>
                            <input className='phase-1-input-left-side'
                                type="email"
                                placeholder="email@email.com"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className='Phone-number'>
                            <p className="phase-1-text-left-side">Card Number*</p>
                            <input className='phase-1-input-left-side'
                                type="tel"
                                placeholder="(485)-845-8542658"
                                value={contact}
                                onChange={handleContactChange}
                            />
                        </div>
                        <div className='Expiry Date*'>
                            <p className="phase-1-text-left-side">Expiry Date*</p>
                            <input className='phase-1-input-left-side'
                                type="date"
                                placeholder=""
                                value={dateOfBirth}
                                onChange={handleDateOfBirthChange}
                            />
                        </div>

                        <div className='CVV'>
                            <p className="phase-1-text-left-side">CVV*</p>
                            <input
                                className='phase-1-input-left-side'
                                type="text"
                                placeholder="***"
                                value={cvv}
                                onChange={handleCvvChange}
                            />
                        </div>
                        <button type="submit" className="submit-details">Submit</button>
                    </form>

                </div>

                <div className="right-side-forget-password-2">

                </div>
            </div>
        </div>
  )
}

export default Adddetails