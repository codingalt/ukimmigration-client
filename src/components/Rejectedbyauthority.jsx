import React, { useState } from 'react';
import crossicon from "../Assets/cross -vector.png";
import messageicon from "../Assets/messag-icon-button.svg"
import { NavLink, useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { Link } from 'react-router-dom';
import pdfimg from "../Assets/pdf-img.png"
import FilldataAllphases2 from './FilldataAllphases2';

const Rejectedbyauthority = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
      // Close the popup and navigate to the same page in the background
      setShowPopup(false);
      navigate("/filldataallphase2");
  };

  const handleConfirm = () => {
      // Implement your logic for handling confirmation here
  };
  
    return (
      <div>

            <FilldataAllphases2/>
        <div className="overlay">
        <div className="Rejectpopoup-authority">
            <img src={crossicon} alt="" className="cross-img" />
            <p className="Confermation-text">
            Rejected
            </p>

            <Link to="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank">
        <div className='pdf-input-popup'>
            Click here to Download PDF
            <img src={pdfimg} alt="" className='pdf-icon-popup' />
          </div>
        </Link>
  
            <p className="Reason-input">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              ad, in magni excepturi ut dolor tempora dignissimos cum vitae sequi
              eveniet explicabo, autem corporis. Porro quia soluta voluptates
              quasi! Debitis, quo laudantium quod qui recusandae odit
              necessitatibus esse exercitationem illum.
            </p>
  
            <button className="Cncl-btn" onClick={handleCancel}>
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
  

export default Rejectedbyauthority