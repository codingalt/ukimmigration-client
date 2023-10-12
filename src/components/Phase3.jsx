import React, { useEffect, useState, useRef } from 'react';
import Logo2 from '../Assets/Ukimmigration-logo.png';
import bellicon2 from "../Assets/bell-icon-svg.svg"
import profileimg from "../Assets/profile-img-svg.svg"
import dropdownicon from "../Assets/dropdown-icon-svg.svg"
import addicon from "../Assets/add-icon.svg"
import creditpic from "../Assets/debit-card-pic.svg"
import { Link, NavLink } from 'react-router-dom';
import NotificationBox from './Notification';
import SettingBox from "./Settingbox"
import "../style/Phase3.css"

const Phase3 = () => {
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


    const [formData, setFormData] = useState({
        bankName: '',
        iban: '',
        companyRecipient: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform your form submission logic here
        // You can access form data from the 'formData' state

        console.log('Form submitted with data:', formData);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const fileInputRef = useRef(null);

    // Function to open the file input dialog
    const openFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
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
                    <p className='Required-data-text'>Choose your payment method</p>
                    <NavLink to="/filldata">
                    <button type="submit" className="back-button">back</button>
                    </NavLink>
                    <p className='Pay-credit-text'>Pay with Credit Card</p>
                     <Link to="/adddetails">
                    <p className='Add-debit-text'>Add Debit / Credit Card <img src={addicon} alt="" /></p>
                    </Link>
                    <img src={creditpic} alt="" className='credit-card' />

                    <p className='detail-text'>Details</p>
                    <div className='border-line-phase3'></div>

                    <div className='Details'>
                        <div>
                            <p>Service Fee</p>
                            <p>Tax</p>
                            <p>Total</p>
                        </div>


                        <div>
                            <p>$80</p>
                            <p>$15</p>
                            <p>$95</p>
                        </div>
                    </div>
                   <NavLink to="/filldata">
                    <button type="submit" className="click-to-pay">Click to Pay</button>
                    </NavLink>
                </div>

                <div className='Border-line-between'></div>
                <div className="right-side-phase3">

                    <p className='pay-to-bank-text'>Pay with Bank Account</p>
                    <p className='phase-3-right-text'>Bank Name</p>
                    <input
                        className='Input-right-phase3'
                        type="text"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                    />
                    <p className='phase-3-right-text'>IBAN</p>
                    <input
                        className='Input-right-phase3'
                        type="text"
                        name="iban"
                        value={formData.iban}
                        onChange={handleInputChange}
                    />
                    <p className='phase-3-right-text'>Company Recipient</p>
                    <input
                        className='Input-right-phase3'
                        type="text"
                        name="companyRecipient"
                        value={formData.companyRecipient}
                        onChange={handleInputChange}
                    />

                    <p className='If-you-paid-text'>If you have paid, please upload proof of payment. </p>

                    <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: 'none' }}
                    // Add any attributes you need for the file input
                    />
                    <button
                        type="button"
                        className="Upload-evidence"
                        onClick={openFileInput}
                    >
                        Upload Evidence
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Phase3