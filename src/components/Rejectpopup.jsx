import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "../style/Rejectpopup.css";
import crossicon from "../Assets/cross -vector.png";
import messageicon from "../Assets/messag-icon-button.svg"

import Filldata2 from "./Filldata2";

const Rejectpopup = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleCancel = () => {
    // Close the popup box and the overlay div.
    const rejectpopup = document.querySelector(".Rejectpopoup");
    rejectpopup.style.display = "";
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "none";

    // Navigate to the Prescreening component smoothly
    navigate("/finaldata2");
  };

  const handleConfirm = () => {
    // Implement your logic for handling confirmation here
  };

  const buttonRef = React.createRef();

  return (
    <div>
     <Filldata2/>

      <div className="overlay">
      <div className="Rejectpopoup">
          <img src={crossicon} alt="" className="cross-img" />
          <p className="Confermation-text">
          Rejected
          </p>

          <p className="Reason-input">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            ad, in magni excepturi ut dolor tempora dignissimos cum vitae sequi
            eveniet explicabo, autem corporis. Porro quia soluta voluptates
            quasi! Debitis, quo laudantium quod qui recusandae odit
            necessitatibus esse exercitationem illum.
          </p>

          <button ref={buttonRef} className="Cncl-btn" onClick={handleCancel}>
            Cancel
          </button>
          <NavLink to="/message">
          <button className="cnfrm-btn" onClick={handleConfirm}>     
               <img src={messageicon} alt="" className="message-icon-btn" /> Contact Us
          </button>
          </NavLink>
        </div>
      </div>
   
    </div>
  );
};

export default Rejectpopup;
