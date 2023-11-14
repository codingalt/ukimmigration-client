import React from 'react'
import "../style/Rejectpopup.css";
import congrats from "../Assets/cong-phase4.svg"

import { NavLink, useNavigate } from "react-router-dom"; // Import the useNavigate hook
import messageicon from "../Assets/messag-icon-button.svg"
// import CharacterData from './Characterdata';

const Submissionpopup = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleOverlayClick = () => {
        // Close the popup and navigate to a defined route
        navigate("/characterdata"); // Replace "/your-defined-route" with your desired route
    };
    const handleConfirm = () => {
        // Implement your logic for handling confirmation here
    };
  
    return (
        <div>
      {/* <CharacterData/> */}
        <div className="overlay" onClick={handleOverlayClick}>
          <div className="popoup">
              <img src={congrats} alt="" className="cross-img" />
              <p className="Confermation-text-2">
              Congratulations!
              </p>
              <p className="form-submited-text-2">The case has been prepared for submission to the authorities.</p>
              <NavLink to="/message">
              <button className="cnfrm-btn-3" onClick={handleConfirm}>     
                 <img src={messageicon} alt="" className="message-icon-btn" /> Contact Us
            </button>
            </NavLink>
            </div>

          </div>
       
        </div>
      );
    };

export default Submissionpopup