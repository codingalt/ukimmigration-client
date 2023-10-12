import React from 'react'
import "../style/Rejectpopup.css";
import congrats from "../Assets/cong-phase4.svg"
import Filldataphase4 from "./Filldataphase4"
import { NavLink, useNavigate } from "react-router-dom"; // Import the useNavigate hook
import messageicon from "../Assets/messag-icon-button.svg"

const Congratsphase4 = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleOverlayClick = () => {
        // Close the popup and navigate to a defined route
        navigate("/finaldataphase4"); // Replace "/your-defined-route" with your desired route
    };
    const handleConfirm = () => {
        // Implement your logic for handling confirmation here
    };
  
    return (
        <div>
        <Filldataphase4/>
    
        <div className="overlay" onClick={handleOverlayClick}>
          <div className="popoup">
              <img src={congrats} alt="" className="cross-img" />
              <p className="Confermation-text-2">
              Congratulations!
              </p>
              <p className="form-submited-text-2">Congratulations! Your application has been approved.</p>
              <NavLink to="/message">
              <button className="cnfrm-btn-2" onClick={handleConfirm}>     
                 <img src={messageicon} alt="" className="message-icon-btn" /> Contact Us
            </button>
            </NavLink>
            </div>

          </div>
       
        </div>
      );
    };

export default Congratsphase4