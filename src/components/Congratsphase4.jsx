import React, { useEffect } from 'react'
import "../style/Rejectpopup.css";
import congrats from "../Assets/cong-phase4.svg"
import Filldataphase4 from "./Filldataphase4"
import { NavLink, useNavigate } from "react-router-dom"; 
import messageicon from "../Assets/messag-icon-button.svg"

const Congratsphase4 = () => {
    const navigate = useNavigate(); 

    const buttonRef = React.createRef();
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
          navigate(-1);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    return (
      <div>
        <Filldataphase4 />

        <div className="overlay">
          <div className="popoup" ref={buttonRef}>
            <img src={congrats} alt="" className="cross-img" />
            <p className="Confermation-text-2">Congratulations!</p>
            <p className="form-submited-text-2">
              Congratulations! Your application has been approved.
            </p>
            <NavLink to="/message">
              <button className="cnfrm-btn-2">
                <img src={messageicon} alt="" className="message-icon-btn" />{" "}
                Contact Us
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    );
    };

export default Congratsphase4