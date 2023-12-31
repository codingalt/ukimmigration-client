import React, { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom"; // Import the useNavigate hook
import "../style/Rejectpopup.css";
import crossicon from "../Assets/cross -vector.png";
import messageicon from "../Assets/messag-icon-button.svg";

import Filldata2 from "./Filldata2";
import { useGetGroupClientAppByUserIdQuery } from "../services/api/companyClient";
import GroupFilledData from "./GroupFilledData";
const RejectpopupGroup = ({ show, setShow }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetGroupClientAppByUserIdQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const handleCancel = () => {
    const rejectpopup = document.querySelector(".Rejectpopoup");
    rejectpopup.style.display = "";
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "none";

    setShow(false)
  };

  const buttonRef = React.createRef();

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
          setShow(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  return (
    <div>
      <div className="overlay" style={{ overflow: "hidden" }}>
        <div className="Rejectpopoup" ref={buttonRef}>
          <img
            onClick={() => setShow(false)}
            style={{ cursor: "pointer" }}
            src={crossicon}
            alt=""
            className="cross-img"
          />
          <p className="Confermation-text">Rejected</p>

          <p className="Reason-input" style={{ paddingLeft: "18px" }}>
            {isLoading ? "Loading.." : data?.application?.rejectPhaseReason}
          </p>

          <button ref={buttonRef} className="Cncl-btn" onClick={handleCancel}>
            Cancel
          </button>
          <NavLink to="/message">
            <button className="cnfrm-btn">
              <img src={messageicon} alt="" className="message-icon-btn" />{" "}
              Contact Us
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RejectpopupGroup;
