import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom"; // Import the useNavigate hook
import "../style/Rejectpopup.css";
import crossicon from "../Assets/cross -vector.png";
import messageicon from "../Assets/messag-icon-button.svg";

import Filldata2 from "./Filldata2";
import { useGetGroupClientAppByUserIdQuery } from "../services/api/companyClient";
import GroupFilledData from "./GroupFilledData";
const RejectpopupGroup = () => {
  const navigate = useNavigate(); 
  const { data } = useGetGroupClientAppByUserIdQuery();
  console.log(data);

  const handleCancel = () => {
    const rejectpopup = document.querySelector(".Rejectpopoup");
    rejectpopup.style.display = "";
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "none";

    navigate(-1);
  };

  const handleConfirm = () => {};

  const buttonRef = React.createRef();

  return (
    <div>
      <GroupFilledData />

      <div className="overlay">
        <div className="Rejectpopoup">
          <img src={crossicon} alt="" className="cross-img" />
          <p className="Confermation-text">Rejected</p>

          <p className="Reason-input" style={{ paddingLeft: "18px" }}>
            {data?.application?.rejectPhaseReason}
          </p>

          <button ref={buttonRef} className="Cncl-btn" onClick={handleCancel}>
            Cancel
          </button>
          <NavLink to="/message">
            <button className="cnfrm-btn" onClick={handleConfirm}>
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
